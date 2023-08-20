
def apif_build_call_string(league_id, season):
    # Determine call type
    call_type = "fixtures"

    # Determine call parameters if any - create a json
    call_parameters = {'league': league_id, 'season': season}

    # Generate call string
    call_string = f"/{call_type}"

    if len(call_parameters) > 0:
        call_string = f"{call_string}?"
        para_counter = 1
        for parameter in call_parameters:
            call_string = f"{call_string}{parameter}={str(call_parameters[parameter])}"
            if para_counter < len(call_parameters):
                call_string = f"{call_string}&"
            para_counter += 1

    return call_string
