import random
from enum import Enum


class Frequency(Enum):
    NEVER = 0
    DAILY = 1
    SEMIWEEKLY = 3
    WEEKLY = 7
    BIWEEKLY = 14
    MONTHLY = 30
    OCCATIONALLY = 90


class CycledDate:
    year: int
    month: int
    day: int
    dayOfWeek: int
    totalDayCount: int

    def __init__(self):
        self.year = 1
        self.month = 1
        self.day = 0
        self.dayOfWeek = 0
        self.totalDayCount = 0

    def nextDay(self):
        self.totalDayCount += 1
        if self.dayOfWeek == 7:
            self.dayOfWeek = 1
        else:
            self.dayOfWeek += 1

        if self.day == 30:
            self.day = 1
            if self.month == 12:
                self.month = 1
                self.year += 1
            else:
                self.month += 1

        else:
            self.day += 1


def DrawNumbers(numbersPool, numbersToSelect):
    selectedNumbers = []
    while len(selectedNumbers) < numbersToSelect:
        number = random.randint(1, numbersPool)
        if number not in selectedNumbers:
            selectedNumbers.append(number)

    selectedNumbers.sort()

    return selectedNumbers


def randomiseWithin10Perc(start):
    factor = 10
    randomFactor = random.uniform((1 - (factor/100)), 1 / (1 - (factor/100)))
    return start * randomFactor


def randomiseWithin20Perc(start):
    factor = 20
    randomFactor = random.uniform((1 - (factor/100)), 1 / (1 - (factor/100)))
    return start * randomFactor


def randomiseWithin30Perc(start):
    factor = 30
    randomFactor = random.uniform((1 - (factor/100)), 1 / (1 - (factor/100)))
    return start * randomFactor


def randomiseWithin50Perc(start):
    factor = 50
    randomFactor = random.uniform((1 - (factor/100)), 1 / (1 - (factor/100)))
    return start * randomFactor


def randomiseWithin75Perc(start):
    factor = 75
    randomFactor = random.uniform((1 - (factor/100)), 1 / (1 - (factor/100)))
    return start * randomFactor
