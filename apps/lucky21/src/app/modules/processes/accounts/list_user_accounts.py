from modules.processes.accounts.module_accounts import UserAccount
from modules.reporting.on_screen.module_reports_template_list import Alignment, ColumnDataType, ListReport, ReportHeader, printListReport


def listReport_UserAccounts(userAccounts: list):
    reportTitle = 'List of user accounts'
    reportHeaders = []
    reportHeaders.append(ReportHeader(
        'Account number', 5, Alignment.START, ColumnDataType.GENERAL))
    reportHeaders.append(ReportHeader(
        'Day of opening', 5, Alignment.START, ColumnDataType.GENERAL))
    reportHeaders.append(ReportHeader(
        'Play frequency', 15, Alignment.START, ColumnDataType.GENERAL))
    reportHeaders.append(ReportHeader(
        'Stake pref', 10, Alignment.START, ColumnDataType.GENERAL))
    reportHeaders.append(ReportHeader(
        'Stake per play pref', 10, Alignment.START, ColumnDataType.GENERAL))

    reportLines = []
    account: UserAccount
    for account in userAccounts:
        reportLines.append([
            account.accountNumber,
            account.openedDay,
            account.userPersona.participationFrequency.name,
            account.userPersona.gamePreferance.value,
            account.userPersona.budget.value
        ])

    report = ListReport(reportTitle, reportHeaders, reportLines)
    printListReport(report, False)
