import json

file = open("/APIClients\\League Data", "r")
datastr = file.readline()
raw_data = json.loads(datastr)

print(f"Data called: {raw_data['get'].title()}")
print(f"Parameters used: ", end="")
if len(raw_data['parameters']) == 0:
    print("None")
else:
    print()
    for key in raw_data['parameters']:
        print(f"\t{key.title()}: {raw_data['parameters'][key]}")
print(f"Errors reported: ", end="")
if len(raw_data['errors']) == 0:
    print("None")
else:
    print()
    for key in raw_data['errors']:
        print(f"\t{key.title()}: {raw_data['errors'][key]}")
print(f"Number of records: {raw_data['results']}")
print(f"Number of pages: {raw_data['paging']['total']}")

for response in range(raw_data['results']):
    for key1 in raw_data['response'][response]:
        print(f"{key1}: ")
        print("\t", end="")
        for key2 in raw_data['response'][response][key1]:
            print(f"{key2}\t", end="")
        print()
    print()