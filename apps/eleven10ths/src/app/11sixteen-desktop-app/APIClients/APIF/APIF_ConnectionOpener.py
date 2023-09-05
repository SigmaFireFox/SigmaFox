import http.client


class ApifConnection:
    def __init__(self):
        self.conn = http.client.HTTPSConnection("v3.football.api-sports.io")

        # Find API key
        # To be completed later - for now we will use one account
        api_key = "7184ca274b51ae5789979804b78eb350"

        # Create Headers
        self.headers = {
            'x-rapidapi-host': "v3.football.api-sports.io",
            'x-rapidapi-key': api_key
        }
