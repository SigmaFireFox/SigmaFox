from module_finance import FinancialResults
from module_marketing import MarketingResults
from module_reports_template_list import Alignment, ColumnDataType, ListReport, ReportHeader, printListReport


def historyReport_Marketing(cumilatedMarketingData):
    reportTitle = 'Marketing history report'
    reportHeaders = []
    reportHeaders.append(ReportHeader(
        'Day', 5, Alignment.START, ColumnDataType.GENERAL))
    reportHeaders.append(ReportHeader(
        'Total spend', 15, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Search spend', 15, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Display spend', 15, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Search impressions', 12, Alignment.END, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'Display impressions', 12, Alignment.END, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'Search clicks', 8, Alignment.END, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'Display clicks', 8, Alignment.END, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'Search conversions ', 8, Alignment.END, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'Display conversions ', 8, Alignment.END, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'New accounts ', 8, Alignment.END, ColumnDataType.INT))

    reportLines = []
    for year in cumilatedMarketingData:
        for month in year:
            dayResults: MarketingResults
            for dayResults in month:
                reportLines.append([
                    dayResults.totalSpend,
                    dayResults.searchSpend,
                    dayResults.displaySpend,
                    dayResults.searchImpressions,
                    dayResults.displayImpressions,
                    dayResults.searchClicks,
                    dayResults.displayClicks,
                    dayResults.searchConversions,
                    dayResults.displayConversions,
                    dayResults.searchConversions + dayResults.displayConversions,
                ])

    report = ListReport(reportTitle, reportHeaders, reportLines)
    printListReport(report, True)


def historyReport_SearchMarketingPerformance(cumilatedMarketingData):
    reportTitle = 'Search marketing performance history report'
    reportHeaders = []
    reportHeaders.append(ReportHeader(
        'Day', 5, Alignment.START, ColumnDataType.GENERAL))
    reportHeaders.append(ReportHeader(
        'Total marketing spend', 15, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Spend', 15, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Spend portion', 15, Alignment.END, ColumnDataType.PERC2))
    reportHeaders.append(ReportHeader(
        'Impressions', 12, Alignment.END, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'CPM', 12, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Clicks', 8, Alignment.END, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'Cost per Click', 12, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Conversions ', 8, Alignment.END, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'Cost per conversions ', 12, Alignment.END, ColumnDataType.DECI2))

    reportLines = []
    for year in cumilatedMarketingData:
        for month in year:
            dayResults: MarketingResults
            for dayResults in month:
                spendPortion = 0
                costPer1000Impressions = 0
                costPerClick = 0
                costPerConversion = 0

                if dayResults.totalSpend > 0:
                    spendPortion = dayResults.searchSpend / dayResults.totalSpend * 100
                if dayResults.searchImpressions > 0:
                    costPer1000Impressions = dayResults.searchSpend / \
                        dayResults.searchImpressions * 1000
                if dayResults.searchClicks > 0:
                    costPerClick = dayResults.searchSpend / dayResults.searchClicks
                if dayResults.searchConversions > 0:
                    costPerConversion = dayResults.searchSpend / dayResults.searchConversions

                reportLines.append([
                    dayResults.totalSpend,
                    dayResults.searchSpend,
                    spendPortion,
                    dayResults.searchImpressions,
                    costPer1000Impressions,
                    dayResults.searchClicks,
                    costPerClick,
                    dayResults.searchConversions,
                    costPerConversion,
                ])

    report = ListReport(reportTitle, reportHeaders, reportLines)
    printListReport(report, True)


def historyReport_DisplayMarketingPerformance(cumilatedMarketingData):
    reportTitle = 'Display marketing performance history report'
    reportHeaders = []
    reportHeaders.append(ReportHeader(
        'Day', 5, Alignment.START, ColumnDataType.GENERAL))
    reportHeaders.append(ReportHeader(
        'Total marketing spend', 15, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Spend', 15, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Spend portion', 15, Alignment.END, ColumnDataType.PERC2))
    reportHeaders.append(ReportHeader(
        'Impressions', 12, Alignment.END, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'CPM', 12, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Clicks', 8, Alignment.END, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'Cost per Click', 12, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Conversions ', 8, Alignment.END, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'Cost per conversions ', 12, Alignment.END, ColumnDataType.DECI2))

    reportLines = []
    for year in cumilatedMarketingData:
        for month in year:
            dayResults: MarketingResults
            for dayResults in month:
                spendPortion = 0
                costPer1000Impressions = 0
                costPerClick = 0
                costPerConversion = 0

                if dayResults.totalSpend > 0:
                    spendPortion = dayResults.displaySpend / dayResults.totalSpend * 100
                if dayResults.displayImpressions > 0:
                    costPer1000Impressions = dayResults.displaySpend / \
                        dayResults.displayImpressions * 1000
                if dayResults.displayClicks > 0:
                    costPerClick = dayResults.displaySpend / dayResults.displayClicks
                if dayResults.displayConversions > 0:
                    costPerConversion = dayResults.displaySpend / dayResults.displayConversions

                reportLines.append([
                    dayResults.totalSpend,
                    dayResults.displaySpend,
                    spendPortion,
                    dayResults.displayImpressions,
                    costPer1000Impressions,
                    dayResults.displayClicks,
                    costPerClick,
                    dayResults.displayConversions,
                    costPerConversion,
                ])

    report = ListReport(reportTitle, reportHeaders, reportLines)
    printListReport(report, True)


def historyReport_CashReserves(cumilatedFinancialData):
    reportTitle = 'Cash history report'
    reportHeaders = []
    reportHeaders.append(ReportHeader(
        'Day', 5, Alignment.START, ColumnDataType.GENERAL))
    reportHeaders.append(ReportHeader(
        'Opening', 15, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Income', 15, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Cost of Sales', 15, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Op Expense', 15, Alignment.END, ColumnDataType.DECI2))
    reportHeaders.append(ReportHeader(
        'Closing', 15, Alignment.END, ColumnDataType.DECI2))

    reportLines = []
    for year in cumilatedFinancialData:
        for month in year:
            dayResults: FinancialResults
            for dayResults in month:
                reportLines.append([
                    dayResults.cash +
                    dayResults.expensesTotal + dayResults.costOfSalesTotal -
                    dayResults.reveueTotal,
                    dayResults.reveueTotal,
                    - dayResults.costOfSalesTotal,
                    - dayResults.expensesTotal,
                    dayResults.cash
                ])

    report = ListReport(reportTitle, reportHeaders, reportLines)
    printListReport(report, True)
