from enum import Enum
from modules.utilities.module_utilities import Frequency


class GameName(Enum):
    QCMonth = 1
    QCWeek = 2
    QCDay = 3
    LFL100 = 4
    LFL1000 = 5
    LFL10000 = 6


class GamePrize:
    perpetuityPaymentAmount: float
    frequency: Frequency
    requiredCapital: float

    def __init__(self, perpetuityPaymentAmount: float, frequency: Frequency, requiredRateOfReturn: float):
        self.perpetuityPaymentAmount = perpetuityPaymentAmount
        self.frequency = frequency
        self.setRequiredCapital(
            perpetuityPaymentAmount,
            frequency,
            requiredRateOfReturn
        )

    def toCompressedJSON(self):
        return [
            self.perpetuityPaymentAmount,
            self.frequency.value,
            self.requiredCapital
        ]

    def setRequiredCapital(self, perpetuityPaymentAmount: float, frequency: Frequency, requiredRateOfReturn: float):
        effectiveRequiredReturnRate = (
            ((requiredRateOfReturn/365) + 1) ** 365)-1
        dailyEffectiveRequiredRate = (
            (1 + effectiveRequiredReturnRate) ** (1/365)) - 1
        if frequency == Frequency.NEVER:
            self.requiredCapital = 0
            return
        periodEffectiveReturnRate = (
            (1 + dailyEffectiveRequiredRate) ** frequency.value) - 1
        self.requiredCapital = round(
            perpetuityPaymentAmount / periodEffectiveReturnRate, 2)


class Game:
    isRunning: bool
    name: GameName
    balls: int
    selections: int
    requiredMinEquity: int
    alwaysOn: bool
    ticketPrice: float
    preferanceWeighing: int
    prizeTiers: list

    def __init__(
            self,
            name: GameName,
            balls: int,
            picks: int,
            requiredMinEquity: float,
            alwaysOn: bool,
            ticketPrice: float,
            preferanceWeighing: int,
            prizeTiers: list

    ):
        self.isRunning = False
        self.name = name
        self.balls = balls
        self.selections = picks
        self.requiredMinEquity = requiredMinEquity
        self.alwaysOn = alwaysOn
        self.ticketPrice = ticketPrice
        self.preferanceWeighing = preferanceWeighing
        self.prizeTiers = prizeTiers
        if len(self.prizeTiers) > self.balls + 1:
            print(f'Game {self.name} has too many prize tiers')

    def setIsRunningStatus(self, avaliableEquity: float):
        if self.alwaysOn:
            self.isRunning = True
        else:
            self.isRunning = avaliableEquity > self.requiredMinEquity


class GamesRunning:
    listOfGames = []
    selectionPool = []

    def __init__(self, startingCapital: int, requiredRateOfReturn: float) -> None:

        self.listOfGames = {
            GameName.QCMonth:  Game(
                name=GameName.QCMonth,
                balls=40, picks=5,
                requiredMinEquity=0,
                alwaysOn=True,
                ticketPrice=2,
                preferanceWeighing=7,
                prizeTiers=[
                    GamePrize(20, Frequency.MONTHLY, requiredRateOfReturn),
                    GamePrize(2, Frequency.MONTHLY, requiredRateOfReturn),
                    GamePrize(0.2, Frequency.MONTHLY, requiredRateOfReturn),
                    GamePrize(0.02, Frequency.MONTHLY, requiredRateOfReturn),
                    GamePrize(0.002, Frequency.MONTHLY, requiredRateOfReturn),
                ]),
            GameName.QCWeek: Game(
                name=GameName.QCWeek,
                balls=40, picks=5,
                requiredMinEquity=25000,
                alwaysOn=False,
                ticketPrice=5,
                preferanceWeighing=5,
                prizeTiers=[
                    GamePrize(20, Frequency.WEEKLY, requiredRateOfReturn),
                    GamePrize(2, Frequency.WEEKLY, requiredRateOfReturn),
                    GamePrize(0.2, Frequency.WEEKLY, requiredRateOfReturn),
                    GamePrize(0.02, Frequency.WEEKLY, requiredRateOfReturn),
                    GamePrize(0.002, Frequency.WEEKLY, requiredRateOfReturn),
                ]),
            GameName.QCDay: Game(
                name=GameName.QCDay,
                balls=40, picks=5,
                requiredMinEquity=50000,
                alwaysOn=False,
                ticketPrice=20,
                preferanceWeighing=3,
                prizeTiers=[
                    GamePrize(20, Frequency.DAILY, requiredRateOfReturn),
                    GamePrize(2, Frequency.DAILY, requiredRateOfReturn),
                    GamePrize(0.2, Frequency.DAILY, requiredRateOfReturn),
                    GamePrize(0.02, Frequency.DAILY, requiredRateOfReturn),
                    GamePrize(0.002, Frequency.DAILY, requiredRateOfReturn),
                ]
            ),
            GameName.LFL100: Game(
                name=GameName.LFL100,
                balls=55, picks=6,
                requiredMinEquity=1000000,
                alwaysOn=False,
                ticketPrice=2.5,
                preferanceWeighing=10,
                prizeTiers=[
                    GamePrize(100, Frequency.DAILY, requiredRateOfReturn),
                    GamePrize(50, Frequency.WEEKLY, requiredRateOfReturn),
                    GamePrize(20, Frequency.MONTHLY, requiredRateOfReturn),
                ]),
            GameName.LFL1000: Game(
                name=GameName.LFL1000,
                balls=65, picks=6,
                requiredMinEquity=5000000,
                alwaysOn=False,
                ticketPrice=5,
                preferanceWeighing=25,
                prizeTiers=[
                    GamePrize(1000, Frequency.DAILY, requiredRateOfReturn),
                    GamePrize(500, Frequency.WEEKLY, requiredRateOfReturn),
                    GamePrize(50, Frequency.MONTHLY, requiredRateOfReturn),
                ]),
            GameName.LFL10000: Game(
                name=GameName.LFL10000,
                balls=75, picks=6,
                requiredMinEquity=5000000,
                alwaysOn=False,
                ticketPrice=10,
                preferanceWeighing=50,
                prizeTiers=[
                    GamePrize(10000, Frequency.DAILY, requiredRateOfReturn),
                    GamePrize(2500, Frequency.WEEKLY, requiredRateOfReturn),
                    GamePrize(200, Frequency.MONTHLY, requiredRateOfReturn),
                ])
        }
        self.setGames(startingCapital)

    def setGames(self, avaliableEquity: float):
        self.selectionPool = []

        for gameName in self.listOfGames:
            game: Game = self.listOfGames[gameName]
            game.setIsRunningStatus(avaliableEquity)
            if game.isRunning:
                for _ in range(game.preferanceWeighing):
                    self.selectionPool.append(gameName)
