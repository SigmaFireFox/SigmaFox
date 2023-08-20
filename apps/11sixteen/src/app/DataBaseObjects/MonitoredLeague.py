from DataBaseObjects.MonitoredSeason import MonitoredSeason
from pymongo import MongoClient


def open_football_results_collection():

    client = MongoClient('mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
    db = client['football_data']
    collection = db['football_results']

    return collection


class MonitoredLeague:

    def __init__(self, league_doc):
        self.league_info = {'country': league_doc['league_info']['country'],
                            'name': league_doc['league_info']['name']}

        self.api_refs = {}
        for api_ref in league_doc['api_refs']:
            self.api_refs[api_ref] = league_doc['api_refs'][api_ref]

        self.seasons = {}
        for season in league_doc['seasons']:
            self.seasons[season] = MonitoredSeason(season, league_doc['seasons'][season])

    def get_teams_count_per_season(self):

        for season in self.seasons:
            season.get_teams_count(self.league_info['country'], self.league_info['name'])

    def get_available_fixture_results_count_per_season(self):

        for season in self.seasons:
            season.get_available_fixture_results_count()

    def get_missing_fixtures_count_per_season(self):

        collection = open_football_results_collection()
        for season in self.seasons:
            print(f"Determining missing fixture count for {self.league_info['country']}: "
                  f"{self.league_info['name']}: {season}")
            self.seasons[season].get_missing_fixture_results_count(collection,
                                                                   self.league_info['country'],
                                                                   self.league_info['name'])
