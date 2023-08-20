from DataBaseObjects.MonitoredLeague import get_monitored_leagues
from pymongo import MongoClient
from datetime import datetime


def insert_seasons_into_database():
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
            {'$match': {'competition.league.season': {"$exists": False}}}
        ]
        fixtures_to_amend = collection.aggregate(pipeline)

        # Go through list of fixtures to insert season
        counter = 1
        for document in fixtures_to_amend:
            # Get date of fixture
            fixture_date = datetime.strptime(document['event']['date'], "%Y-%m-%d").date()

            # Determine the season of that date
            for season in monitored_league_seasons[league_id]:
                # if the fixture in within the date range - insert the season into the document
                if datetime.strptime(monitored_league_seasons[league_id][season]['start_date'], "%Y-%m-%d").date() \
                        <= fixture_date <= \
                        datetime.strptime(monitored_league_seasons[league_id][season]['end_date'], "%Y-%m-%d").date():

                    collection.update_one({"_id": document['_id']},
                                          {"$set": {"competition.league.season": season}})
                    print(f"{counter} - {document['_id']} updated")
                    counter += 1
                    break


if __name__ == "__main__":
    insert_seasons_into_database()
