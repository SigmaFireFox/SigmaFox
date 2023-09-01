from modules.processes.accounts.module_accounts import UserAccount
from modules.processes.draws.module_draws import ColectivePayoutsSchedule, DrawResults
from modules.processes.financial.module_finance import FinancialResults
from modules.processes.games.module_games import GamesRunning
from modules.processes.marketing.module_marketing import MarketingResults
from modules.processes.sales.module_sales import SalesResults
from modules.utilities.module_utilities import CycledDate


class SimData:
    userAccounts = []
    marketingData = []
    salesData = []
    drawData = []
    financialData = []
    collecivePayouts: ColectivePayoutsSchedule

    def __init__(self):
        self.collecivePayouts = ColectivePayoutsSchedule()

    def getIndexesFromCycledDate(self, cycledDate: CycledDate):
        return cycledDate.year - 1, cycledDate.month - 1, cycledDate.day - 1

    def toCompressedJSON(self):
        returnObject = {}

        # UserAccount Data
        userAccountsSerialised = []
        userAccount: UserAccount
        for userAccount in self.userAccounts:
            userAccountsSerialised.append(userAccount.toCompressedJSON())
        returnObject['userAccounts'] = userAccountsSerialised

        # Marketing Data
        marketingDataSerialised = []
        mResults: MarketingResults
        for year in self.marketingData:
            for month in year:
                for mResults in month:
                    marketingDataSerialised.append(mResults.toCompressedJSON())
        returnObject['marketingData'] = marketingDataSerialised

        # Sales Data
        salesDataSerialised = []
        sResults: SalesResults
        for year in self.salesData:
            for month in year:
                for sResults in month:
                    salesDataSerialised.append(sResults.toCompressedJSON())
        returnObject['salesData'] = salesDataSerialised

        # Draw Data
        drawDataSerialised = []
        dResults: DrawResults
        for year in self.drawData:
            for month in year:
                for dResults in month:
                    drawDataSerialised.append(dResults.toCompressedJSON())
        returnObject['drawData'] = drawDataSerialised

        return returnObject


class SimData_Day:
    mResullts_Day: MarketingResults
    sResullts_Day: SalesResults
    dResullts_Day: DrawResults
    fResullts_Day: FinancialResults
    userAccounts = []
    collecivePayouts: ColectivePayoutsSchedule

    def __init__(
        self,
        gamesRunning: GamesRunning,
        userAccounts: list,
        collecivePayouts: ColectivePayoutsSchedule
    ):
        self.mResullts_Day = MarketingResults()
        self.sResullts_Day = SalesResults(gamesRunning)
        self.dResullts_Day = DrawResults(gamesRunning)
        self.fResullts_Day = FinancialResults()
        self.userAccounts = userAccounts
        self.collecivePayouts = collecivePayouts
