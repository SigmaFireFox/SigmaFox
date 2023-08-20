from DataBaseObjects.MonitoredLeague import get_monitored_leagues
from pymongo import MongoClient


def insert_league_id_into_database():
    monitored_leagues = get_monitored_leagues()

    # Open DB
    client = MongoClient(
        'mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
    db = client['football_data']
    collection = db['football_results']

    # For each league in the monitored leagues list: get a list of documents in the DB that need to be reviewed
    for league in monitored_leagues:
        # Get required data for league currently being handled
        country_name = league['league_info']['country']
        league_name = league['league_info']['name']
        api_football_league_id = league['api_refs']['api-football-com']

        # Filter collection for only relevant fixtures
        pipeline = ([
            {
                '$match': {'competition.country': country_name,
                           'competition.competition': league_name}
            }
        ])

        fixtures_to_be_reviewed = collection.aggregate(pipeline)

        # Create a list of document nums for fixtures to be handled
        list_of_documents_to_be_reviewed = []
        for fixture in fixtures_to_be_reviewed:
            list_of_documents_to_be_reviewed.append(fixture['_id'])

        # Update all documents in the list
        counter = 1
        for doc_id in list_of_documents_to_be_reviewed:
            collection.update_one({"_id": doc_id},
                                  {"$unset": {"competition": ""}})
            collection.update_one({"_id": doc_id},
                                  {"$set": {"competition.country": country_name,
                                            "competition.league.name": league_name,
                                            "competition.league.api-ref.APIF": api_football_league_id}})
            print(f"{counter} {doc_id} updated")
            counter += 1


if __name__ == "__main__":
    insert_league_id_into_database()
