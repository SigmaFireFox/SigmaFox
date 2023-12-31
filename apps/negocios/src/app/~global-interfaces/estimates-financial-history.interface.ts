export interface EstimatesFinancialHistory {
  year: number;
  revenue: number;
  costOfSales: number;
  grossProfit: number;
  operatingExpenses: number;
  depreciation: number;
  operatingProfit: number;
  otherIncome: number;
  interestIncome: number;
  interestExpense: number;
  profitBeforeTax: number;
  taxExpense: number;
  profitAfterTax: number;
  ncaPPE: number;
  ncaFinancialAssets: number;
  ncaDefferedTaxAsset: number;
  ncaOtherAssets: number;
  ncaSubTotal: number;
  caTradeAndOtherReceivables: number;
  caCashAndCashEquivalents: number;
  caInventories: number;
  caFinancialAssets: number;
  caTaxCredits: number;
  caOtherAssets: number;
  caSubTotal: number;
  assetsTotal: number;
  eqShareCapital: number;
  eqRetainedEarningsOpening: number;
  eqRetainedEarningsProfits: number;
  eqRetainedEarningsDistributions: number;
  eqRetainedEarningsClosing: number;
  eqShareHolderLoans: number;
  eqSubTotal: number;
  nclFinancialLiabilties: number;
  nclDefferedTaxLiabilties: number;
  nclOtherLiabilties: number;
  nclSubTotal: number;
  clTradeAndOtherPayables: number;
  clFinancialLiabilties: number;
  clTaxPayables: number;
  clOtherLiabilties: number;
  clSubTotal: number;
  equityAndLiabiltiesTotal: number;
}
