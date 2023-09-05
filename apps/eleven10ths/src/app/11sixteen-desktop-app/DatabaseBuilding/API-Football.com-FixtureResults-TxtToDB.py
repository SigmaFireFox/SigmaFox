# This modules reads data from already collected data from APIF and transfer it to our DB hosted with
# MongoDB
import json
from DataBaseObjects.DataBaseObjects import FixtureResult
from pymongo import MongoClient

for season in range(2011, 2020):
# Load file (Static process for now)
    file = open(f"C:\\Users\\rferreira\\Documents\\GitHub\\11Sixteen\\API-test\\League 39 - {season}", "r")
    datastr = file.readline()
    raw_data = json.loads(datastr)
    file.close()

    number_of_results = raw_data['results']  # Determine the number of records to call

    client = MongoClient('mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
    db = client["football_data"]
    db_collection = db["football_results"]  # Open the database

    for result in range(number_of_results):  # Call each document
        current_result = FixtureResult(raw_data['response'][result])
        document_to_insert = {'competition': current_result.competition_info,
                              'event': current_result.event_info,
                              'teams': current_result.team_info,
                              'results': current_result.result_info}
        json.dumps(document_to_insert)

        inserted_id = db_collection.insert_one(document_to_insert).inserted_id
        print(f"Document {inserted_id} has been inserted")

    client.close()
