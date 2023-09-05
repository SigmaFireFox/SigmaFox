from pymongo import MongoClient


def determine_available_fixtures_per_monitored_league(monitored_leagues):

    # Structure the available_fixtures object
    available_fixtures = {}
    for league in monitored_leagues:

        # Record monitored league's country and name
        country = league['league_info']['country']
        league_name = league['league_info']['name']

        # Insert country (if not there) and league name
        if country not in available_fixtures:
            available_fixtures[country] = {}
        available_fixtures[country][league_name] = {}

        # Insert seasons (with nil as fixture count for now)
        for season in league['seasons']:
            available_fixtures[country][league_name][season] = 0

        # Insert fixture counts (per season)

        # Open required collections
        client = MongoClient('mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
        db = client['football_data']
        fixture_collection = db['football_results']

        fixtures_per_season = fixture_collection.aggregate([
            {'$match':
                {'competition.country': country,
                 'competition.league.name': league_name}
             },
            {'$group':
                {'_id': {'season': "$competition.season"},
                 'count': {'$sum': 1}}
             },
            {'$sort':
                {'_id': 1}
             }
        ])
        for season in fixtures_per_season:
            available_fixtures[country][league_name][season['_id']['season']] = season['count']

    return available_fixtures


def print_available_fixtures_per_monitored_league(available_fixtures):
    for country in available_fixtures:
        for league in available_fixtures[country]:
            print(f"{country}-{league}")
            for season in available_fixtures[country][league]:
                print(f"{season}: {available_fixtures[country][league][season]}")

