from modules.processes.draws.module_draws import DrawResults, GameWinsByTier
from modules.processes.games.module_games import GamesRunning
from modules.reporting.on_screen.module_reports_template_list import Alignment, ColumnDataType, ListReport, ReportHeader, ReportPeriod, printListReport


def reports_Draws(period: ReportPeriod, results: list, gamesRunning: GamesRunning):

    def processResult(result: DrawResults):
        for gameName in result.gameWinsByTier:
            resultGameWinsByTier: GameWinsByTier = result.gameWinsByTier[gameName]
            for tier in resultGameWinsByTier.tiers:
                summaryGameWinsByTier: GameWinsByTier = summary.gameWinsByTier[gameName]
                summaryGameWinsByTier.tiers[tier] += resultGameWinsByTier.tiers[tier]

    # Set summary data
    summary = DrawResults(gamesRunning)
    result: DrawResults
    if period == ReportPeriod.DAY or period == ReportPeriod.MONTH:
        for result in results:
            processResult(result)

    elif period == ReportPeriod.YEAR:
        for month in results:
            for result in month:
                processResult(result)

    elif period == ReportPeriod.LIFETIME:
        for year in results:
            for month in year:
                for result in month:
                    processResult(result)

    # Determine the max number of tiers
    maxTiers = 0
    for gameName in summary.gameWinsByTier:
        gameWinsByTier: GameWinsByTier = summary.gameWinsByTier[gameName]
        tierCountInGame = len(gameWinsByTier.tiers)
        maxTiers = max(maxTiers, tierCountInGame)

    print(f'Prizes for {period.value}')

    reportTitle = 'Prizes'
    reportHeaders = []
    reportHeaders.append(ReportHeader(
        'Game', 15, Alignment.START, ColumnDataType.GENERAL))
    # Dynamically determine the number of tier columns needed
    for tierCount in range(1, maxTiers + 1):
        reportHeaders.append(ReportHeader(
            f'Tier {tierCount}', 12, Alignment.END, ColumnDataType.INT))

    reportLines = []
    for gameName in summary.gameWinsByTier:
        reportLine = [gameName.name]
        gameWinsByTier: GameWinsByTier = summary.gameWinsByTier[gameName]
        tierCount = 0
        for tier in gameWinsByTier.tiers:
            reportLine.append(gameWinsByTier.tiers[tier])
            tierCount += 1
        emptyColCount = max(0, maxTiers - tierCount)
        for _ in range(emptyColCount):
            reportLine.append(None)
        reportLines.append(reportLine)

    # Add game totals column
    reportHeaders.append(ReportHeader(
        'Game totals', 12, Alignment.END, ColumnDataType.INT))
    for row in range(len(reportLines)):
        gameTotal = 0
        for column in range(1, len(reportHeaders) - 1):
            if reportLines[row][column]:
                gameTotal += reportLines[row][column]
        reportLines[row].append(gameTotal)

    # Add tier total row
    reportLine = ['Tier totals']
    for column in range(1, len(reportHeaders)):
        tierTotal = 0
        for row in range(len(reportLines)):
            if reportLines[row][column]:
                tierTotal += reportLines[row][column]
        reportLine.append(tierTotal)

    reportLines.append(reportLine)

    report = ListReport(reportTitle, reportHeaders, reportLines)
    printListReport(report, False)
    print()
