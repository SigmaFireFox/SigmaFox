from DataBaseObjects.MonitoredLeague import get_monitored_leagues
from pymongo import MongoClient


def move_season_up_one():
    monitored_leagues = get_monitored_leagues()

    # Build a dictionary of all the monitored leagues and their seasons (with start and end dates)
    monitored_league_seasons = {}
    # Extract league IDs from monitored leagues
    for league in monitored_leagues:
        monitored_league_seasons[league['api_refs']['api-football-com']
                                 ] = league['seasons']

    # For each league that is monitored - pull all documents form DB that relate to that specific league
    for league_id in monitored_league_seasons:

        # Open the database
        client = MongoClient(
            'mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
        db = client["football_data"]
        collection = db["football_results"]

        # Call all related documents to the league in question for which season field is not present
        pipeline = [
            {'$match': {'competition.league.api-ref.APIF': league_id}},
            {'$match': {'competition.league.season': {"$exists": True}}}
        ]
        fixtures_to_amend = collection.aggregate(pipeline)

        # Go through list of fixtures to move season
        counter = 1
        for document in fixtures_to_amend:
            # Get season
            season = document['competition']['league']['season']
            collection.update_one({"_id": document['_id']}, {"$unset": {"competition.league.season": ""}})
            collection.update_one({"_id": document['_id']}, {"$set": {"competition.season": season}})
            print(f"{counter} - {document['_id']} updated")
            counter += 1


if __name__ == "__main__":
    move_season_up_one()
