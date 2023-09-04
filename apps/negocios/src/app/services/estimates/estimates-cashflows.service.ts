import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EstimatesFinancialHistory } from '../../../app/~global-interfaces/estimates-financial-history.interface';
import { OptionElected } from '../../../app/~global-interfaces/estimates-opening-balances.interface';
import { EstimatesCashFlowYear } from '../../../app/~global-interfaces/estimates-cashflows.interface';

@Injectable({
  providedIn: 'root',
})
export class EstimatesCashFlowService {
  cashFlowStatements: EstimatesCashFlowYear[] = [];
  $updatedCashFlowStatements = new BehaviorSubject(this.cashFlowStatements);

  getUpdatedCashFlowStatements() {
    return this.$updatedCashFlowStatements.asObservable();
  }

  generateCashFlowStatements(
    financialHistory: EstimatesFinancialHistory[],
    openingBalanceOption: OptionElected,
    openingBalances?: EstimatesFinancialHistory
  ) {
    this.cashFlowStatements = [];
    if (openingBalanceOption !== OptionElected.ENTER_BALANCES) {
      financialHistory.unshift(
        this.setOpeningBalancesToZero(financialHistory[0].year)
      );
    } else {
      financialHistory.unshift(openingBalances!);
    }
    for (let year = 1; year < financialHistory.length; year++) {
      this.cashFlowStatements.push({} as EstimatesCashFlowYear);

      this.calcNonMovementItems(financialHistory[year], year - 1);
      this.calcMovementItems(
        financialHistory[year],
        financialHistory[year - 1],
        year - 1
      );
      this.calcSectionTotals(year - 1);
    }
    this.$updatedCashFlowStatements.next(this.cashFlowStatements);
    financialHistory.shift(); // Undo the shift earlier
  }

  private setOpeningBalancesToZero(
    firstYear: number
  ): EstimatesFinancialHistory {
    return {
      year: firstYear - 1,
      revenue: 0,
      costOfSales: 0,
      grossProfit: 0,
      operatingExpenses: 0,
      depreciation: 0,
      operatingProfit: 0,
      otherIncome: 0,
      interestIncome: 0,
      interestExpense: 0,
      profitBeforeTax: 0,
      taxExpense: 0,
      profitAfterTax: 0,
      ncaPPE: 0,
      ncaFinancialAssets: 0,
      ncaDefferedTaxAsset: 0,
      ncaOtherAssets: 0,
      ncaSubTotal: 0,
      caTradeAndOtherReceivables: 0,
      caCashAndCashEquivalents: 0,
      caInventories: 0,
      caFinancialAssets: 0,
      caTaxCredits: 0,
      caOtherAssets: 0,
      caSubTotal: 0,
      assetsTotal: 0,
      eqShareCapital: 0,
      eqRetainedEarningsOpening: 0,
      eqRetainedEarningsProfits: 0,
      eqRetainedEarningsDistributions: 0,
      eqRetainedEarningsClosing: 0,
      eqShareHolderLoans: 0,
      eqSubTotal: 0,
      nclFinancialLiabilties: 0,
      nclDefferedTaxLiabilties: 0,
      nclOtherLiabilties: 0,
      nclSubTotal: 0,
      clTradeAndOtherPayables: 0,
      clFinancialLiabilties: 0,
      clTaxPayables: 0,
      clOtherLiabilties: 0,
      clSubTotal: 0,
      equityAndLiabiltiesTotal: 0,
    };
  }

  private calcNonMovementItems(
    financialHistory: EstimatesFinancialHistory,
    year: number
  ) {
    this.cashFlowStatements[year].year = financialHistory.year;
    this.cashFlowStatements[year].opProfitBeforeTax =
      financialHistory.profitBeforeTax;
    this.cashFlowStatements[year].opDepreciation =
      financialHistory.depreciation;
    this.cashFlowStatements[year].fiDividendsPaid =
      financialHistory.eqRetainedEarningsDistributions;
  }

  private calcMovementItems(
    financialHistoryCurrentYear: EstimatesFinancialHistory,
    financialHistoryPriorYear: EstimatesFinancialHistory,
    year: number
  ) {
    this.cashFlowStatements[year].opWorkingCapitalMovementInventories =
      +financialHistoryPriorYear.caInventories -
      +financialHistoryCurrentYear.caInventories;
    this.cashFlowStatements[year].opWorkingCapitalMovementTradeReceivables =
      +financialHistoryPriorYear.caTradeAndOtherReceivables -
      +financialHistoryCurrentYear.caTradeAndOtherReceivables;
    this.cashFlowStatements[year].opWorkingCapitalMovementTradePayables =
      +financialHistoryCurrentYear.clTradeAndOtherPayables -
      +financialHistoryPriorYear.clTradeAndOtherPayables;
    this.cashFlowStatements[year].opTaxPaid =
      +financialHistoryCurrentYear.taxExpense +
      +financialHistoryCurrentYear.clTaxPayables -
      +financialHistoryPriorYear.clTaxPayables -
      +financialHistoryCurrentYear.caTaxCredits +
      +financialHistoryPriorYear.caTaxCredits;
    this.cashFlowStatements[year].inMovementOfPPE =
      +financialHistoryPriorYear.ncaPPE -
      +financialHistoryCurrentYear.ncaPPE +
      +financialHistoryCurrentYear.depreciation;
    this.cashFlowStatements[year].inMovementOfFinancialAssets =
      +financialHistoryPriorYear.ncaFinancialAssets -
      +financialHistoryCurrentYear.ncaFinancialAssets +
      +financialHistoryPriorYear.caFinancialAssets -
      +financialHistoryCurrentYear.caFinancialAssets;
    this.cashFlowStatements[year].inMovementOfOtherAssets =
      +financialHistoryPriorYear.ncaOtherAssets -
      +financialHistoryCurrentYear.ncaOtherAssets +
      +financialHistoryPriorYear.caOtherAssets -
      +financialHistoryCurrentYear.caOtherAssets;
    this.cashFlowStatements[year].fiMovementOfShareCapital =
      +financialHistoryCurrentYear.eqShareCapital -
      +financialHistoryPriorYear.eqShareCapital;
    this.cashFlowStatements[year].fiMovementOfShareHolderLoans =
      +financialHistoryCurrentYear.eqShareHolderLoans -
      +financialHistoryPriorYear.eqShareHolderLoans;
    this.cashFlowStatements[year].fiMovementOfFinancialLiabilties =
      +financialHistoryCurrentYear.nclFinancialLiabilties -
      +financialHistoryPriorYear.nclFinancialLiabilties +
      +financialHistoryCurrentYear.clFinancialLiabilties -
      +financialHistoryPriorYear.clFinancialLiabilties;
    this.cashFlowStatements[year].fiMovementOfOtherLiabilties =
      +financialHistoryCurrentYear.nclOtherLiabilties -
      +financialHistoryPriorYear.nclOtherLiabilties +
      +financialHistoryCurrentYear.clOtherLiabilties -
      +financialHistoryPriorYear.clOtherLiabilties;
    this.cashFlowStatements[year].cfOpening =
      +financialHistoryPriorYear.caCashAndCashEquivalents;
  }

  private calcSectionTotals(year: number) {
    this.cashFlowStatements[year].opCashFromOperations =
      +this.cashFlowStatements[year].opProfitBeforeTax -
      this.cashFlowStatements[year].opDepreciation +
      +this.cashFlowStatements[year].opWorkingCapitalMovementInventories +
      this.cashFlowStatements[year].opWorkingCapitalMovementTradePayables +
      +this.cashFlowStatements[year].opWorkingCapitalMovementTradeReceivables +
      +this.cashFlowStatements[year].opTaxPaid;

    this.cashFlowStatements[year].inCashFromInvestments =
      +this.cashFlowStatements[year].inMovementOfPPE +
      this.cashFlowStatements[year].inMovementOfFinancialAssets +
      +this.cashFlowStatements[year].inMovementOfOtherAssets;

    this.cashFlowStatements[year].fiCashFromFinancing =
      +this.cashFlowStatements[year].fiMovementOfShareCapital +
      +this.cashFlowStatements[year].fiDividendsPaid +
      +this.cashFlowStatements[year].fiMovementOfShareHolderLoans +
      +this.cashFlowStatements[year].fiMovementOfFinancialLiabilties +
      +this.cashFlowStatements[year].fiMovementOfOtherLiabilties;

    this.cashFlowStatements[year].cfMovement =
      +this.cashFlowStatements[year].opCashFromOperations +
      +this.cashFlowStatements[year].inCashFromInvestments +
      +this.cashFlowStatements[year].fiCashFromFinancing;

    this.cashFlowStatements[year].cfClosing =
      +this.cashFlowStatements[year].cfOpening +
      +this.cashFlowStatements[year].cfMovement;
  }
}
