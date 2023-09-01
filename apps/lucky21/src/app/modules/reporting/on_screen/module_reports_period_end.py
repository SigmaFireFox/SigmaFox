from modules.processes.draws.module_draws import DrawResults
from modules.processes.draws.summary_draws import reports_Draws
from modules.processes.financial.module_finance import FinancialResults
from modules.processes.games.module_games import GamesRunning
from modules.processes.marketing.module_marketing import MarketingResults
from modules.processes.sales.module_sales import SalesResults
from modules.reporting.on_screen.module_reports_template_list import ReportPeriod
from modules.utilities.module_utilities import CycledDate
from modules.simulator.class_SimData import SimData
from modules.processes.financial.summary_financial import report_Financial
from modules.processes.marketing.summary_marketing import report_Marketing
from modules.processes.sales.summary_sales import report_Sales


def printPeriodEndReports(period: ReportPeriod, cycledDate: CycledDate, simData: SimData, gamesRunning: GamesRunning):
    year, month, day = simData.getIndexesFromCycledDate(cycledDate)
    mResults: MarketingResults
    sResults: SalesResults
    dResults: DrawResults
    fResults: FinancialResults

    match period:
        case ReportPeriod.DAY:
            header = f'Day report {day + 1}/{month + 1}/{year + 1} #{cycledDate.totalDayCount}'
            mResults = [simData.marketingData[year][month][day]]
            sResults = [simData.salesData[year][month][day]]
            dResults = [simData.drawData[year][month][day]]
            fResults = [simData.financialData[year][month][day]]
        case ReportPeriod.MONTH:
            header = f'Month report - Month {month + 1}/{year + 1}'
            mResults = simData.marketingData[year][month]
            sResults = simData.salesData[year][month]
            dResults = simData.drawData[year][month]
            fResults = simData.financialData[year][month]
        case ReportPeriod.YEAR:
            header = f'{"*"*56} Annual report - Year {year + 1} {"*"*56}'
            mResults = simData.marketingData[year]
            sResults = simData.salesData[year]
            dResults = simData.drawData[year]
            fResults = simData.financialData[year]
        case ReportPeriod.LIFETIME:
            header = f'{"*"*64} Lifetime report {"*"*64}'
            mResults = simData.marketingData
            sResults = simData.salesData
            dResults = simData.drawData
            fResults = simData.financialData

        case _:
            print('No report period provided')

    print(header)
    print()

    report_Marketing(period, mResults)
    report_Sales(period, sResults, gamesRunning)
    reports_Draws(period, dResults, gamesRunning)
    report_Financial(period, fResults)
