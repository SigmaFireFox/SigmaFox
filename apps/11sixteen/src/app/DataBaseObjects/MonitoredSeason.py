from pymongo import MongoClient


def open_football_results_collection():

    client = MongoClient('mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
    db = client['football_data']
    collection = db['football_results']

    return collection


class MonitoredSeason:

    def __init__(self, year, season_info):
        self.year = year
        self.start_date = season_info['start_date']
        self.end_date = season_info['end_date']
        self.team_count = None
        self.db_fixture_result_count = None
        self.missing_fixture_result_count = None

    def get_teams_count(self, collection,  country, league):

        team_count = collection.aggregate([
            {'$match':
                {'competition.country': country,
                 'competition.league.name': league,
                 'competition.season': self.year
                 }
             },
            {'$group':
                {'_id':
                    {'home_team': '$teams.home',
                     'season': self.year},
                 'count': {'$sum': 1}}
             },
            {'$group':
                {'_id':
                    {'season': '$_id.season'},
                 'count': {'$sum': 1}}
             }
        ])
        for result in team_count:
            self.team_count = result['count']

    def get_available_fixture_results_count(self, collection):

        fixture_count = collection.aggregate([
            {'$group':
                {'_id':
                    {'season': '$competition.season'},
                 'count': {'$sum': 1}}
             },
            {'$match':
                {'_id.season': self.year}
             }
        ])

        for result in fixture_count:
            self.db_fixture_result_count = result['count']

    def get_missing_fixture_results_count(self,collection, county, league):

        if self.team_count is None:
            self.get_teams_count(collection, county, league)
        if self.db_fixture_result_count is None:
            self.get_available_fixture_results_count(collection)

        if self.team_count is not None and self.db_fixture_result_count is not None:
            self.missing_fixture_result_count = (self.team_count * (self.team_count - 1)) - self.db_fixture_result_count
