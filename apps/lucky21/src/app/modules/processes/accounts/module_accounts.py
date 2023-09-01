from enum import Enum
import random
from modules.processes.games.module_games import GameName, GamesRunning
from modules.utilities.module_utilities import Frequency


class Budget(Enum):
    TIER001 = 1
    TIER002 = 2
    TIER005 = 5
    TIER010 = 10
    TIER015 = 15
    TIER020 = 20
    TIER025 = 25
    TIER050 = 50
    TIER100 = 100
    TIER200 = 200


class UserPersona:
    participationFrequency: Frequency
    gamePreferance: GameName
    gamePreferancePrice: float
    budget: Budget

    def __init__(self, gamesRunning: GamesRunning):
        self.participationFrequency = self.setPlayFrequency()
        self.gamePreferance, self.gamePreferancePrice = self.setGamePreferances(
            gamesRunning)
        self.budget = self. setBuget()

    def toCompressedJSON(self):
        return [
            self.participationFrequency.value,
            self.gamePreferancePrice,
            self.budget.value
        ]

    def setPlayFrequency(self):
        factorDaily = 10
        factorSemiWeekly = 5
        factorWeekly = 35
        factorBiWeekly = 7
        factorMonthly = 15
        factorOccationally = 15

        pool = []
        for i in range(factorDaily):
            pool.append(Frequency.DAILY)
        for i in range(factorSemiWeekly):
            pool.append(Frequency.SEMIWEEKLY)
        for i in range(factorWeekly):
            pool.append(Frequency.WEEKLY)
        for i in range(factorBiWeekly):
            pool.append(Frequency.BIWEEKLY)
        for i in range(factorMonthly):
            pool.append(Frequency.MONTHLY)
        for i in range(factorOccationally):
            pool.append(Frequency.OCCATIONALLY)

        selection = random.randint(0, len(pool) - 1)

        return pool[selection]

    def setGamePreferances(self, gamesRunning: GamesRunning):
        selection = random.randint(0, len(gamesRunning.selectionPool) - 1)
        gameName = gamesRunning.selectionPool[selection]
        gamePrice = gamesRunning.listOfGames[gameName].ticketPrice
        return gameName, gamePrice

    def setBuget(self):
        factorTIER01 = 6
        factorTIER02 = 3
        factorTIER03 = 16
        factorTIER04 = 50
        factorTIER05 = 4
        factorTIER06 = 40
        factorTIER07 = 14
        factorTIER08 = 10
        factorTIER09 = 2
        factorTIER10 = 1

        pool = []
        for i in range(factorTIER01):
            pool.append(Budget.TIER001)
        for i in range(factorTIER02):
            pool.append(Budget.TIER002)
        for i in range(factorTIER03):
            pool.append(Budget.TIER005)
        for i in range(factorTIER04):
            pool.append(Budget.TIER010)
        for i in range(factorTIER05):
            pool.append(Budget.TIER015)
        for i in range(factorTIER06):
            pool.append(Budget.TIER020)
        for i in range(factorTIER07):
            pool.append(Budget.TIER025)
        for i in range(factorTIER08):
            pool.append(Budget.TIER050)
        for i in range(factorTIER09):
            pool.append(Budget.TIER100)
        for i in range(factorTIER10):
            pool.append(Budget.TIER200)

        selection = random.randint(0, len(pool) - 1)

        return pool[selection]


class UserAccount:
    openedDay: int
    accountNumber: int
    userPersona: UserPersona

    def __init__(self, dayCount: int,  accountCount: int, gamesRunning: GamesRunning):
        self.openedDay = dayCount
        self.accountNumber = accountCount
        self.userPersona = UserPersona(gamesRunning)

    def toCompressedJSON(self):
        returnData = [self.accountNumber, self.openedDay]
        userPersonData = self.userPersona.toCompressedJSON()
        for data in userPersonData:
            returnData.append(data)
        return returnData


def generateNewUserAccountsForDay(dayCount: int, numberOfAccounts: int, currentNumberOfAccounts: int, gamesRunning: GamesRunning):
    accountsForDay = []
    accountsCount = currentNumberOfAccounts
    for i in range(numberOfAccounts):
        newAccount = UserAccount(dayCount, accountsCount + 1, gamesRunning)
        accountsForDay.append(newAccount)
        accountsCount += 1

    return accountsForDay
