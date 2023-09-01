from modules.processes.games.module_games import GameName, GamesRunning
from modules.processes.sales.module_sales import GameSalesResults, SalesResults
from modules.reporting.on_screen.module_reports_template_list import Alignment, ColumnDataType, ListReport, ReportHeader, ReportPeriod, printListReport


class SalesReportLineData:
    gameName: GameName
    results: GameSalesResults

    def __init__(self, game: str, results: GameSalesResults):
        self.gameName = game
        self.results = results


def report_Sales(period: ReportPeriod, results: list, gamesRunning: GamesRunning):
    summary = {}
    for game in gamesRunning.listOfGames:
        summary[game] = GameSalesResults()

    result: SalesResults
    if period == ReportPeriod.DAY or period == ReportPeriod.MONTH:
        for result in results:
            for gameName in result.games:
                resultGame: GameSalesResults = result.games[gameName]
                summaryGame: GameSalesResults = summary[gameName]
                summaryGame.userCount += resultGame.userCount
                summaryGame.playerCount += resultGame.playerCount
                summaryGame.ticketCount += resultGame.ticketCount
                summaryGame.revenue += resultGame.revenue
    elif period == ReportPeriod.YEAR:
        for month in results:
            for result in month:
                for gameName in result.games:
                    resultGame: GameSalesResults = result.games[gameName]
                    summaryGame: GameSalesResults = summary[gameName]
                    summaryGame.userCount += resultGame.userCount
                    summaryGame.playerCount += resultGame.playerCount
                    summaryGame.ticketCount += resultGame.ticketCount
                    summaryGame.revenue += resultGame.revenue
    elif period == ReportPeriod.LIFETIME:
        for year in results:
            for month in year:
                for result in month:
                    for gameName in result.games:
                        resultGame: GameSalesResults = result.games[gameName]
                        summaryGame: GameSalesResults = summary[gameName]
                        summaryGame.userCount += resultGame.userCount
                        summaryGame.playerCount += resultGame.playerCount
                        summaryGame.ticketCount += resultGame.ticketCount
                        summaryGame.revenue += resultGame.revenue

    print(f'Sales for {period.value}')

    # Total for period report
    reportTitle = 'Sales totals'
    reportHeaders = []
    reportHeaders.append(ReportHeader(
        'Game', 10, Alignment.START, ColumnDataType.GENERAL))
    reportHeaders.append(ReportHeader(
        'User days', 12, Alignment.END, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'Sales', 10, Alignment.END, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'Sales %', 10, Alignment.END, ColumnDataType.PERC2))
    reportHeaders.append(ReportHeader(
        'Tickets', 12, Alignment.END, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'Tickets per player', 12, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Revenue', 14, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Revenue per user', 12, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Revenue per player', 12, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Revenue per ticket', 12, Alignment.END, ColumnDataType.DECI2))

    reportLineData = []
    gameName: GameName
    for gameName in summary:
        reportLineData.append(
            SalesReportLineData(
                gameName.name,
                summary[gameName]
            )
        )

    totals = GameSalesResults()
    for line in reportLineData:
        totals.userCount += line.results.userCount
        totals.playerCount += line.results.playerCount
        totals.ticketCount += line.results.ticketCount
        totals.revenue += line.results.revenue

    reportLineData.append(SalesReportLineData('Total', totals))

    reportLines = []
    line: SalesReportLineData
    for line in reportLineData:
        reportLine = [
            line.gameName,
            line.results.userCount,
            line.results.playerCount,
            line.results.playerCount / line.results.userCount * 100
            if line.results.userCount > 0 else 0,
            line.results.ticketCount,
            line.results.ticketCount / line.results.playerCount
            if line.results.playerCount > 0 else 0,
            line.results.revenue,
            line.results.revenue / line.results.userCount
            if line.results.userCount > 0 else 0,
            line.results.revenue / line.results.playerCount
            if line.results.playerCount > 0 else 0,
            line.results.revenue / line.results.ticketCount
            if line.results.ticketCount > 0 else 0,
        ]
        reportLines.append(reportLine)

    report = ListReport(reportTitle, reportHeaders, reportLines)
    printListReport(report, False)
    print()

    # Average per period report
    if period != ReportPeriod.DAY:

        periodCounter: int
        minorPeriod: ReportPeriod
        match period:
            case ReportPeriod.LIFETIME:
                periodCounter = len(results)
                minorPeriod = ReportPeriod.YEAR
            case ReportPeriod.YEAR:
                periodCounter = 12
                minorPeriod = ReportPeriod.MONTH
            case ReportPeriod.MONTH:
                periodCounter = 30
                minorPeriod = ReportPeriod.DAY

        reportTitle = f'Sales averages per {minorPeriod.value}'

        reportLines = []

        for line in reportLineData:
            line.results.userCount = line.results.userCount / periodCounter
            line.results.playerCount = line.results.playerCount / periodCounter
            line.results.ticketCount = line.results.ticketCount / periodCounter
            line.results.revenue = line.results.revenue / periodCounter

            reportLine = [
                line.gameName,
                line.results.userCount,
                line.results.playerCount,
                line.results.playerCount / line.results.userCount * 100
                if line.results.userCount > 0 else 0,
                line.results.ticketCount,
                line.results.ticketCount / line.results.playerCount
                if line.results.playerCount > 0 else 0,
                line.results.revenue,
                line.results.revenue / line.results.userCount
                if line.results.userCount > 0 else 0,
                line.results.revenue / line.results.playerCount
                if line.results.playerCount > 0 else 0,
                line.results.revenue / line.results.ticketCount
                if line.results.ticketCount > 0 else 0,
            ]
            reportLines.append(reportLine)

        report = ListReport(reportTitle, reportHeaders, reportLines)
        printListReport(report, False)
        print()
