import random
from modules.processes.accounts.module_accounts import Budget, UserAccount
from modules.processes.games.module_games import GamesRunning

from modules.processes.sales.module_tickets import Ticket


class GameSalesResults:
    userCount: int
    playerCount: int
    ticketsSold: list
    ticketCount: int
    revenue: float

    def __init__(self):
        self.userCount = 0
        self.playerCount = 0
        self.ticketsSold = []
        self.ticketCount = 0
        self.revenue = 0

    def toCompressedJSON(self):
        # Serialise tickets sold
        ticketsSoldSerialised = []
        ticket: Ticket
        for ticket in self.ticketsSold:
            ticketsSoldSerialised.append(ticket.toCompressedJSON())

        # Contruct JSON
        return [
            self.userCount,
            self.playerCount,
            ticketsSoldSerialised,
            self.ticketCount,
            self.revenue
        ]


class SalesResults:
    games: dict

    def __init__(self, gamesRunning: GamesRunning):
        self.games = {}
        for gameName in gamesRunning.listOfGames:
            self.games[gameName] = GameSalesResults()

    def toCompressedJSON(self):
        returnObject = {}
        for gameName in self.games:
            gameSalesResults: GameSalesResults = self.games[gameName]
            returnObject[gameName.value] = gameSalesResults.toCompressedJSON()

        return returnObject

    def getTotalRevenue(self):
        sales = 0
        for gameName in self.games:
            gameResult: GameSalesResults = self.games[gameName]
            sales += gameResult.revenue

        return sales

    def getAllTickets(self):
        tickets = []
        for gameName in self.games:
            gameResult: GameSalesResults = self.games[gameName]
            tickets += gameResult.ticketsSold

        return tickets

    def recordUserSales(self, user: UserAccount, userTickets: list | None):
        gameResult: GameSalesResults = self.games[user.userPersona.gamePreferance]
        gameResult.userCount += 1
        if userTickets:
            gameResult.playerCount += 1
            for ticket in userTickets:
                gameResult.ticketsSold.append(ticket)
            gameResult.ticketCount += len(userTickets)
            gameResult.revenue += len(userTickets) * \
                user.userPersona.gamePreferancePrice


def determineSalesForUser(user: UserAccount, gamesRunning: GamesRunning) -> list | None:
    budgetLevels = [
        Budget.TIER001,
        Budget.TIER002,
        Budget.TIER005,
        Budget.TIER010,
        Budget.TIER015,
        Budget.TIER020,
        Budget.TIER025,
        Budget.TIER050,
        Budget.TIER100,
        Budget.TIER200,
    ]

    # Determine if the user is playing today
    probabiltyOfPlay = random.random()
    thresholdToPlay = 1 - \
        (1 / (user.userPersona.participationFrequency.value + 0.1))
    isPlaying = probabiltyOfPlay > thresholdToPlay

    if not isPlaying:
        return None

    # If playing - determine how much they plan to spend
    selectionMade = False
    budgetLevelIndex = budgetLevels.index(user.userPersona.budget)
    while not selectionMade:
        chanceOfPlaying = random.random()
        if chanceOfPlaying > 0.95:
            if budgetLevelIndex == len(budgetLevels) - 1:
                selectionMade = True
            else:
                budgetLevelIndex += 1
        elif chanceOfPlaying < 0.20:
            if budgetLevelIndex == 0:
                selectionMade = True
            else:
                budgetLevelIndex -= 1
        else:
            selectionMade = True
    amountToSpend = budgetLevels[budgetLevelIndex].value

    # Determine number of tickets purchased based on users prefered stake
    numberOfTicketsPurchased = int(round(
        amountToSpend / user.userPersona.gamePreferancePrice, 0))

    ticketsOfUserForDay = []
    for _ in range(numberOfTicketsPurchased):
        ticketsOfUserForDay.append(
            Ticket(user.accountNumber,
                   gamesRunning.listOfGames[user.userPersona.gamePreferance])
        )

    if not ticketsOfUserForDay:
        return None
    else:
        return ticketsOfUserForDay
