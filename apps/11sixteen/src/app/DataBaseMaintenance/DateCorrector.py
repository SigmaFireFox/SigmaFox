from pymongo import MongoClient
from DataHandlers.DateTimeStringHandling import sting_to_datetime, datetime_splitter

# Open the DB
client = MongoClient('mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
db = client['football_data']
collection = db['football_results']

counter = 0
all_docs = collection.find()
for document in all_docs:
    try:
        DateTime = document['event']['date_time']
        date, time = datetime_splitter(sting_to_datetime(DateTime))
        date = str(date)
        collection.update_one({"_id": document["_id"]}, {"$set": {"event.date": date, "event.time": time}})
        collection.update_one({"_id": document["_id"]}, {"$unset": {"event.date_time": ""}})
        counter += 1
        print(counter)
    except KeyError:
        counter += 1
        print(counter)
