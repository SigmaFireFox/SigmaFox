from DataBaseObjects.MonitoredLeague import MonitoredLeague
from pymongo import MongoClient

# Get all monitored leagues from leagues collection
print("Opening DB")
client = MongoClient('mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
db = client['football_data']
collection = db['leagues']
print("Searching for monitored leagues")
monitored_leagues = collection.aggregate([{'$match': {'monitored': True}}])

# Place aggregate result into list
monitored_leagues_list = []
for league in monitored_leagues:
    monitored_leagues_list.append(league)

# Convert each result in list into a MonitoredLeague object
counter = 0
for league in monitored_leagues_list:
    print(f"Creating Monitored League Objects {counter + 1} of {len(monitored_leagues_list)}")
    monitored_leagues_list[counter] = MonitoredLeague(league)

print("All MonitoredLeague Objects created")

for league in monitored_leagues_list:
    league.get_missing_fixtures_count_per_season()

pass
