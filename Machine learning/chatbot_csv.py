
import json
import pymongo
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["LaptopDatabase"]
chatbot = db["chatbot"]

# importing csv module
import csv
 
# csv file name
filename = "data//vi-QA.csv"
 
# initializing the titles and rows list
fields = []
rows = []

# reading csv file
with open(filename, 'r', encoding='utf-8') as csvfile:
    # creating a csv reader object
    csvreader = csv.reader(csvfile)
     
    # extracting field names through first row
    fields = next(csvreader)
 
    # extracting each data row one by one
    for row in csvreader:
        rows.append(row)
 
    # get total number of rows
    print("Total no. of rows: %d"%(csvreader.line_num))
 
# printing the field names
print('Field names are:' + ', '.join(field for field in fields))
 
# printing first 5 rows
print('\nFirst 5 rows are:\n')
for index, row in enumerate(rows):
    # parsing each column of a row
    obj = { "tag": str(index), "patterns": [row[0]], "responses": [row[1]] }
    chatbot.insert_one(obj)
    print('\n')