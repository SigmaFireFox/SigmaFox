from modules.processes.marketing.module_marketing import MarketingResults
from modules.reporting.on_screen.module_reports_template_list import Alignment, ColumnDataType, ListReport, ReportHeader, ReportPeriod, printListReport


def report_Marketing(period: ReportPeriod, results: list):
    dayCounter = 0
    totalMarketingSpend = 0

    searchSpend = 0
    searchCPM = 0
    searchImpressions = 0
    searchClicks = 0
    searchConversions = 0

    displaySpend = 0
    displayCPM = 0
    displayImpressions = 0
    displayClicks = 0
    displayConversions = 0

    result: MarketingResults

    if period == ReportPeriod.DAY or period == ReportPeriod.MONTH:
        for result in results:
            dayCounter += 1
            totalMarketingSpend += result.totalSpend

            searchSpend += result.searchSpend
            searchCPM += result.searchCPM
            searchImpressions += result.searchImpressions
            searchClicks += result.searchClicks
            searchConversions += result.searchConversions

            displaySpend += result.displaySpend
            displayCPM += result.displayCPM
            displayImpressions += result.displayImpressions
            displayClicks += result.displayClicks
            displayConversions += result.displayConversions

    elif period == ReportPeriod.YEAR:
        for month in results:
            for result in month:
                dayCounter += 1
                totalMarketingSpend += result.totalSpend

                searchSpend += result.searchSpend
                searchCPM += result.searchCPM
                searchImpressions += result.searchImpressions
                searchClicks += result.searchClicks
                searchConversions += result.searchConversions

                displaySpend += result.displaySpend
                displayCPM += result.displayCPM
                displayImpressions += result.displayImpressions
                displayClicks += result.displayClicks
                displayConversions += result.displayConversions

    elif period == ReportPeriod.LIFETIME:
        for year in results:
            for month in year:
                for result in month:
                    dayCounter += 1
                    totalMarketingSpend += result.totalSpend

                    searchSpend += result.searchSpend
                    searchCPM += result.searchCPM
                    searchImpressions += result.searchImpressions
                    searchClicks += result.searchClicks
                    searchConversions += result.searchConversions

                    displaySpend += result.displaySpend
                    displayCPM += result.displayCPM
                    displayImpressions += result.displayImpressions
                    displayClicks += result.displayClicks
                    displayConversions += result.displayConversions

    print(f'Marketing for {period.value}')

    if totalMarketingSpend != 0:

        reportTitle = 'Marketing stats'
        reportHeaders = []
        reportHeaders.append(ReportHeader(
            '', 15, Alignment.START, ColumnDataType.GENERAL))
        reportHeaders.append(ReportHeader(
            'Spend (ZAR)', 15, Alignment.END, ColumnDataType.DECI2))
        reportHeaders.append(ReportHeader(
            'Proportion (%)', 11, Alignment.END, ColumnDataType.PERC2))
        reportHeaders.append(ReportHeader(
            'Impressions', 13, Alignment.END, ColumnDataType.INT))
        reportHeaders.append(ReportHeader(
            'Ave CPM (ZAR)', 6, Alignment.END, ColumnDataType.DECI2))
        reportHeaders.append(ReportHeader(
            'Clicks', 12, Alignment.END, ColumnDataType.INT))
        reportHeaders.append(ReportHeader(
            'Click through rate', 10, Alignment.END, ColumnDataType.PERC2))
        reportHeaders.append(ReportHeader(
            'Cost per click (ZAR)', 12, Alignment.END, ColumnDataType.DECI2))
        reportHeaders.append(ReportHeader(
            'Coversions', 12, Alignment.END, ColumnDataType.INT))
        reportHeaders.append(ReportHeader(
            'Coversion rate', 12, Alignment.END, ColumnDataType.PERC2))
        reportHeaders.append(ReportHeader(
            'Cost per converson (ZAR)', 12, Alignment.END, ColumnDataType.DECI2))

        reportLines = [
            [
                'Search',
                searchSpend,
                round((searchSpend / totalMarketingSpend * 100), 2),
                searchImpressions,
                searchCPM / dayCounter,
                searchClicks,
                searchClicks / searchImpressions * 100 if searchImpressions > 0 else 0,
                searchSpend / searchClicks if searchClicks > 0 else 0,
                searchConversions,
                searchConversions / searchClicks * 100 if searchClicks > 0 else 0,
                searchSpend / searchConversions if searchConversions > 0 else 0,
            ],
            [
                'Display',
                displaySpend,
                round((displaySpend / totalMarketingSpend * 100), 2),
                displayImpressions,
                displayCPM / dayCounter,
                displayClicks,
                displayClicks / displayImpressions * 100 if displayImpressions > 0 else 0,
                displaySpend / displayClicks if displayClicks > 0 else 0,
                displayConversions,
                displayConversions / displayClicks * 100 if displayClicks > 0 else 0,
                displaySpend / displayConversions if displayConversions > 0 else 0,
            ],
            [
                'Total',
                totalMarketingSpend,
                100,
                searchImpressions + displayImpressions,
                totalMarketingSpend /
                ((searchImpressions + displayImpressions)/1000)
                if searchImpressions + displayImpressions > 0 else 0,
                searchClicks + displayClicks,
                (searchClicks + displayClicks) /
                (searchImpressions + displayImpressions) * 100
                if (searchImpressions + displayImpressions) > 0 else 0,
                (searchSpend + displaySpend) /
                (searchClicks + displayClicks)
                if (searchClicks + displayClicks) > 0 else 0,
                searchConversions + displayConversions,
                (searchConversions + displayConversions) /
                (searchClicks + displayClicks) * 100
                if (searchClicks + displayClicks) > 0 else 0,
                (searchSpend + displaySpend) /
                (searchConversions + displayConversions)
                if (searchConversions + displayConversions) > 0 else 0,
            ]
        ]

        report = ListReport(reportTitle, reportHeaders, reportLines)
        printListReport(report, False)
        print()
    else:
        print(f'No spend for the {period.value}')
        print()
