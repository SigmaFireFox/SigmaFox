export interface EstimatesCashFlowYear {
  year: number;

  opProfitBeforeTax: number;
  opDepreciation: number;
  opWorkingCapitalMovementInventories: number;
  opWorkingCapitalMovementTradeReceivables: number;
  opWorkingCapitalMovementTradePayables: number;
  opTaxPaid: number;
  opCashFromOperations: number;

  inMovementOfPPE: number;
  inMovementOfFinancialAssets: number;
  inMovementOfOtherAssets: number;
  inCashFromInvestments: number;

  fiMovementOfShareCapital: number;
  fiDividendsPaid: number;
  fiMovementOfShareHolderLoans: number;
  fiMovementOfFinancialLiabilties: number;
  fiMovementOfOtherLiabilties: number;
  fiCashFromFinancing: number;

  cfOpening: number;
  cfMovement: number;
  cfClosing: number;
}
