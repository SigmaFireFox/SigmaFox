import json
from pymongo import MongoClient
from DataBaseObjects.DataBaseObjects import League

# Load file (Static process for now)
file = open(f"C:\\Users\\rferreira\\Documents\\GitHub\\11Sixteen\\DataFilesForImport\\League Data", "r")
datastr = file.readline()
raw_data = json.loads(datastr)
file.close()

number_of_results = raw_data['results']  # Determine the number of records to call

client = MongoClient('mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
db = client["football_data"]
collection = db["leagues"]               # Open the database

for document in raw_data['response']:  # Call each document
    current_document = League(document)
    document_to_insert = {'league_info': current_document.league_info,
                          'seasons': current_document.seasons,
                          'api_refs': current_document.api_refs,
                          'monitored': False}
    json.dumps(document_to_insert)
    inserted_id = collection.insert_one(document_to_insert).inserted_id
    print(f"Document {inserted_id} has been inserted")

client.close()


