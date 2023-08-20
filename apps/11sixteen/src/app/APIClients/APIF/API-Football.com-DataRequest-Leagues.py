import http.client
from DataHandlers import RawDataHandlers

conn = http.client.HTTPSConnection("v3.football.api-sports.io")

headers = {
    'x-rapidapi-host': "v3.football.api-sports.io",
    'x-rapidapi-key': "7184ca274b51ae5789979804b78eb350"
    }

conn.request("GET", f"/leagues", headers=headers)
res = conn.getresponse()
APIreturn = res.read()

datastr = APIreturn.decode("utf-8")
# raw_data = json.loads(datastr)
data_description = f"League Data"
data = RawDataHandlers.RawData(datastr, data_description)
data.write_to_txt()