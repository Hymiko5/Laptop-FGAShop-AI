import json
import pymongo
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["LaptopDatabase"]
chatbot = db["chatbot"]


with open('intent.json', encoding='utf-8') as json_data:
    intents = json.load(json_data)

chatbot.insert_many(intents['intents'])