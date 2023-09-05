from DatabaseQueries.MonitoredLeagues_AvailableFixtures_BySeason \
    import determine_available_fixtures_per_monitored_league
from DatabaseQueries.MonitoredLeagues_TeamsPerLeague_BySeason \
    import determine_teams_per_monitored_league_per_season


def missing_fixtures_per_monitored_league_per_season(monitored_leagues):

    print("*** Determining missing fixtures ***")

    # Determine available results and teams per season (per monitored leagues)
    available_fixtures = determine_available_fixtures_per_monitored_league(monitored_leagues)
    teams_per_season = determine_teams_per_monitored_league_per_season(monitored_leagues)

    missing_fixtures = {}
    for country in teams_per_season:
        missing_fixtures[country] = {}
        for league in teams_per_season[country]:
            missing_fixtures[country][league] = {}
            for season in teams_per_season[country][league]:
                num_teams = teams_per_season[country][league][season]
                if num_teams == 0:
                    num_teams = previous_season_num_teams
                previous_season_num_teams = num_teams
                expected_num_fixtures = num_teams * (num_teams - 1)
                num_missing_fixtures = expected_num_fixtures - available_fixtures[country][league][season]
                missing_fixtures[country][league][season] = num_missing_fixtures

    print("*** Missing fixtures determined ***")

    return missing_fixtures










