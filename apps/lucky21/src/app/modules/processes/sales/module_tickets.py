from modules.processes.games.module_games import Game, GameName, GamePrize
from modules.utilities.module_utilities import DrawNumbers


class Ticket:
    userNumber: int
    gameName: GameName
    price: float
    numbersSelected: list
    prize: GamePrize | None

    def __init__(self, userNumber: int, game: Game):
        gameName: GameName = game.name

        self.userNumber = userNumber
        self.gameName = gameName
        self.price = game.ticketPrice
        self.numbersSelected = DrawNumbers(
            game.balls, game.selections)
        self.prize = None

    def toCompressedJSON(self):
        return [
            self.userNumber,
            self.gameName.value,
            self.price,
            self.numbersSelected,
        ]

    def allocatePrize(self, prize):
        self.prize = prize
