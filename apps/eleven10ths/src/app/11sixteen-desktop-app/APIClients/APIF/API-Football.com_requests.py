
import http.client
import json

conn = http.client.HTTPSConnection("v3.football.api-sports.io")

headers = {
    'x-rapidapi-host': "v3.football.api-sports.io",
    'x-rapidapi-key': "7184ca274b51ae5789979804b78eb350"
    }


conn.request("GET", "/fixtures?league=39&season=2010", headers=headers)

res = conn.getresponse()
data = res.read()

datastr = data.decode("utf-8")
data = json.loads(datastr)
for key in data:
    print(f"{key} - {data[key]}")
