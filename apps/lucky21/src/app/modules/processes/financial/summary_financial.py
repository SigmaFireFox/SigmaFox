from modules.processes.financial.module_finance import FinancialResults
from modules.reporting.on_screen.module_reports_template_list import Alignment, ColumnDataType, ListReport, ReportHeader, ReportPeriod, printListReport


def report_Financial(period: ReportPeriod, results: list):

    # Income statement
    revenue = 0
    costOfSales = 0
    opExpenses = 0
    investmentProfit = 0
    investmentLoss = 0
    obligationInterest = 0

    # Balance sheet movements
    investmentsLTMovement = 0
    investmentsSTMovement = 0
    cashMovement = 0
    shareCapitalMovement = 0
    retainedEarningsMovement = 0
    obligationDeficitMovement = 0
    investmentSurplusMovement = 0
    liabilitesLTMovements = 0
    liabilitesSTMovements = 0

    result: FinancialResults
    openingBalances: FinancialResults

    if period == ReportPeriod.DAY or period == ReportPeriod.MONTH:
        openingBalances = results[0]
        for result in results:
            revenue += result.reveueTotal
            costOfSales += result.costOfSalesTotal
            opExpenses += result.expensesTotal
            investmentProfit += result.invesmentProfits
            investmentLoss += result.invesmentLosses
            obligationInterest += result.liabiltiesInterest
            investmentsLTMovement += result.investmentsLT
            investmentsSTMovement += result.investmentsST
            cashMovement += result.cash
            shareCapitalMovement += result.shareCapital
            retainedEarningsMovement += result.retainedEarnings
            obligationDeficitMovement += result.investmentDeficit
            investmentSurplusMovement += result.investmentSurplus
            liabilitesLTMovements += result.liabilitesLT
            liabilitesSTMovements += result.liabilitesST

    elif period == ReportPeriod.YEAR:
        openingBalances = results[0][0]
        for month in results:
            for result in month:
                revenue += result.reveueTotal
                costOfSales += result.costOfSalesTotal
                opExpenses += result.expensesTotal
                investmentProfit += result.invesmentProfits
                investmentLoss += result.invesmentLosses
                obligationInterest += result.liabiltiesInterest
                investmentsLTMovement += result.investmentsLT
                investmentsSTMovement += result.investmentsST
                cashMovement += result.cash
                shareCapitalMovement += result.shareCapital
                retainedEarningsMovement += result.retainedEarnings
                obligationDeficitMovement += result.investmentDeficit
                investmentSurplusMovement += result.investmentSurplus
                liabilitesLTMovements += result.liabilitesLT
                liabilitesSTMovements += result.liabilitesST

    elif period == ReportPeriod.LIFETIME:
        openingBalances = results[0][0][0]
        for year in results:
            for month in year:
                for result in month:
                    revenue += result.reveueTotal
                    costOfSales += result.costOfSalesTotal
                    opExpenses += result.expensesTotal
                    investmentProfit += result.invesmentProfits
                    investmentLoss += result.invesmentLosses
                    obligationInterest += result.liabiltiesInterest
                    investmentsLTMovement += result.investmentsLT
                    investmentsSTMovement += result.investmentsST
                    cashMovement += result.cash
                    shareCapitalMovement += result.shareCapital
                    retainedEarningsMovement += result.retainedEarnings
                    obligationDeficitMovement += result.investmentDeficit
                    investmentSurplusMovement += result.investmentSurplus
                    liabilitesLTMovements += result.liabilitesLT
                    liabilitesSTMovements += result.liabilitesST

    # Income statement tallies
    grossProfit = revenue - costOfSales
    opProfit = grossProfit - opExpenses
    earnings = opProfit + investmentProfit + investmentLoss + obligationInterest

    # Balance sheet tallies
    totalAssetsOpening = openingBalances.openingInvestmentsLT + \
        openingBalances.openingInvestmentsST + openingBalances.openingCash
    totalEquityOpening = openingBalances.openingShareCapital + \
        openingBalances.openingRetainedEarnings + openingBalances.openingInvestmentDeficit + \
        openingBalances.openingInvestmentSurplus
    totalLiabilitesOpening = openingBalances.openingLiabilitiesLT + \
        openingBalances.openingLiabilitiesST
    totalCapitalOpening = totalEquityOpening + totalLiabilitesOpening

    totalAssetsMovements = investmentsLTMovement + \
        investmentsSTMovement + cashMovement
    totalEquityMovements = shareCapitalMovement + \
        retainedEarningsMovement + obligationDeficitMovement + \
        investmentSurplusMovement
    totalLiabilitesMovements = liabilitesLTMovements + liabilitesSTMovements
    totalCapitalMovements = totalEquityMovements + totalLiabilitesMovements

    print(f'Finances for {period.value}')

    reportTitle = 'Income statement'
    reportHeaders = []
    reportHeaders.append(ReportHeader(
        '', 40, Alignment.START, ColumnDataType.GENERAL))
    reportHeaders.append(ReportHeader(
        'ZAR', 15, Alignment.END, ColumnDataType.DECI2))

    if revenue > 0:
        reportHeaders.append(ReportHeader(
            '% of turnover', 15, Alignment.END, ColumnDataType.DECI2))

    reportLines = [
        ['Revenue', revenue],
        ['Cost of sales', -costOfSales],
        ['Gross Profit', grossProfit],
        ['Operating expenses', -opExpenses],
        ['Operating Profit', opProfit],
        [None, None],
        ['Non-operating activities', None],
        ['  Investment profit', investmentProfit],
        ['  Investment loss', investmentLoss],
        ['  Obligations interest', obligationInterest],
        ['Net non-operating profits/(losses)',
            investmentProfit + investmentLoss + obligationInterest],
        [None, None],
        ['Earnings', earnings,],
    ]

    if revenue > 0:
        reportLines[0].append(100.00)
        reportLines[1].append(-costOfSales / revenue * 100)
        reportLines[2].append(grossProfit / revenue * 100)
        reportLines[3].append(-opExpenses / revenue * 100)
        reportLines[4].append(opProfit / revenue * 100)
        for index in range(5, 13):
            reportLines[index].append(None)

    report = ListReport(reportTitle, reportHeaders, reportLines)
    printListReport(report, False)
    print()

    reportTitle = 'Balance sheet'
    reportHeaders = []
    reportHeaders.append(ReportHeader(
        '', 40, Alignment.START, ColumnDataType.GENERAL))
    reportHeaders.append(ReportHeader(
        'Opening', 15, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Movement', 15, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Closing', 15, Alignment.END, ColumnDataType.DECI2))

    reportLines = [
        ['Assets', None, None, None],
        ['  Non-current', None, None, None],
        ['    Investments', openingBalances.openingInvestmentsLT, investmentsLTMovement,
            openingBalances.openingInvestmentsLT + investmentsLTMovement],
        ['  Current', None, None, None],
        ['    Investments', openingBalances.openingInvestmentsST,
            investmentsSTMovement, openingBalances.openingInvestmentsST +
            investmentsSTMovement],
        ['    Cash and cash equivilent', openingBalances.openingCash,
            cashMovement, openingBalances.openingCash + cashMovement],
        ['Total assets', totalAssetsOpening, totalAssetsMovements,
            totalAssetsOpening + totalAssetsMovements],
        [None, None, None, None],
        [None, None, None, None],
        ['Equity', None, None, None],
        ['  Share Capital', openingBalances.openingShareCapital, shareCapitalMovement,
            openingBalances.openingShareCapital + shareCapitalMovement],
        ['  Retained earnings', openingBalances.openingRetainedEarnings,
            retainedEarningsMovement, openingBalances.openingRetainedEarnings +
            retainedEarningsMovement],
        ['  Obligation decifit', openingBalances.openingInvestmentDeficit, obligationDeficitMovement,
            openingBalances.openingInvestmentDeficit + obligationDeficitMovement],
        ['  Investment surplus', openingBalances.openingInvestmentSurplus, investmentSurplusMovement,
            openingBalances.openingInvestmentSurplus + investmentSurplusMovement],
        ['Total Equity', totalEquityOpening, totalEquityMovements,
            totalEquityOpening + totalEquityMovements],
        [None, None, None, None],
        ['Liabilties', None, None, None],
        ['  Non-current', None, None, None],
        ['    Prize obligations', openingBalances.openingLiabilitiesLT,
            liabilitesLTMovements, openingBalances.openingLiabilitiesLT + liabilitesLTMovements],
        ['  Current', None, None, None],
        ['    Prize obligations', openingBalances.openingLiabilitiesST,
            liabilitesSTMovements, openingBalances.openingLiabilitiesST + liabilitesSTMovements],
        ['Total Liabilties', totalLiabilitesOpening, totalLiabilitesMovements,
            totalLiabilitesOpening + totalLiabilitesMovements],
        [None, None, None, None],
        ['Total Capital', totalCapitalOpening, totalCapitalMovements,
            totalCapitalOpening + totalCapitalMovements],
    ]

    report = ListReport(reportTitle, reportHeaders, reportLines)
    printListReport(report, False)
    print()

    reportTitle = 'Retained earnings recon'
    reportHeaders = []
    reportHeaders.append(ReportHeader(
        '', 40, Alignment.START, ColumnDataType.GENERAL))
    reportHeaders.append(ReportHeader(
        'ZAR', 15, Alignment.END, ColumnDataType.DECI2))

    reportLines = [
        ['Opening', result.openingRetainedEarnings +
            result.retainedEarnings - opProfit],
        ['Profit/(Loss)', opProfit],
        ['Closing', result.openingRetainedEarnings + result.retainedEarnings],

    ]

    report = ListReport(reportTitle, reportHeaders, reportLines)
    printListReport(report, False)
    print()
