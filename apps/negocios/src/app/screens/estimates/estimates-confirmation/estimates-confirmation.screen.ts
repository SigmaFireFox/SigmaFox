import { Component, Input, OnInit } from '@angular/core';
import { EstimatesCashFlowYear } from '../../../~global-interfaces/estimates-cashflows.interface';
import { EstimatesFinancialHistory } from 'app/~global-interfaces/estimates-financial-history.interface';
import { EstimatesCashFlowService } from '../../../services/estimates/estimates-cashflows.service';

export enum LineType {
  HEADER,
  SUBHEADER,
  STATEMENT_LINE_NO_EMPHASIS,
  STATEMENT_LINE_WITH_EMPHASIS,
  SUB_TOTAL,
  SECTION_TOTAL,
  SECTION_TOTAL_WITH_SPACE_BEFORE,
}

export enum DataSource {
  FINANCIAL_HISTORY,
  CASH_FLOW,
}

export interface FinancialStatement {
  dataSource: DataSource;
  title: string;
  lines: FinancialStatementLine[];
}

export interface FinancialStatementLine {
  lineType: LineType;
  title: string;
  fsKey?: string;
  amounts?: number[];
}

@Component({
  selector: 'app-estimates-confirmation-screen',
  templateUrl: './estimates-confirmation.screen.html',
  styleUrls: ['./estimates-confirmation.screen.scss'],
})
export class EstimatesConfirmationScreen implements OnInit {
  @Input() financialHistory = {} as EstimatesFinancialHistory[];

  lineType = LineType;

  fullFinancialHistory: object[] = [];
  financialStatements: FinancialStatement[] = [];

  constructor(private estimateServices: EstimatesCashFlowService) {}

  ngOnInit(): void {
    this.removeOpeningBalancesFromFinancialHistory();
    this.setSubscriptionsRequired();
  }

  private setSubscriptionsRequired() {
    this.estimateServices
      .getUpdatedCashFlowStatements()
      .subscribe((cashFlows: EstimatesCashFlowYear[]) => {
        this.mergeFinancialStatements(cashFlows);
        this.setFinancialStatements();
      });
  }

  private removeOpeningBalancesFromFinancialHistory() {
    this.financialHistory = this.financialHistory.slice(1);
  }

  private mergeFinancialStatements(cashFlows: EstimatesCashFlowYear[]) {
    for (let year = 0; year < cashFlows.length; year++) {
      let financialStatementForYear = {
        ...this.financialHistory[year],
        ...cashFlows[year],
      };
      this.fullFinancialHistory.push(financialStatementForYear);
    }
  }

  private setFinancialStatements() {
    this.setFinancialStatementFramework();
    this.populateFinancialStatements();
  }

  private setFinancialStatementFramework() {
    this.createFinancialStatements();
    this.addLinesToStatements();
  }

  private createFinancialStatements() {
    this.financialStatements = [];
    this.financialStatements.push(
      {
        dataSource: DataSource.FINANCIAL_HISTORY,
        title: 'Income Statement',
        lines: [],
      },
      {
        dataSource: DataSource.FINANCIAL_HISTORY,
        title: 'Balance Sheet',
        lines: [],
      },
      {
        dataSource: DataSource.FINANCIAL_HISTORY,
        title: 'Cash Flow Statement',
        lines: [],
      }
    );
  }

  private addLinesToStatements() {
    this.financialStatements.forEach((statement, index) => {
      switch (statement.title) {
        case 'Income Statement': {
          this.addIncomeStatementLines(index);
          return;
        }
        case 'Balance Sheet': {
          this.addBalanceSheetLines(index);
          return;
        }
        case 'Cash Flow Statement': {
          this.addCashFlowStatementLines(index);
          return;
        }
      }
    });
  }

  private addIncomeStatementLines(index: number) {
    this.financialStatements[index].lines.push(
      {
        lineType: LineType.HEADER,
        title: '',
        fsKey: 'year',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_WITH_EMPHASIS,
        title: 'Revenue',
        fsKey: 'revenue',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Cost of Sales',
        fsKey: 'costOfSales',
        amounts: [],
      },
      {
        lineType: LineType.SUB_TOTAL,
        title: 'Gross Profit',
        fsKey: 'grossProfit',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Operating costs (excluding depreciation)',
        fsKey: 'operatingExpenses',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Depreciation',
        fsKey: 'depreciation',
        amounts: [],
      },
      {
        lineType: LineType.SUB_TOTAL,
        title: 'Operating profit',
        fsKey: 'operatingProfit',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Other income',
        fsKey: 'otherIncome',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Interest income',
        fsKey: 'interestIncome',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Interest expense',
        fsKey: 'interestExpense',
        amounts: [],
      },
      {
        lineType: LineType.SUB_TOTAL,
        title: 'Profit before tax',
        fsKey: 'profitBeforeTax',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Taxation expense',
        fsKey: 'taxExpense',
        amounts: [],
      },
      {
        lineType: LineType.SECTION_TOTAL,
        title: 'Profit after tax',
        fsKey: 'profitAfterTax',
        amounts: [],
      }
    );
  }

  private addBalanceSheetLines(index: number) {
    this.financialStatements[index].lines.push(
      {
        lineType: LineType.HEADER,
        title: '',
        fsKey: 'year',
        amounts: [],
      },
      {
        lineType: LineType.SUBHEADER,
        title: 'Non-current assets',
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Property, Plant and Equipment',
        fsKey: 'ncaPPE',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Non-current Financial Assets',
        fsKey: 'ncaFinancialAssets',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Non-current Deffered Tax Assets',
        fsKey: 'ncaDefferedTaxAsset',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Other Non-current Assets',
        fsKey: 'ncaOtherAssets',
        amounts: [],
      },
      {
        lineType: LineType.SUB_TOTAL,
        title: 'Total Non-current Assets',
        fsKey: 'ncaSubTotal',
        amounts: [],
      },
      {
        lineType: LineType.SUBHEADER,
        title: 'Current assets',
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Trade and Other Receivables',
        fsKey: 'caTradeAndOtherReceivables',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Cash and Cash Equivalents',
        fsKey: 'caCashAndCashEquivalents',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Inventories',
        fsKey: 'caInventories',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Current Financial Assets',
        fsKey: 'caFinancialAssets',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Tax Credits',
        fsKey: 'caTaxCredits',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Other Current Assets',
        fsKey: 'caOtherAssets',
        amounts: [],
      },
      {
        lineType: LineType.SUB_TOTAL,
        title: 'Total Current Assets',
        fsKey: 'caSubTotal',
        amounts: [],
      },
      {
        lineType: LineType.SECTION_TOTAL_WITH_SPACE_BEFORE,
        title: 'TOTAL ASSETS',
        fsKey: 'assetsTotal',
        amounts: [],
      },
      {
        lineType: LineType.SUBHEADER,
        title: 'Equity',
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Share Capital',
        fsKey: 'eqShareCapital',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Retained Earnings',
        fsKey: 'eqRetainedEarningsClosing',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Shareholder Loans',
        fsKey: 'eqShareHolderLoans',
        amounts: [],
      },
      {
        lineType: LineType.SUB_TOTAL,
        title: 'Total Equity',
        fsKey: 'eqSubTotal',
        amounts: [],
      },
      {
        lineType: LineType.SUBHEADER,
        title: 'Non-Current Liabilties',
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Non-current Financial Liabilities',
        fsKey: 'nclFinancialLiabilties',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Non-current Deffered Tax Liabilities',
        fsKey: 'nclDefferedTaxLiabilties',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Other Non-current Liabilities',
        fsKey: 'nclOtherLiabilties',
        amounts: [],
      },
      {
        lineType: LineType.SUB_TOTAL,
        title: 'Total Non-current Liabilites',
        fsKey: 'nclSubTotal',
        amounts: [],
      },
      {
        lineType: LineType.SUBHEADER,
        title: 'Current Liabilties',
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Trade and Other Payables',
        fsKey: 'clTradeAndOtherPayables',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Current Financial Liabilites',
        fsKey: 'clFinancialLiabilties',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Current Tax Payable',
        fsKey: 'clTaxPayables',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Other Current Liabilites',
        fsKey: 'clOtherLiabilties',
        amounts: [],
      },
      {
        lineType: LineType.SUB_TOTAL,
        title: 'Total Current Liabilites',
        fsKey: 'clSubTotal',
        amounts: [],
      },
      {
        lineType: LineType.SECTION_TOTAL_WITH_SPACE_BEFORE,
        title: 'TOTAL EQUITY AND LIABILTIES',
        fsKey: 'equityAndLiabiltiesTotal',
        amounts: [],
      }
    );
  }

  private addCashFlowStatementLines(index: number) {
    this.financialStatements[index].lines.push(
      {
        lineType: LineType.HEADER,
        title: '',
        fsKey: 'year',
        amounts: [],
      },
      {
        lineType: LineType.SUBHEADER,
        title: 'Operating Cash Flows',
      },
      {
        lineType: LineType.STATEMENT_LINE_WITH_EMPHASIS,
        title: 'Profit Before Tax',
        fsKey: 'opProfitBeforeTax',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Add back depreciation',
        fsKey: 'opDepreciation',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Tax paid',
        fsKey: 'opTaxPaid',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_WITH_EMPHASIS,
        title: 'Working Capital Movements',
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Movement of Inventories',
        fsKey: 'opWorkingCapitalMovementInventories',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Movement of Trade Receivables',
        fsKey: 'opWorkingCapitalMovementTradeReceivables',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Movement of Trade Payables',
        fsKey: 'opWorkingCapitalMovementTradePayables',
        amounts: [],
      },
      {
        lineType: LineType.SUB_TOTAL,
        title: 'Cash from Operationing Activities',
        fsKey: 'opCashFromOperations',
        amounts: [],
      },
      {
        lineType: LineType.SUBHEADER,
        title: 'Investment Cash Flows',
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Movement of Property, Plant and Equipment',
        fsKey: 'inMovementOfPPE',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Movement of Financial Assets',
        fsKey: 'inMovementOfFinancialAssets',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Movement of Other Assets',
        fsKey: 'inMovementOfOtherAssets',
        amounts: [],
      },
      {
        lineType: LineType.SUB_TOTAL,
        title: 'Cash from Investment Activities',
        fsKey: 'inCashFromInvestments',
        amounts: [],
      },
      {
        lineType: LineType.SUBHEADER,
        title: 'Financing Cash Flows',
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Movement of Share Capital',
        fsKey: 'fiMovementOfShareCapital',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Movement of Shareholder Loans',
        fsKey: 'fiMovementOfShareHolderLoans',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Dividends paid',
        fsKey: 'fiDividendsPaid',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Movement of Financial Liabilties',
        fsKey: 'fiMovementOfFinancialLiabilties',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Movement of Other Liabilties',
        fsKey: 'fiMovementOfOtherLiabilties',
        amounts: [],
      },
      {
        lineType: LineType.SUB_TOTAL,
        title: 'Cash from Financing Activities',
        fsKey: 'fiCashFromFinancing',
        amounts: [],
      },
      {
        lineType: LineType.SUBHEADER,
        title: 'Summary of Cash Flows',
      },
      {
        lineType: LineType.STATEMENT_LINE_WITH_EMPHASIS,
        title: 'Opening Cash Balance',
        fsKey: 'cfOpening',
        amounts: [],
      },
      {
        lineType: LineType.STATEMENT_LINE_NO_EMPHASIS,
        title: 'Cash Movements',
        fsKey: 'cfMovement',
        amounts: [],
      },
      {
        lineType: LineType.SUB_TOTAL,
        title: 'Closing Cash Balance',
        fsKey: 'cfClosing',
        amounts: [],
      }
    );
  }

  private populateFinancialStatements() {
    for (let year = 0; year < this.financialHistory.length; year++) {
      this.financialStatements.forEach((statment, statementIndex) => {
        statment.lines.forEach((line, lineIndex) => {
          if (line.fsKey !== undefined) {
            this.financialStatements[statementIndex].lines[
              lineIndex
            ].amounts?.push(
              this.fullFinancialHistory[year][line.fsKey as keyof {}]
            );
          }
        });
      });
    }
  }
}
