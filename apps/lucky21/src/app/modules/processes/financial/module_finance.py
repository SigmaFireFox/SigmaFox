from enum import Enum
import random
from modules.processes.draws.module_draws import ColectivePayoutsSchedule
from modules.utilities.module_utilities import CycledDate


class ExpenseType(Enum):
    NONE = 0
    MARKETING = 1
    OTHER = 2


class CostOfSalesType(Enum):
    NONE = 0
    PRIZE_ALLOCATION = 1


class EconomicData:
    current_USD_ZAR_Rate = 18.84
    USD_ZAR_Depreciation = 0.0697  # 6.97%
    expectedDailyReturn = 0
    returnForDay = 0

    def __init__(self) -> None:
        assumedAnnualNominalReturnRate = .11  # 11%
        compoundsPerAnnum = 365  # Daily
        returnRatePerCompoundPeriod = (
            assumedAnnualNominalReturnRate / compoundsPerAnnum) + 1
        effectiveAnnualReturnRate = (
            (returnRatePerCompoundPeriod) ** compoundsPerAnnum) - 1
        self.expectedDailyReturn = ((
            effectiveAnnualReturnRate + 1) ** (1/365))-1

    def updateExchangeRate(self):
        depRateForDay = pow((self.USD_ZAR_Depreciation + 1), (1/365))
        return self.current_USD_ZAR_Rate * depRateForDay

    def determineMarketReturnForDay(self):
        spreadFactor = 0.03

        base = random.random()
        baseCentralised = base - 0.5
        self.returnForDay = (baseCentralised * spreadFactor) + \
            self.expectedDailyReturn


class Expense:
    expenseType: ExpenseType = 0
    amount: float = 0

    def __init__(self, amount: float, expenseType: ExpenseType):
        self.amount = amount
        self.expenseType = expenseType


class FinancialResults:
    # Financial Position Movement Items (Balance sheet movements)
    # Assets - Non-current
    investmentsLT: float = 0
    # Assets - Current
    investmentsST: float = 0
    cash: float = 0

    # Equity
    shareCapital: float = 0
    retainedEarnings: float = 0
    investmentDeficit: float = 0
    investmentSurplus: float = 0

    # Liabilties - Non-current
    liabilitesLT = 0
    # Liabilties - Current
    liabilitesST = 0

    # Financial Position Opening Items (Balance sheet opening balances)
    # Assets - Non-current
    openingInvestmentsLT: float = 0
    # Assets - Current
    openingInvestmentsST: float = 0
    openingCash: float = 0

    # Equity
    openingShareCapital: float = 0
    openingRetainedEarnings: float = 0
    openingInvestmentDeficit: float = 0
    openingInvestmentSurplus: float = 0

    # Liabilties - Non-current
    openingLiabilitiesLT = 0
    # Liabilties - Current
    openingLiabilitiesST = 0

    # Financial Performance Items
    # Income
    reveueTotal: float = 0
    # Cost of Sales
    costOfSalesTotal: float = 0
    # Expenses
    expensesTotal: float = 0
    # Non-core
    liabiltiesInterest: float = 0
    invesmentProfits: float = 0
    invesmentLosses: float = 0

    # Info objects
    expensesList = []
    costOfSalesList = []

    def recordShareCapitalInjection(self, amount):
        self.shareCapital += amount
        self.cash = +amount

    def recordSales(self, amount: float):
        self.reveueTotal += amount
        self.cash += round(amount, 2)
        self.retainedEarnings += round(amount, 2)

    def recordPrizeCapitalAllocation(self, amount: float, costOfSaleType: ExpenseType):
        # Record Expense + Liabilty
        self.costOfSalesTotal += round(amount, 2)
        expense = Expense(amount, costOfSaleType)
        self.costOfSalesList.append(expense)
        self.liabilitesLT += round(amount, 2)
        self.retainedEarnings -= round(amount, 2)

        # Record Investment
        self.cash -= round(amount, 2)
        self.investmentsLT += round(amount, 2)

    def recordOpExpense(self, amount: float, expenseType: ExpenseType):
        self.cash -= round(amount, 2)
        self.expensesTotal += round(amount, 2)
        expense = Expense(amount, expenseType)
        self.expensesList.append(expense)
        self.retainedEarnings -= round(amount, 2)

    def recordInvestmentAndObligationAdjustments(self, ecoData: EconomicData):

        # Calculations
        returnOnInvestments = 0
        increaseOnObligations = 0
        returnOnInvestments = round(
            ecoData.returnForDay * self.openingInvestmentsLT, 2)
        increaseOnObligations = round(
            ecoData.expectedDailyReturn * self.openingLiabilitiesLT, 2)

        # Record PL
        # Investment returns/losses
        if returnOnInvestments > 0:
            # (I/S) Credit
            self.invesmentProfits += round(returnOnInvestments, 2)
        else:
            # (I/S) Debit
            self.invesmentLosses += round(returnOnInvestments, 2)
        # (B/S) Debit if Pos, Credit if Neg
        self.investmentsLT += returnOnInvestments
        # (B/S) Credit if Pos, Debit if Neg
        self.investmentSurplus += returnOnInvestments

        # Interest on obligations
        # (I/S) Debit
        self.liabiltiesInterest -= round(increaseOnObligations, 2)
        # (B/S) Credit
        self.liabilitesLT += round(increaseOnObligations, 2)
        # (B/S) Debit
        self.investmentDeficit -= round(increaseOnObligations, 2)

    def recordPrizeRealisations(
        self,
        collecivePayouts: ColectivePayoutsSchedule,
        dayCount: CycledDate,
    ):
        weekIndex = dayCount.dayOfWeek - 1
        monthIndex = dayCount.day - 1
        amountRealisedForDay = collecivePayouts.dailyPayout + \
            collecivePayouts.weeklyPayouts[weekIndex] + \
            collecivePayouts.monthlyPayouts[monthIndex]

        self.liabilitesLT -= amountRealisedForDay
        self.liabilitesST += amountRealisedForDay


def recordOpeningBalances(closing: FinancialResults, opening: FinancialResults):
    # Assets - Non-current
    opening.openingInvestmentsLT = closing.openingInvestmentsLT + closing.investmentsLT
    # Assets - Current
    opening.openingInvestmentsST = closing.openingInvestmentsST + closing.investmentsST
    opening.openingCash = closing.openingCash + closing.cash

    # Equity
    opening.openingShareCapital = closing.openingShareCapital + closing.shareCapital
    opening.openingRetainedEarnings = closing.openingRetainedEarnings + \
        closing.retainedEarnings
    opening.openingInvestmentDeficit = closing.openingInvestmentDeficit + \
        closing.investmentDeficit
    opening.openingInvestmentSurplus = closing.openingInvestmentSurplus + \
        closing.investmentSurplus

    # Liabilties - Non-current
    opening.openingLiabilitiesLT = closing.openingLiabilitiesLT + closing.liabilitesLT
    # Liabilties - Current
    opening.openingLiabilitiesST = closing.openingLiabilitiesST + closing.liabilitesST
