import json

# Load file (Static process for now)
file = open(f"C:\\Users\\rferreira\\Documents\\GitHub\\11Sixteen\\DataFilesForImport\\League Data", "r")
datastr = file.readline()
raw_data = json.loads(datastr)
file.close()

record_num = 100
for field_class in raw_data['response'][record_num]:
    print(f"{field_class}    {raw_data['response'][record_num][field_class]}")


# list_of_league = []
# for record in raw_data['response']:
#     if record['league']['type'] == "League":
#         list_of_league.append(f"{record['country']['name']} - {record['league']['name']}")
# list_of_league.sort()
#
# for league in list_of_league:
#     print(league)
