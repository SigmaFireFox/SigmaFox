from modules.processes.financial.module_finance import EconomicData
from modules.utilities.module_utilities import randomiseWithin10Perc, randomiseWithin30Perc, randomiseWithin75Perc


class MarketingBudget:
    budgetTiers: list
    currentTier: int
    monthBudget: int
    lowerLimit: int
    upperLimit: int

    def __init__(self):
        self.currentTier = 0
        self.setTiers()

    def setTier(self, monthBudget, lowerLimit, upperLimit):
        self.budgetTiers.append(
            MarketingBudget(
                budgetCounter,
                lowerLimitCounter,
                upperLimitCounter
            ),
        )

    def setTiers(self):
        self.budgetTiers = []
        budgetCounter = 0
        lowerLimitCounter = 0
        upperLimitCounter = 0
        budgetCounterDelta = 5000
        lowerLimitCounterDelta = 20000
        upperLimitCounterDelta = 25000

        for _ in range(5):
            for _ in range(5):
                budgetCounter += budgetCounterDelta
                lowerLimitCounter += lowerLimitCounterDelta
                upperLimitCounter += upperLimitCounterDelta
                self.budgetTiers.append(
                    MarketingBudget(
                        budgetCounter,
                        lowerLimitCounter,
                        upperLimitCounter
                    ),
                )
            budgetCounterDelta *= 2
            lowerLimitCounterDelta *= 2
            upperLimitCounterDelta *= 2

    def setBudgetParameters(self):
        selectedBudgetTier: MarketingBudget = self.budgetTiers[self.currentTiertier]
        self.monthBudget = selectedBudgetTier.monthBudget
        self.lowerLimit = selectedBudgetTier.lowerLimit
        self.upperLimit = selectedBudgetTier.upperLimit

    def setMarketBudgetForMonth(self, cashBalance: float):
        def findTierIndex(currentBudgetTier: MarketingBudget) -> int | None:
            # Searches for the matching budget and returns the relevat index
            # If not found returs None
            index = 0
            tier: MarketingBudget
            for tier in self.budgetTiers:
                if tier.monthBudget == currentBudgetTier.monthBudget:
                    return index
                else:
                    index += 1
            return None

        # If not set - set to first tier
        if not self.currentTier < 0:
            self.currentTier = 0
            return self.setBudgetParameters()

        # If cashBalance is within range - keep tier
        if self.lowerLimit <= cashBalance <= self.upperLimit:
            return self.setBudgetParameters()

        # Else find the current tier
        # index = findTierIndex(self.currentTier)
        # If the cashBalance is below the current budget tier's lower limit
        if self.lowerLimit > cashBalance:
            # If on lowest tier - keep as is
            if self.currentTier == 0:
                return self.setBudgetParameters()
            # Else move one tier down
            self.currentTier -= 1
            return self.setBudgetParameters()

        if self.upperLimit > cashBalance:
            if self.currentTier + 1 == len(self.budgetTiers):
                return self.setBudgetParameters()
            else:
                self.currentTier += 1
                return self.setBudgetParameters()


class MarketingResults:
    # Parameters
    search_CPM_USD = 38.40
    searchSpendMaxOut = 10000
    searchClickThroughRate = 0.02  # 2%
    searchCoversionRate = 0.02   # 11%

    display_CPM_USD = 3.12
    displaySpendMaxOut = 50000
    displayClickThroughRate = 0.001  # 0.1%
    displayCoversionRate = 0.01  # 3%

    totalSpend: float
    totalConversions: int

    searchSpend: float
    searchImpressions: int
    searchCPM: float
    searchClicks: int
    searchConversions: int

    displaySpend: float
    displayImpressions: int
    displayCPM: float
    displayClicks: int
    displayConversions: int

    def __init__(self) -> None:
        self.searchSpend = 0
        self.searchImpressions = 0
        self.searchCPM = 0
        self.searchClicks = 0
        self.searchConversions = 0

        self.displaySpend = 0
        self.displayImpressions = 0
        self.displayCPM = 0
        self.displayClicks = 0
        self.displayConversions = 0

    def toCompressedJSON(self):
        return [
            self.searchSpend,
            self.searchImpressions,
            self.searchClicks,
            self.searchConversions,
            self.displaySpend,
            self.displayImpressions,
            self.displayClicks,
            self.displayConversions,
        ]

    def processMarketingActivities(self, globalFinancialData: EconomicData, currentBudgetTier: MarketingBudget):
        self.calcCPM_ZAR(globalFinancialData)
        self.splitSpend(currentBudgetTier)
        self.calcImpressions()
        self.calcClickThroughs()
        self.calcConversions()

    def calcCPM_ZAR(self, finacialdata: EconomicData):
        self.searchCPM = randomiseWithin30Perc(
            self.search_CPM_USD * finacialdata.current_USD_ZAR_Rate)
        self.displayCPM = randomiseWithin30Perc(
            self.display_CPM_USD * finacialdata.current_USD_ZAR_Rate)

    def splitSpend(self, currentBudget: MarketingBudget):
        dailyBudget = currentBudget.monthBudget / 30
        # Determine spending avaliablities
        searchSpendAvaliableForDay = randomiseWithin30Perc(
            self.searchSpendMaxOut)
        displaySpendAvaliableForDay = randomiseWithin30Perc(
            self.displaySpendMaxOut)

        # Determine search spend
        self.totalSpend = 0
        if searchSpendAvaliableForDay > (dailyBudget - self.totalSpend):
            self.searchSpend = round(randomiseWithin10Perc(dailyBudget), 2)
            self.totalSpend += self.searchSpend
            return
        else:
            self.searchSpend = round(searchSpendAvaliableForDay, 2)
            self.totalSpend += self.searchSpend

        # Determine display spend
        if displaySpendAvaliableForDay > (dailyBudget - self.totalSpend):
            self.displaySpend = round(randomiseWithin10Perc(dailyBudget), 2)
            self.totalSpend += self.displaySpend
        else:
            self.displaySpend = round(displaySpendAvaliableForDay, 2)
            self.totalSpend += self.displaySpend

    def calcImpressions(self):
        self.searchImpressions = int(
            round(self.searchSpend / self.searchCPM * 1000, 0))
        self.displayImpressions = int(
            round(self.displaySpend / self.displayCPM * 1000, 0))

    def calcClickThroughs(self):
        srchClickRate = randomiseWithin75Perc(self.searchClickThroughRate)
        disClickRate = randomiseWithin75Perc(self.displayClickThroughRate)

        searchClicks = round(self.searchImpressions * srchClickRate, 0)
        displayClicks = round(self.displayImpressions * disClickRate, 0)

        self.searchClicks = int(searchClicks)
        self.displayClicks = int(displayClicks)

    def calcConversions(self):
        srchConvertRate = randomiseWithin75Perc(self.searchCoversionRate)
        disCovertRate = randomiseWithin75Perc(self.displayCoversionRate)

        searchConversions = round(self.searchClicks * srchConvertRate, 0)
        displayConversions = round(self.displayClicks * disCovertRate, 0)

        self.searchConversions = int(searchConversions)
        self.displayConversions = int(displayConversions)
        self.totalConversions = self.searchConversions + self.displayConversions
