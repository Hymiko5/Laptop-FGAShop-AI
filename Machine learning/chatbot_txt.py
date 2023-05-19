import json
import pymongo
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["LaptopDatabase"]
stopwords = db["stopwords"]

#open and read the file after the appending:
f = open("data//vietnamese-stopwords.txt", "r", encoding='utf-8')
# obj = { "stopwords": f.readlines() }
# stopwords.insert_one(obj)
arr = []
for index,r in enumerate(f.readlines()):
    arr.append(r.strip())

obj = { "stopwords": arr }

stopwords.insert_one(obj)
