class FixtureResult:

    def __init__(self, raw_fixture_result_data):
        self.event_info = {'date_time': raw_fixture_result_data['fixture']['date'],
                           'referee': raw_fixture_result_data['fixture']['referee'],
                           'venue': raw_fixture_result_data['fixture']['venue']['name']}
        self.competition_info = {'country': raw_fixture_result_data['league']['country'],
                                 'competition': raw_fixture_result_data['league']['name']}
        self.team_info = {'home': raw_fixture_result_data['teams']['home']['name'],
                          'away': raw_fixture_result_data['teams']['away']['name']}
        self.result_info = {'FTHG': raw_fixture_result_data['score']['fulltime']['home'],
                            'FTAG': raw_fixture_result_data['score']['fulltime']['away'],
                            'HTHG': raw_fixture_result_data['score']['halftime']['home'],
                            'HTAG': raw_fixture_result_data['score']['halftime']['away'],}


class League:

    def __init__(self, raw_league_data):
        self.league_info = {'country': raw_league_data['country']['name'],
                            'name': raw_league_data['league']['name']}
        self.seasons = {}
        for season in raw_league_data['seasons']:
            self.seasons[str(season['year'])] = {'start_date': season['start'], 'end_date': season['end']}
        self.api_refs = {"api-football-com": raw_league_data['league']['id']}

