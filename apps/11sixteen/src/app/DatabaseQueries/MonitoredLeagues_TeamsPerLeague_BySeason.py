from pymongo import MongoClient


def determine_teams_per_monitored_league_per_season(monitored_leagues):

    # Structure the available_teams object
    teams_per_season_by_league = {}
    for league in monitored_leagues:

        # Record monitored league's country and name
        country = league['league_info']['country']
        league_name = league['league_info']['name']

        # insert country (if not there) and league name
        if country not in teams_per_season_by_league:
            teams_per_season_by_league[country] = {}
        teams_per_season_by_league[country][league_name] = {}

        # Insert seasons (with nil as fixture count for now)
        for season in league['seasons']:
            teams_per_season_by_league[country][league_name][season] = 0

        # Insert fixture counts (per season)
        # Open required collections
        client = MongoClient('mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
        db = client['football_data']
        fixture_collection = db['football_results']

        teams_per_season = fixture_collection.aggregate([
            {'$match':
                {'competition.country': country,
                 'competition.league.name': league_name}
             },
            {'$group':
                {'_id':
                    {'season': "$competition.season",
                     'home_team': '$teams.home'},
                 'count': {'$sum': 1}}
             },
            {'$group':
                {'_id':
                    {'season': '$_id.season'},
                 'count': {'$sum': 1}}
             },
            {'$sort':
                {'_id': 1}
             }
        ])

        for season in teams_per_season:
            teams_per_season_by_league[country][league_name][season['_id']['season']] = season['count']

        return teams_per_season_by_league


def print_teams_per_season_per_league(teams_per_season):
    for country in teams_per_season:
        for league in teams_per_season[country]:
            print(f"{country}-{league}")
            for season in teams_per_season[country][league]:
                print(f"{season}: {teams_per_season[country][league][season]}")
