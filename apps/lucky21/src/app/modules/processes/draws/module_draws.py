from modules.processes.games.module_games import Game, GameName, GamePrize, GamesRunning
from modules.processes.sales.module_tickets import Ticket
from modules.utilities.module_utilities import CycledDate, DrawNumbers, Frequency


class WinningTicket:
    userNumber: int
    gameName: GameName
    price: float
    picks: int
    correctPicks: int
    gamePrize: GamePrize

    def __init__(self, ticket: Ticket, correctPicks: int, gamePrize: GamePrize):
        self.userNumber = ticket.userNumber
        self.gameName = ticket.gameName
        self.price = ticket.price
        self.picks = ticket.numbersSelected
        self.correctPicks = correctPicks
        self.gamePrize = gamePrize

    def toCompressedJSON(self):
        return [
            self.userNumber,
            self.gameName.value,
            self.price,
            self.picks,
            self.correctPicks,
            self.gamePrize.toCompressedJSON()
        ]


class GameWinsByTier:
    tiers: dict

    def __init__(self, prizeTiers: list):
        self.tiers = {}
        for tierCount in range(len(prizeTiers)):
            self.tiers[tierCount] = 0

    def toCompressedJSON(self):
        returnObject = []
        for tier in self.tiers:
            returnObject.append(self.tiers[tier])

        return returnObject


class DrawResults:
    winningNumbers: dict
    gameWinsByTier: dict
    winningTickets: list
    totalPrizeAllocation: float

    def __init__(self, gamesRunning: GamesRunning):
        self.gameWinsByTier = {}
        self.winningNumbers = {}
        self.winningTickets = []
        self.totalPrizeAllocation = 0
        for gameName in gamesRunning.listOfGames:
            game: Game = gamesRunning.listOfGames[gameName]
            self.gameWinsByTier[gameName] = GameWinsByTier(game.prizeTiers)

    def toCompressedJSON(self):
        returnObject = []

        # Winning numbers
        winningNumbersSerialised = []
        gameName: GameName
        for gameName in self.winningNumbers:
            winningNumbersSerialised.append(self.winningNumbers[gameName])
        returnObject.append(winningNumbersSerialised)

        # Game wins by tier
        gameWinsByTierSerialised = []
        for gameName in self.gameWinsByTier:
            gameWinsByTier: GameWinsByTier = self.gameWinsByTier[gameName]
            gameWinsByTierSerialised.append(gameWinsByTier.toCompressedJSON(
            ))
        returnObject.append(gameWinsByTierSerialised)

        # Winning tickets
        winningTicketsSerialised = []
        winningTicket: WinningTicket
        for winningTicket in self.winningTickets:
            winningTicketsSerialised.append(winningTicket.toCompressedJSON())
        returnObject.append(winningTicketsSerialised)

        returnObject.append(self.totalPrizeAllocation)

        return returnObject

    def drawWinningNumbers(self, gamesRunning: GamesRunning):
        for gameName in gamesRunning.listOfGames:
            game: Game = gamesRunning.listOfGames[gameName]
            self.winningNumbers[gameName] = DrawNumbers(
                game.balls, game.selections)

    def determineWinningTickets(self, gamesRunning: GamesRunning, ticketsforDay: list):
        ticket: Ticket
        for ticket in ticketsforDay:
            correctPicks = 0
            number: int
            for number in self.winningNumbers[ticket.gameName]:
                if number in ticket.numbersSelected:
                    correctPicks += 1

            if correctPicks:
                game: Game = gamesRunning.listOfGames[ticket.gameName]
                tier = game.selections - correctPicks
                if tier < len(game.prizeTiers):
                    gamePrize: GamePrize = game.prizeTiers[tier]
                    winningTicket = WinningTicket(
                        ticket, correctPicks, gamePrize)
                    self.winningTickets.append(winningTicket)

    def setWinsSummary(self, gamesRunning: GamesRunning):
        winningTicket: WinningTicket
        for winningTicket in self.winningTickets:
            game: Game = gamesRunning.listOfGames[winningTicket.gameName]
            gameWinsByTier: GameWinsByTier = self.gameWinsByTier[winningTicket.gameName]
            tier = game.selections - winningTicket.correctPicks
            if tier < len(game.prizeTiers):
                gameWinsByTier.tiers[tier] += 1
                gamePrize: GamePrize = game.prizeTiers[tier]
                self.totalPrizeAllocation += gamePrize.requiredCapital


class ColectivePayoutsSchedule:
    dailyPayout: float
    weeklyPayouts = []
    monthlyPayouts = []

    def __init__(self):
        self.dailyPayout = 0
        for i in range(7):
            self.weeklyPayouts.append(0)
        for i in range(30):
            self.monthlyPayouts.append(0)

    def recordDaysPrizes(self, dayCount: CycledDate, dResults_Day: DrawResults):
        weekIndex = dayCount.dayOfWeek - 1
        monthIndex = dayCount.day - 1

        winningTicket: WinningTicket
        for winningTicket in dResults_Day.winningTickets:
            if winningTicket.gamePrize.frequency == Frequency.DAILY:
                self.dailyPayout += winningTicket.gamePrize.requiredCapital
            if winningTicket.gamePrize.frequency == Frequency.WEEKLY:
                self.weeklyPayouts[weekIndex] += winningTicket.gamePrize.requiredCapital
            if winningTicket.gamePrize.frequency == Frequency.MONTHLY:
                self.monthlyPayouts[monthIndex] += winningTicket.gamePrize.requiredCapital
