from APIClients.APIF.APIF_ConnectionOpener import ApifConnection
from APIClients.APIF.APIF_CallStringBuilder import apif_build_call_string
from DataHandlers.RawDataHandlers import RawData
from datetime import date


def save_result_to_txt(api_result, league_id, season):
    datastr = api_result.decode("utf-8")
    data_description = f"APIF call result - League {league_id} - {season} as at {date.today()}"
    data = RawData(datastr, data_description)
    data.write_to_txt()


def apif_call_season_fixtures(league_id, season):
    # Open Connection to APIF
    apif = ApifConnection()

    # Build call string
    call_string = apif_build_call_string(league_id, season)

    # Make call
    apif.conn.request("GET", call_string, headers=apif.headers)
    response = apif.conn.getresponse()
    apif_return_result = response.read()

    return apif_return_result


def apif_call_and_save_fixture_for_league_and_season(league_id, season):
    return_result = apif_call_season_fixtures(league_id, season)
    save_result_to_txt(return_result, league_id, season)
