from flask import Flask, render_template, redirect, flash, url_for, session, logging, request, jsonify
from flask_mysqldb import MySQL
from wtforms import Form, StringField, TextAreaField, PasswordField, validators, HiddenField, IntegerField, SelectField, SelectMultipleField
from werkzeug.utils import secure_filename
from passlib.hash import sha256_crypt
from functools import wraps
import time
from datetime import timedelta
import re
import os
import pickle
import json
import random
import nltk
# nltk.download('punkt')
import numpy as np
import re
import pymongo
from bson.objectid import ObjectId
from flask_cors import CORS

from Class.Response import Response

'''
    RECOMMENDATION SYSTEM LIBRARIES
'''
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

'''
    DEEP LEARNING LIBRARIES
'''

import tensorflow as tflow
from keras.models import load_model
print(tflow.version)
from nltk.stem.lancaster import LancasterStemmer
app = Flask(__name__)
CORS(app)
from bson.json_util import dumps, loads

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["LaptopDatabase"]
laptopTypeCol = db["laptoptypes"]
laptopCol = db["laptops"]
orderCol = db["orders"]
chatbot = db["chatbot"]
userCol = db["users"]

data = pickle.load( open("training_data", "rb") )
words = data['words']
documents = data['documents']
classes = data['classes']
brandRe = "dell|lenovo|hp|intel|asus|msi|acer|thinkbook"
hardDriveRe = "hdd|ssd"
laptopTypes = []
for type in laptopTypeCol.find():
    laptopTypes.append(type['name'].lower())
laptopTypeRe = str.join('|', laptopTypes)
iRe = "i3|i5|i7|i9"
emailRe = r'[\w\.-]+@[\w\.-]+'
operationRe = "windows|mac os"

graph = tflow.compat.v1.get_default_graph()
stemmer = LancasterStemmer()

# chatbot = db["chatbot"]
# intents = list(chatbot.find())

with open('intent.json', encoding='utf-8') as json_data:
    intents = json.load(json_data)

def clean_up_sentence(sentence):
    # tokenize the pattern
    sentence_words = nltk.word_tokenize(sentence)
    # stem each word
    sentence_words = [stemmer.stem(word.lower()) for word in sentence_words]
    return sentence_words

# return bag of words array: 0 or 1 for each word in the bag that exists in the sentetnce
 
def bow(sentence, words, show_details=False):
    # tokenize the pattern
    sentence_words = clean_up_sentence(sentence)
    # bag of words
    bag = [0]*len(words)
    for s in sentence_words:
        for i,w in enumerate(words):
            if w == s:
                bag[i] = 1
                if show_details:
                    print("found in bag: %s" % w)
    return(np.array(bag))

ERROR_THRESHOLD = 0.65
def classify(sentence):
    # generate probabilities from the model
    p = bow(sentence, words)
    
    d = len(p)
    f = len(documents)-2
    a = np.zeros([f, d])
    tot = np.vstack((p, a))
    with graph.as_default():
        model = load_model('chatmodel.h5')
        results = model.predict(tot)[0]
        
    
    # filter out predictions below a threshold
    results = [[i, r] for i, r in enumerate(results) if r > ERROR_THRESHOLD]
    # sort by strength of probability
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    
    for r in results:
        return_list.append((classes[r[0]], r[1]))
    # return tuple of intent and probability
    return return_list

def giftStr(gift):
    result = ""
    for item in gift['items']:
        result += item['title'] + f"<img>{item['img']}</img>"

def orderStr(order):
    return f"Date: {order['date']}, Username: {order['userName']}"

def createQuery():
    print(session)
    obj = {}
    if session.get('laptop-brand') is not None:
        obj['brand'] = re.compile(session['laptop-brand'], re.IGNORECASE)
    if session.get('laptop_brand_negative') is not None:
        obj['brand'] = re.compile({ "$ne": session['laptop_brand_negative'] }, re.IGNORECASE)
    if session.get('laptopType') is not None:
        obj['laptopType'] = re.compile(session['laptopType'], re.IGNORECASE)
    if session.get('price') is not None:
        price = float(session['price'])
        obj['price'] = { "$gt": round(price, -6), "$lt": round(price, -6) + 1000000 }
    if (session.get('config_cpu_i') is not None) & (session.get('config_cpu_speed') is not None):
        if obj.get('$and') is not None:
            obj['$and'] = obj['$and'] + [ { 'configuration.CPU': re.compile(session['config_cpu_i'], re.IGNORECASE) }, { 'configuration.CPU': re.compile(session['config_cpu_speed'], re.IGNORECASE) } ]
        else:
            obj['$and'] = [ { 'configuration.CPU': re.compile(session['config_cpu_i'], re.IGNORECASE) }, { 'configuration.CPU': re.compile(session['config_cpu_speed'], re.IGNORECASE) } ]
    elif session.get('config_cpu_i') is not None:
        obj['configuration.CPU'] = re.compile(session['config_cpu_i'], re.IGNORECASE)
    elif session.get('config_cpu_speed') is not None:
        obj['configuration.CPU'] = re.compile(session['config_cpu_speed'], re.IGNORECASE)  
    if session.get('config_ram') is not None:
        obj['configuration.RAM'] = re.compile(session['config_ram'], re.IGNORECASE)
    if session.get('hard_drive') is not None:
        if obj.get('$and') is not None:
            obj['$and'] = obj['$and'] + [ { 'configuration.Ổ cứng': re.compile(session['hard_drive'][0], re.IGNORECASE) }, { 'configuration.Ổ cứng': re.compile(session['hard_drive'][1], re.IGNORECASE) } ]
        else:
            obj['$and'] = [ { 'configuration.CPU': re.compile(session['hard_drive'][0], re.IGNORECASE) }, { 'configuration.CPU': re.compile(session['hard_drive'][1], re.IGNORECASE) } ]
    if session.get('operation') is not None:
        obj['configuration.Hệ điều hành'] = re.compile(session['operation'], re.IGNORECASE)
    if session.get('laptop_weight') is not None:
        obj['configuration.Kích thước, trọng lượng'] = float(session['laptop_weight'])
    return obj


def response(sentence, userID):
    results = classify(sentence)
    lowerSentence = sentence.lower()
    print('Result:', np.matrix(results))
    if results:
    #loop as long as there are matches to process
        while results:
            for i in intents['intents']:
                # find a tag matching thet first result
                if i['tag'] == results[0][0]:
                    if i['tag'] == 'advice':
                        session.clear()
                        return Response( is_success=True, type = 'message', msg=random.choice(i['responses']) )
                    if i['tag'] == 'laptop-brand':
                        brandResult = re.findall(brandRe, lowerSentence)
                        if brandResult:
                            session['laptop-brand'] = brandResult[0]
                            return Response( is_success=True, type = 'message', msg=random.choice(i['responses']).replace("__", brandResult[0]) )
                        else:
                            return Response( is_success=True, type = 'message', msg=f"Chúng tôi không cung cấp sản phẩm của hãng {brandResult[0]}!!!" )
                    if i['tag'] == 'laptop_brand_negative':
                        brandResult = re.findall(brandRe, lowerSentence)
                        if brandResult:
                            session['laptop_brand_negative'] = brandResult[0]
                            return Response( is_success=True, type = 'message', msg=random.choice(i['responses']).replace("__", brandResult[0]) )
                        else:
                            return Response( is_success=True, type = 'message', msg=f"Chúng tôi không cung cấp sản phẩm của hãng {brandResult[0]}!!!" )
                    if i['tag'] == 'laptopType':
                        laptopTypeResult = re.findall(laptopTypeRe, lowerSentence)
                        if laptopTypeResult:
                            laptopType = laptopTypeResult[0]
                            session['laptopType'] = laptopType
                            return Response( is_success=True, type = 'message', msg=random.choice(i['responses']) + laptopTypeCol.find_one({ 'name': re.compile(laptopType, re.IGNORECASE) })['description'] )
                        else:
                            return Response( is_success=True, type = 'message', msg="Chúng tôi không cung cấp sản phẩm của hãng bạn muốn tìm!!!" )
                    if i['tag'] == 'price':
                        priceResult = re.findall('\s\d+\s?', lowerSentence)
                        if priceResult:
                            session['price'] = priceResult[0].strip(" ")
                            return Response( is_success=True, type = 'message', msg=random.choice(i['responses']).replace(priceResult[0].strip(" ")) )
                        else:
                            return Response( is_success=True, type = 'message', msg="Chúng tôi không cung cấp sản phẩm của hãng bạn muốn tìm!!!" )
                    if i['tag'] == 'gift':
                        pid = re.findall(r"([0-9a-f]{24})", lowerSentence)[0]
                        return Response( is_success=True, type = 'gift', msg=random.choice(i['responses']), res = laptopCol.find_one({ '_id': ObjectId(pid) })['gift'] )
                    if i['tag'] == 'config_cpu_i':
                        cpuIResult = re.findall(iRe, lowerSentence)
                        if cpuIResult:
                            session['config_cpu_i'] = cpuIResult[0]
                            print(cpuIResult)
                            return Response( is_success=True, type = 'message', msg=random.choice(i['responses']).replace("__", cpuIResult[0]) )
                        else:
                            return Response( is_success=True, type = 'message', msg="Chúng tôi không cung cấp sản phẩm của hãng bạn muốn tìm!!!" )
                    if i['tag'] == 'config_cpu_speed':
                        cpuSpeedResult = re.findall(r"[-+]?(?:\d*\.*\d+)", lowerSentence)
                        if cpuSpeedResult:
                            session['config_cpu_speed'] = re.findall('\d+', lowerSentence)[0]
                            return Response( is_success=True, type = 'message', msg=random.choice(i['responses']).replace("__", re.findall('\d+', lowerSentence)[0]) )
                        else:
                            return Response( is_success=True, type = 'message', msg="Chúng tôi không cung cấp sản phẩm của hãng bạn muốn tìm!!!" )
                    if i['tag'] == 'config_ram':
                        ramResult = re.findall('\d+', lowerSentence)
                        if ramResult:
                            session['config_ram'] = ramResult[0]
                            return Response( is_success=True, type = 'message', msg=random.choice(i['responses']).replace("__", ramResult[0]) )
                        else:
                            return Response( is_success=True, type = 'message', msg="Chúng tôi không cung cấp sản phẩm của hãng bạn muốn tìm!!!" )
                    if i['tag'] == 'hard_drive':
                        hardDrive = re.findall(hardDriveRe, lowerSentence)
                        if hardDrive:
                            arr = [ re.findall('\d+', lowerSentence)[0], hardDrive[0] ]
                            session['hard_drive'] = arr
                            return Response( is_success=True, type = 'message', msg=random.choice(i['responses']).replace("__", f"{arr[0]} {arr[1]}") )
                        else:
                            return Response( is_success=True, type = 'message', msg="Chúng tôi không cung cấp sản phẩm của hãng bạn muốn tìm!!!" )
                    if i['tag'] == 'operation':
                        operationResult = re.findall(operationRe, lowerSentence)
                        if operationResult:
                            session['operation'] = operationResult[0]
                            return Response( is_success=True, type = 'message', msg=random.choice(i['responses']).replace("__", operationResult[0]) )
                        else:
                            return Response( is_success=True, type = 'message', msg="Chúng tôi không cung cấp sản phẩm của hãng bạn muốn tìm!!!" )
                    if i['tag'] == 'laptop_weight':
                        weightResult = re.findall('\d+', lowerSentence)
                        if weightResult:
                            session['laptop_weight'] = re.findall('\d+', lowerSentence)[0]
                            return Response( is_success=True, type = 'message', msg=random.choice(i['responses']).replace("__", re.findall("\d+", lowerSentence)[0]) )
                        else:
                            return Response( is_success=True, type = 'message', msg="Chúng tôi không cung cấp sản phẩm của hãng bạn muốn tìm!!!" )
                    if i['tag'] == 'order':
                        orderResult = re.findall("([0-9a-f]{24})", lowerSentence)
                        if orderResult:
                            orderId = orderResult[0]
                            return Response( is_success=True, type = 'order', res = orderCol.find_one({ "_id": ObjectId(orderId) }) )
                        else:
                            return Response( is_success=True, type = 'message', msg="Chúng tôi không cung cấp sản phẩm của hãng bạn muốn tìm!!!" )
                    if i['tag'] == 'user-order':
                        emailResult = re.findall(emailRe, lowerSentence)
                        if emailResult:
                            userEmail = emailResult[0]
                            userId = userCol.find_one({ "email": userEmail })['_id']
                            return Response( is_success=True, type = 'user-order', res = orderCol.find({ "userId": ObjectId(userId) }) )
                        else:
                            return Response( is_success=True, type = 'message', msg="User Email sai!!!" )
                    if i['tag'] == 'query':
                        try:
                            print(createQuery())
                            listLaptop = list(laptopCol.find(createQuery()))
                            return Response( is_success=True, type="list", res = listLaptop)
                        except ValueError:
                            session.clear()
                            return  Response( is_success=False, type="message", msg = "Không tìm thấy sản phẩm!")
                        
                # a random response from the intent
                    results.pop(0)
                    return  Response( is_success=True, type="message", msg = random.choice(i['responses']))
    return  Response( is_success=True, type="message", msg = "Xin lỗi, tôi không hiểu :))")            
            
            

@app.route('/chatbot/message', methods=['POST'])
def send():
    userText = request.form['message']
    print(session)
    return json.loads(dumps(response(userText, '123').__dict__))

@app.route('/chatbot/add', methods=['POST'])
def add():
    tag = request.form['tag']
    patterns = request.form['patterns']
    responses = request.form['responses']
    chatbot.insert_one({ "tag": tag, "patterns": patterns, "responses": responses })



if __name__ == '__main__':
    app.secret_key = 'indush'
    app.run(debug=True)