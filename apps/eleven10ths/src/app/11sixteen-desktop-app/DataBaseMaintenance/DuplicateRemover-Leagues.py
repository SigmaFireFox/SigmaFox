from pymongo import MongoClient

# Open the DB
client = MongoClient('mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
db = client['football_data']
collection = db['leagues']

# Build aggregator pipeline

pipeline = [
    {'$group':                                      # First Stage - Group by game details
        {'_id':
            {
                'league': '$league_info.name',
                'country': '$league_info.country'
             },
            'uniqueIDs':   {'$addToSet': "$_id"},
            'count':       {'$sum': 1}
         }
     },

    {'$match': {'count': {'$gte': 2}}}              # Only find results where there are 2 cases
]

dup_cases = collection.aggregate(pipeline)
num_dup_cases = 0
for case in dup_cases:
    num_dup_cases += 1

print(f"There were {num_dup_cases} duplicate cases found")
answer = input("Proceed to remove duplicates? (Y/N) ")
if answer.upper() == "Y":

    # Remove duplicates
    dup_cases = collection.aggregate(pipeline)
    for dup_case in dup_cases:
        for dup_ID in dup_case['uniqueIDs'][1:]:        # Only the second ID (keep the first)
            collection.delete_one({"_id": dup_ID})
