import http.client
from DataHandlers import RawDataHandlers

conn = http.client.HTTPSConnection("v3.football.api-sports.io")

headers = {
    'x-rapidapi-host': "v3.football.api-sports.io",
    'x-rapidapi-key': "7184ca274b51ae5789979804b78eb350"
    }

league_id = 39
for season in range(2010, 2020):
    conn.request("GET", f"/fixtures?league={league_id}&season={season}", headers=headers)
    res = conn.getresponse()
    APIreturn = res.read()

    datastr = APIreturn.decode("utf-8")
    # raw_data = json.loads(datastr)
    data_description = f"League {league_id} - {season}"
    data = RawDataHandlers.RawData(datastr, data_description)
    data.write_to_txt()
