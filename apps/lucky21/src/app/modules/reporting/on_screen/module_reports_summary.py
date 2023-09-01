from modules.processes.accounts.module_accounts import Budget, UserAccount
from modules.processes.games.module_games import GameName
from modules.reporting.on_screen.module_reports_template_list import Alignment, ColumnDataType, ListReport, ReportHeader, printListReport
from modules.utilities.module_utilities import Frequency


class PersonaMatrixBudgetSpread:
    frequencyDAILY: int
    frequencySEMIWEEKLY: int
    frequencyWEEKLY: int
    frequencyBIWEEKLY: int
    frequencyMONTHLY: int
    frequencyOCCATIONALLY: int

    def __init__(self):
        self.frequencyDAILY = 0
        self.frequencySEMIWEEKLY = 0
        self.frequencyWEEKLY = 0
        self.frequencyBIWEEKLY = 0
        self.frequencyMONTHLY = 0
        self.frequencyOCCATIONALLY = 0

    def accessFrequency(self, frequency: Frequency):
        if frequency == Frequency.DAILY:
            self.frequencyDAILY += 1
        if frequency == Frequency.SEMIWEEKLY:
            self.frequencySEMIWEEKLY += 1
        if frequency == Frequency.WEEKLY:
            self.frequencyWEEKLY += 1
        if frequency == Frequency.BIWEEKLY:
            self.frequencyBIWEEKLY += 1
        if frequency == Frequency.MONTHLY:
            self.frequencyMONTHLY += 1
        if frequency == Frequency.OCCATIONALLY:
            self.frequencyOCCATIONALLY += 1


class PersonaMatrix:
    prefGame: GameName
    TIER001: PersonaMatrixBudgetSpread
    TIER002: PersonaMatrixBudgetSpread
    TIER005: PersonaMatrixBudgetSpread
    TIER010: PersonaMatrixBudgetSpread
    TIER015: PersonaMatrixBudgetSpread
    TIER020: PersonaMatrixBudgetSpread
    TIER025: PersonaMatrixBudgetSpread
    TIER050: PersonaMatrixBudgetSpread
    TIER100: PersonaMatrixBudgetSpread
    TIER200: PersonaMatrixBudgetSpread

    def __init__(self, prefGame: GameName):
        self.prefGame = prefGame
        self.TIER001 = PersonaMatrixBudgetSpread()
        self.TIER002 = PersonaMatrixBudgetSpread()
        self.TIER005 = PersonaMatrixBudgetSpread()
        self.TIER010 = PersonaMatrixBudgetSpread()
        self.TIER015 = PersonaMatrixBudgetSpread()
        self.TIER020 = PersonaMatrixBudgetSpread()
        self.TIER025 = PersonaMatrixBudgetSpread()
        self.TIER050 = PersonaMatrixBudgetSpread()
        self.TIER100 = PersonaMatrixBudgetSpread()
        self.TIER200 = PersonaMatrixBudgetSpread()

    def accessBudgets(self, userAccount: UserAccount):
        frequency = userAccount.userPersona.participationFrequency
        if userAccount.userPersona.budget == Budget.TIER001:
            self.TIER001.accessFrequency(frequency)
        if userAccount.userPersona.budget == Budget.TIER002:
            self.TIER002.accessFrequency(frequency)
        if userAccount.userPersona.budget == Budget.TIER005:
            self.TIER005.accessFrequency(frequency)
        if userAccount.userPersona.budget == Budget.TIER010:
            self.TIER010.accessFrequency(frequency)
        if userAccount.userPersona.budget == Budget.TIER015:
            self.TIER015.accessFrequency(frequency)
        if userAccount.userPersona.budget == Budget.TIER020:
            self.TIER020.accessFrequency(frequency)
        if userAccount.userPersona.budget == Budget.TIER025:
            self.TIER025.accessFrequency(frequency)
        if userAccount.userPersona.budget == Budget.TIER050:
            self.TIER050.accessFrequency(frequency)
        if userAccount.userPersona.budget == Budget.TIER100:
            self.TIER100.accessFrequency(frequency)
        if userAccount.userPersona.budget == Budget.TIER200:
            self.TIER200.accessFrequency(frequency)


def accessPersonas(userAccounts: UserAccount):
    gamePersonas = {
        GameName.QCMonth.name: PersonaMatrix(GameName.QCMonth),
        GameName.QCWeek.name: PersonaMatrix(GameName.QCWeek),
        GameName.QCDay.name: PersonaMatrix(GameName.QCDay),
        GameName.LFL100.name: PersonaMatrix(GameName.LFL100),
        GameName.LFL1000.name: PersonaMatrix(GameName.LFL1000),
        GameName.LFL10000.name: PersonaMatrix(GameName.LFL10000),
    }

    userAccount: UserAccount
    for userAccount in userAccounts:
        persona: PersonaMatrix = gamePersonas[userAccount.userPersona.gamePreferance]
        persona.accessBudgets(userAccount)

    return gamePersonas


def printMaxtrix(matrix: PersonaMatrix):

    reportTitle = 'Summary matrix of user - ' + \
        matrix.prefGame.name.title() + ' game'
    reportHeaders = []
    reportHeaders.append(ReportHeader(
        'Budget', 10, Alignment.START, ColumnDataType.GENERAL))
    reportHeaders.append(ReportHeader(
        'Daily', 10, Alignment.CENTRE, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'SemiWeekly', 10, Alignment.CENTRE, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'Weekly', 10, Alignment.CENTRE, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'BiWeekly', 10, Alignment.CENTRE, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'Monthly', 10, Alignment.CENTRE, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'Occationally', 10, Alignment.CENTRE, ColumnDataType.INT))
    reportHeaders.append(ReportHeader(
        'Total per budget', 12, Alignment.CENTRE, ColumnDataType.INT))

    dailyPlayers = [matrix.TIER001.frequencyDAILY,
                    matrix.TIER002.frequencyDAILY,
                    matrix.TIER005.frequencyDAILY,
                    matrix.TIER010.frequencyDAILY,
                    matrix.TIER015.frequencyDAILY,
                    matrix.TIER020.frequencyDAILY,
                    matrix.TIER025.frequencyDAILY,
                    matrix.TIER050.frequencyDAILY,
                    matrix.TIER100.frequencyDAILY,
                    matrix.TIER200.frequencyDAILY
                    ]

    semiWeeklyPlayers = [matrix.TIER001.frequencySEMIWEEKLY,
                         matrix.TIER002.frequencySEMIWEEKLY,
                         matrix.TIER005.frequencySEMIWEEKLY,
                         matrix.TIER010.frequencySEMIWEEKLY,
                         matrix.TIER015.frequencySEMIWEEKLY,
                         matrix.TIER020.frequencySEMIWEEKLY,
                         matrix.TIER025.frequencySEMIWEEKLY,
                         matrix.TIER050.frequencySEMIWEEKLY,
                         matrix.TIER100.frequencySEMIWEEKLY,
                         matrix.TIER200.frequencySEMIWEEKLY
                         ]

    weeklyPlayers = [matrix.TIER001.frequencyWEEKLY,
                     matrix.TIER002.frequencyWEEKLY,
                     matrix.TIER005.frequencyWEEKLY,
                     matrix.TIER010.frequencyWEEKLY,
                     matrix.TIER015.frequencyWEEKLY,
                     matrix.TIER020.frequencyWEEKLY,
                     matrix.TIER025.frequencyWEEKLY,
                     matrix.TIER050.frequencyWEEKLY,
                     matrix.TIER100.frequencyWEEKLY,
                     matrix.TIER200.frequencyWEEKLY
                     ]

    biWeeklyPlayers = [matrix.TIER001.frequencyBIWEEKLY,
                       matrix.TIER002.frequencyBIWEEKLY,
                       matrix.TIER005.frequencyBIWEEKLY,
                       matrix.TIER010.frequencyBIWEEKLY,
                       matrix.TIER015.frequencyBIWEEKLY,
                       matrix.TIER020.frequencyBIWEEKLY,
                       matrix.TIER025.frequencyBIWEEKLY,
                       matrix.TIER050.frequencyBIWEEKLY,
                       matrix.TIER100.frequencyBIWEEKLY,
                       matrix.TIER200.frequencyBIWEEKLY
                       ]

    monthlyPlayers = [matrix.TIER001.frequencyMONTHLY,
                      matrix.TIER002.frequencyMONTHLY,
                      matrix.TIER005.frequencyMONTHLY,
                      matrix.TIER010.frequencyMONTHLY,
                      matrix.TIER015.frequencyMONTHLY,
                      matrix.TIER020.frequencyMONTHLY,
                      matrix.TIER025.frequencyMONTHLY,
                      matrix.TIER050.frequencyMONTHLY,
                      matrix.TIER100.frequencyMONTHLY,
                      matrix.TIER200.frequencyMONTHLY
                      ]

    occationalPlayers = [matrix.TIER001.frequencyOCCATIONALLY,
                         matrix.TIER002.frequencyOCCATIONALLY,
                         matrix.TIER005.frequencyOCCATIONALLY,
                         matrix.TIER010.frequencyOCCATIONALLY,
                         matrix.TIER015.frequencyOCCATIONALLY,
                         matrix.TIER020.frequencyOCCATIONALLY,
                         matrix.TIER025.frequencyOCCATIONALLY,
                         matrix.TIER050.frequencyOCCATIONALLY,
                         matrix.TIER100.frequencyOCCATIONALLY,
                         matrix.TIER200.frequencyOCCATIONALLY
                         ]

    playerGroups = [dailyPlayers, semiWeeklyPlayers,
                    weeklyPlayers, biWeeklyPlayers, monthlyPlayers, occationalPlayers]

    budgetTiers = [Budget.TIER001, Budget.TIER002,
                   Budget.TIER005, Budget.TIER010,
                   Budget.TIER015, Budget.TIER020,
                   Budget.TIER025, Budget.TIER050,
                   Budget.TIER100, Budget.TIER200,]

    reportLines = []

    budget: Budget
    rowCounter = 0
    for budget in budgetTiers:
        reportLine = []
        budgetValue = budget.value
        reportLine.append(f'R{budgetValue}')
        for group in playerGroups:
            reportLine.append(group[rowCounter])
        reportLineTotal = 0
        for value in reportLine[1:len(reportLine)]:
            reportLineTotal += value
        reportLine.append(reportLineTotal)
        reportLines.append(reportLine)
        rowCounter += 1

    reportLine = ['Total']
    for column in range(1, len(playerGroups) + 2):
        colTotal = 0
        for line in reportLines:
            colTotal += line[column]
        reportLine.append(colTotal)

    reportLines.append(reportLine)

    report = ListReport(reportTitle, reportHeaders, reportLines)
    printListReport(report, False)


def summaryReport_UserSpread(userAccounts: list):
    print('Summary matrices of user personas')

    gamePersonas = accessPersonas(userAccounts)

    for game in gamePersonas:
        printMaxtrix(gamePersonas[game])
