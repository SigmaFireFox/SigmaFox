from pymongo import MongoClient


def get_available_apis(country, league_name):

    # Determine the leagueIDs for various APIs
    # Open the DB
    client = MongoClient('mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
    db = client['football_data']
    collection = db['leagues']
    league = collection.find_one(
        {'$or':
            [
                 {'league_info.country': country},
                 {'league_info.name': league_name}
             ]
         })

    api_refs = {}
    for api_ref in league['api_refs']:
        api_ref[api_ref] = league['api_refs'][api_ref]

    return api_refs
