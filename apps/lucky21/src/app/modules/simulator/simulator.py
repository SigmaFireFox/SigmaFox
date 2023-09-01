from modules.processes.accounts.module_accounts import UserAccount, generateNewUserAccountsForDay
from modules.processes.draws.module_draws import DrawResults
from modules.processes.financial.module_finance import CostOfSalesType, EconomicData, ExpenseType, FinancialResults, recordOpeningBalances
from modules.processes.games.module_games import GamesRunning
from modules.processes.marketing.module_marketing import MarketingBudget, MarketingResults
from modules.processes.accounts.list_user_accounts import listReport_UserAccounts
from modules.processes.sales.module_sales import SalesResults, determineSalesForUser
from modules.reporting.on_file.sim_results import recordSimResults
from modules.reporting.on_screen.module_reports_period_end import printPeriodEndReports
from modules.reporting.on_screen.module_reports_summary import summaryReport_UserSpread
from modules.reporting.on_screen.module_reports_template_list import ReportPeriod, ReportsConfig
from modules.utilities.module_utilities import CycledDate
from modules.simulator.class_SimData import SimData, SimData_Day


class SimulatorParameters:
    simulationYears: int
    startingCapital: int
    requiredRateOfReturn: float
    reportsConfig: ReportsConfig

    def __init__(
        self,
        simulationYears: int,
        startingCapital: int,
        requiredRateOfReturn: float,
        reportsConfig: ReportsConfig
    ):
        self.simulationYears = simulationYears
        self.startingCapital = startingCapital
        self.requiredRateOfReturn = requiredRateOfReturn
        self.reportsConfig = reportsConfig


def dayProcess_Marketing(
        simData_Day: SimData_Day,
        ecoData: EconomicData,
        mBudget: MarketingBudget
):
    mResults_Day: MarketingResults = simData_Day.mResullts_Day
    fResults_Day: FinancialResults = simData_Day.fResullts_Day

    mResults_Day.processMarketingActivities(ecoData, mBudget)
    fResults_Day.recordOpExpense(
        mResults_Day.totalSpend, ExpenseType.MARKETING)


def dayProcess_NewAccounts(simData_Day: SimData_Day, gamesRunning: GamesRunning, date: CycledDate):

    mResults_Day: MarketingResults = simData_Day.mResullts_Day
    currentAccountsCount = len(simData_Day.userAccounts)
    totalConversions = mResults_Day.totalConversions

    newAccounts = generateNewUserAccountsForDay(
        date.totalDayCount,
        totalConversions,
        currentAccountsCount,
        gamesRunning
    )
    for newAccount in newAccounts:
        simData_Day.userAccounts.append(newAccount)


def dayProcess_Sales(simData_Day: SimData_Day, gamesRunning: GamesRunning):

    sResults_Day: SalesResults = simData_Day.sResullts_Day
    fResults_Day: FinancialResults = simData_Day.fResullts_Day

    user: UserAccount
    for user in simData_Day.userAccounts:
        ticketsSoldToUser = determineSalesForUser(user, gamesRunning)
        sResults_Day.recordUserSales(user, ticketsSoldToUser)

    revenueForDay = sResults_Day.getTotalRevenue()
    fResults_Day.recordSales(revenueForDay)


def dayProcess_Draws(simData_Day: SimData_Day, gamesRunning: GamesRunning):

    sResults_Day: SalesResults = simData_Day.sResullts_Day
    dResults_Day: DrawResults = simData_Day.dResullts_Day
    fResults_Day: FinancialResults = simData_Day.fResullts_Day

    dResults_Day.drawWinningNumbers(gamesRunning)
    allTickets = sResults_Day.getAllTickets()
    if allTickets:
        dResults_Day.determineWinningTickets(gamesRunning, allTickets)
    dResults_Day.setWinsSummary(gamesRunning)

    # simData_Day.collecivePayouts.recordDaysPrizes(cycledDate, dResults_Day)

    fResults_Day.recordPrizeCapitalAllocation(
        dResults_Day.totalPrizeAllocation, CostOfSalesType.PRIZE_ALLOCATION)


def dayProcess_FinancialAdjustments(simData_Day: SimData_Day, ecoData: EconomicData, date: CycledDate):

    fResults_Day: FinancialResults = simData_Day.fResullts_Day

    fResults_Day.recordInvestmentAndObligationAdjustments(ecoData)
    fResults_Day.recordPrizeRealisations(
        simData_Day.collecivePayouts, date)


######################################################## Main processing #######################################################

def runSimulator(simulatorParameters: SimulatorParameters):

    # Initialise Data
    date = CycledDate()
    ecoData = EconomicData()
    simData = SimData()
    mBudget = MarketingBudget()
    closingBalances: FinancialResults
    gamesRunning = GamesRunning(
        simulatorParameters.startingCapital,
        simulatorParameters.requiredRateOfReturn
    )

    firstDay = True

    for y in range(simulatorParameters.simulationYears):
        # Add new year to simData
        simData.marketingData.append([])
        simData.salesData.append([])
        simData.drawData.append([])
        simData.financialData.append([])

        for m in range(12):
            # Add new month to simData
            simData.marketingData[y].append([])
            simData.salesData[y].append([])
            simData.drawData[y].append([])
            simData.financialData[y].append([])

            for d in range(30):
                date.nextDay()

                # Initalise report data for day (expect financial data)
                simData_day = SimData_Day(
                    gamesRunning, simData.userAccounts, simData.collecivePayouts)

                if firstDay:
                    simData_day.fResullts_Day.recordShareCapitalInjection(
                        simulatorParameters.startingCapital)
                    firstDay = False
                else:
                    openingBalances = simData_day.fResullts_Day
                    recordOpeningBalances(closingBalances, openingBalances)

                # Global financial data
                ecoData.updateExchangeRate()
                ecoData.determineMarketReturnForDay()

                # Process for day
                dayProcess_Marketing(simData_day, ecoData, mBudget)
                dayProcess_NewAccounts(simData_day, gamesRunning, date)
                dayProcess_Sales(simData_day, gamesRunning)
                dayProcess_Draws(simData_day, gamesRunning)
                dayProcess_FinancialAdjustments(simData_day, ecoData, date)

                # Append sim data for day to gloabl sim data
                simData.marketingData[y][m].append(simData_day.mResullts_Day)
                simData.salesData[y][m].append(simData_day.sResullts_Day)
                simData.drawData[y][m].append(simData_day.dResullts_Day)
                simData.financialData[y][m].append(simData_day.fResullts_Day)
                simData.userAccounts = simData_day.userAccounts

                # Reports for day (if any)
                if simulatorParameters.reportsConfig.daily:
                    printPeriodEndReports(
                        ReportPeriod.DAY, date, simData, gamesRunning)

                # Record balance sheet closing balances
                closingBalances = simData_day.fResullts_Day

            # Month end process
            if simulatorParameters.reportsConfig.monthly:
                printPeriodEndReports(ReportPeriod.MONTH,
                                      date, simData, gamesRunning)
            avaliableCash = closingBalances.openingCash + closingBalances.cash
            avaliableEquity = closingBalances.openingShareCapital + closingBalances.shareCapital + \
                closingBalances.openingRetainedEarnings + closingBalances.retainedEarnings + \
                closingBalances.openingInvestmentSurplus + closingBalances.investmentSurplus + \
                closingBalances.openingInvestmentDeficit + closingBalances.investmentDeficit

            mBudget.setMarketBudgetForMonth(avaliableCash)
            gamesRunning.setGames(avaliableEquity)

        # Annual process
        if simulatorParameters.reportsConfig.annual:
            printPeriodEndReports(
                ReportPeriod.YEAR, date, simData, gamesRunning)

    # History and summary reports at end of simulation
    if simulatorParameters.reportsConfig.lifetime:
        printPeriodEndReports(ReportPeriod.LIFETIME,
                              date, simData, gamesRunning)

    if simulatorParameters.reportsConfig.summaries:
        summaryReport_UserSpread(simData.userAccounts)

    if simulatorParameters.reportsConfig.lists:
        listReport_UserAccounts(simData.userAccounts)

    # Record simulation results
    recordSimResults(simData)
