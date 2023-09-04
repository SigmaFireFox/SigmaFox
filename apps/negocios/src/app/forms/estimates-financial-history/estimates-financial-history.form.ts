import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { EstimatesFinancialHistory } from 'app/~global-interfaces/estimates-financial-history.interface';
import { SectionType } from '../form.enums';

export interface FinancialStatementSection {
  sectionType: SectionType;
  title?: string;
  listOfControls?: FinancialStatementSectionsControl[];
}
export interface FinancialStatementSectionsControl {
  lineType: LineType;
  title: string;
  inputArray: FormArray;
}

export enum LineType {
  HEADER,
  SUBHEADER,
  STANDARD_LINE_NO_EMPHASIS,
  STANDARD_LINE_WITH_EMPHASIS,
  SUB_TOTAL,
  SECTION_TOTAL,
  SECTION_TOTAL_WITH_SPACE_BEFORE,
}

@Component({
  selector: 'app-estimates-financial-history-form',
  templateUrl: './estimates-financial-history.form.html',
  styleUrls: ['./estimates-financial-history.form.scss'],
})
export class EstimatesFinancialHistoryForm implements OnInit {
  @Input() numberOfYearsRequired: number = 0;
  @Input() lastFinancialYear: number = new Date().getFullYear();
  @Input() updatedDataRequested: Observable<boolean> | undefined;

  @Output() formData = new EventEmitter<EstimatesFinancialHistory[]>();

  constructor(private formBuilder: FormBuilder) {}

  private dataRequestSubscription: Subscription | undefined;

  lineType = LineType;
  financialHistory: FinancialStatementSection[] = [];
  listOfYears: number[] = [];

  // Form Objects as required
  financialHistoryArrays = this.formBuilder.group({
    revenue: this.formBuilder.array([]),
    costOfSales: this.formBuilder.array([]),
    grossProfit: this.formBuilder.array([]),
    operatingExpenses: this.formBuilder.array([]),
    depreciation: this.formBuilder.array([]),
    operatingProfit: this.formBuilder.array([]),
    otherIncome: this.formBuilder.array([]),
    interestIncome: this.formBuilder.array([]),
    interestExpense: this.formBuilder.array([]),
    profitBeforeTax: this.formBuilder.array([]),
    taxExpense: this.formBuilder.array([]),
    profitAfterTax: this.formBuilder.array([]),
    ncaPPE: this.formBuilder.array([]),
    ncaFinancialAssets: this.formBuilder.array([]),
    ncaDefferedTaxAsset: this.formBuilder.array([]),
    ncaOtherAssets: this.formBuilder.array([]),
    ncaSubTotal: this.formBuilder.array([]),
    caTradeAndOtherReceivables: this.formBuilder.array([]),
    caCashAndCashEquivalents: this.formBuilder.array([]),
    caInventories: this.formBuilder.array([]),
    caFinancialAssets: this.formBuilder.array([]),
    caTaxCredits: this.formBuilder.array([]),
    caOtherAssets: this.formBuilder.array([]),
    caSubTotal: this.formBuilder.array([]),
    assetsTotal: this.formBuilder.array([]),
    eqShareCapital: this.formBuilder.array([]),
    eqRetainedEarningsOpening: this.formBuilder.array([]),
    eqRetainedEarningsProfits: this.formBuilder.array([]),
    eqRetainedEarningsDistributions: this.formBuilder.array([]),
    eqRetainedEarningsClosing: this.formBuilder.array([]),
    eqShareHolderLoans: this.formBuilder.array([]),
    eqSubTotal: this.formBuilder.array([]),
    nclFinancialLiabilties: this.formBuilder.array([]),
    nclDefferedTaxLiabilties: this.formBuilder.array([]),
    nclOtherLiabilties: this.formBuilder.array([]),
    nclSubTotal: this.formBuilder.array([]),
    clTradeAndOtherPayables: this.formBuilder.array([]),
    clFinancialLiabilties: this.formBuilder.array([]),
    clTaxPayables: this.formBuilder.array([]),
    clOtherLiabilties: this.formBuilder.array([]),
    clSubTotal: this.formBuilder.array([]),
    equityAndLiabiltiesTotal: this.formBuilder.array([]),
  }) as FormGroup;

  ngOnInit() {
    this.setSubscriptionsRequired();
    this.setUpForms();
  }

  // Template facing functions
  onUpdateFormValue(array: FormArray, index: number, value: number) {
    array.value[index] = value;
    this.setNegativeInputsToNegative();
    this.calcFormTotals();
  }

  // Functions required to handle return of data to screen
  private setSubscriptionsRequired() {
    this.dataRequestSubscription = this.updatedDataRequested!.subscribe(
      (requestScreenData) => {
        requestScreenData ? this.submitUpdate() : null;
      }
    );
  }

  private submitUpdate() {
    let dataToBeRetuned: EstimatesFinancialHistory[] = [];

    for (let year = 0; year < this.numberOfYearsRequired; year++) {
      dataToBeRetuned.push({} as EstimatesFinancialHistory);
      dataToBeRetuned[year].year = this.listOfYears[year];
      Object.keys(this.financialHistoryArrays.controls).forEach((arrayName) => {
        let value: number[] = this.financialHistoryArrays.get(arrayName)?.value;
        dataToBeRetuned[year][arrayName as keyof EstimatesFinancialHistory] =
          value[year];
      });
    }
    this.formData.emit(dataToBeRetuned);
  }

  // Fuctions to Update Form on change of input value
  private setNegativeInputsToNegative() {
    [
      'costOfSales',
      'operatingExpenses',
      'depreciation',
      'interestExpense',
      'taxExpense',
      'eqRetainedEarningsDistributions',
    ].forEach((arrayName) => {
      let currentValues: number[] =
        this.financialHistoryArrays.get(arrayName)?.value;
      currentValues.forEach((value, index, array) => {
        value = -Math.abs(value);
        array[index] = value;
      });
      this.financialHistoryArrays.get(arrayName)?.setValue(currentValues);
    });
  }

  private calcFormTotals() {
    this.calcTotal('grossProfit', ['revenue', 'costOfSales']);
    this.calcTotal('operatingProfit', [
      'grossProfit',
      'operatingExpenses',
      'depreciation',
    ]);
    this.calcTotal('profitBeforeTax', [
      'operatingProfit',
      'otherIncome',
      'interestIncome',
      'interestExpense',
    ]);
    this.calcTotal('profitAfterTax', ['profitBeforeTax', 'taxExpense']);
    this.calcTotal('ncaSubTotal', [
      'ncaPPE',
      'ncaFinancialAssets',
      'ncaDefferedTaxAsset',
      'ncaOtherAssets',
    ]);
    this.calcTotal('caSubTotal', [
      'caTradeAndOtherReceivables',
      'caCashAndCashEquivalents',
      'caInventories',
      'caFinancialAssets',
      'caTaxCredits',
      'caOtherAssets',
    ]);
    this.calcTotal('assetsTotal', ['ncaSubTotal', 'caSubTotal']);
    this.calcTotal('eqRetainedEarningsProfits', ['profitAfterTax']);
    this.calcTotal('eqRetainedEarningsClosing', [
      'eqRetainedEarningsOpening',
      'eqRetainedEarningsProfits',
      'eqRetainedEarningsDistributions',
    ]);
    this.calcTotal('eqSubTotal', [
      'eqShareCapital',
      'eqRetainedEarningsClosing',
      'eqShareHolderLoans',
    ]);
    this.calcTotal('nclSubTotal', [
      'nclFinancialLiabilties',
      'nclDefferedTaxLiabilties',
      'nclOtherLiabilties',
    ]);
    this.calcTotal('clSubTotal', [
      'clTradeAndOtherPayables',
      'clFinancialLiabilties',
      'clTaxPayables',
      'clOtherLiabilties',
    ]);
    this.calcTotal('equityAndLiabiltiesTotal', [
      'eqSubTotal',
      'nclSubTotal',
      'clSubTotal',
    ]);
  }

  private calcTotal(sumArray: string, addends: string[]) {
    let grossProfitValues: number[] = [];
    for (let year = 0; year < this.numberOfYearsRequired; year++) {
      let sum = 0;
      addends.forEach((addend) => {
        sum = sum + +this.financialHistoryArrays.get(addend)?.value[year];
      });
      grossProfitValues.push(sum);
    }
    this.financialHistoryArrays.get(sumArray)?.setValue(grossProfitValues);
  }

  // Functions required to initialise form
  private setUpForms() {
    this.setListOfYears();
    this.setFinancialHistoryArrays();
    this.setIncomeStatementForm();
    this.setBalanceSheetForm();
  }

  private setListOfYears() {
    for (let i = this.numberOfYearsRequired; i > 0; i--) {
      this.listOfYears.push(this.lastFinancialYear - i + 1);
    }
  }

  private setFinancialHistoryArrays() {
    for (let i = 0; i < this.numberOfYearsRequired; i++) {
      Object.keys(this.financialHistoryArrays.controls).forEach((key) => {
        (this.financialHistoryArrays.controls[key] as FormArray).push(
          new FormControl(0)
        );
      });
    }
  }

  private setBalanceSheetForm() {
    this.financialHistory.push({
      sectionType: SectionType.HEADER,
      title: 'Balance Sheet',
      listOfControls: [
        {
          lineType: LineType.HEADER,
          title: '',
          inputArray: [] as unknown as FormArray,
        },
        {
          lineType: LineType.SUBHEADER,
          title: 'Non-current assets',
          inputArray: [] as unknown as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Property, Plant and Equipment',
          inputArray: this.financialHistoryArrays.get('ncaPPE') as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Non-current Financial Assets',
          inputArray: this.financialHistoryArrays.get(
            'ncaFinancialAssets'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Non-current Deffered Tax Assets',
          inputArray: this.financialHistoryArrays.get(
            'ncaDefferedTaxAsset'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Other Non-current Assets',
          inputArray: this.financialHistoryArrays.get(
            'ncaOtherAssets'
          ) as FormArray,
        },
        {
          lineType: LineType.SUB_TOTAL,
          title: 'Total Non-current Assets',
          inputArray: this.financialHistoryArrays.get(
            'ncaSubTotal'
          ) as FormArray,
        },
        {
          lineType: LineType.SUBHEADER,
          title: 'Current assets',
          inputArray: [] as unknown as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Trade and Other Receivables',
          inputArray: this.financialHistoryArrays.get(
            'caTradeAndOtherReceivables'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Cash and Cash Equivalents',
          inputArray: this.financialHistoryArrays.get(
            'caCashAndCashEquivalents'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Inventories',
          inputArray: this.financialHistoryArrays.get(
            'caInventories'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Current Financial Assets',
          inputArray: this.financialHistoryArrays.get(
            'caFinancialAssets'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Tax Credits',
          inputArray: this.financialHistoryArrays.get(
            'caTaxCredits'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Other Current Assets',
          inputArray: this.financialHistoryArrays.get(
            'caOtherAssets'
          ) as FormArray,
        },
        {
          lineType: LineType.SUB_TOTAL,
          title: 'Total Current Assets',
          inputArray: this.financialHistoryArrays.get(
            'caOtherAssets'
          ) as FormArray,
        },
        {
          lineType: LineType.SECTION_TOTAL_WITH_SPACE_BEFORE,
          title: 'TOTAL ASSETS',
          inputArray: this.financialHistoryArrays.get(
            'assetsTotal'
          ) as FormArray,
        },
        {
          lineType: LineType.SUBHEADER,
          title: 'Equity',
          inputArray: [] as unknown as FormArray,
        },

        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Retained Earnings - Opening',
          inputArray: this.financialHistoryArrays.get(
            'eqRetainedEarningsOpening'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Profit for Period',
          inputArray: this.financialHistoryArrays.get(
            'eqRetainedEarningsProfits'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Dividends Paid',
          inputArray: this.financialHistoryArrays.get(
            'eqRetainedEarningsDistributions'
          ) as FormArray,
        },
        {
          lineType: LineType.SUB_TOTAL,
          title: 'Retained Earnings  - Opening',
          inputArray: this.financialHistoryArrays.get(
            'eqRetainedEarningsClosing'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Share Capital',
          inputArray: this.financialHistoryArrays.get(
            'eqShareCapital'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Shareholder Loans',
          inputArray: this.financialHistoryArrays.get(
            'eqShareHolderLoans'
          ) as FormArray,
        },
        {
          lineType: LineType.SUB_TOTAL,
          title: 'Total Equity',
          inputArray: this.financialHistoryArrays.get(
            'eqSubTotal'
          ) as FormArray,
        },
        {
          lineType: LineType.SUBHEADER,
          title: 'Non-Current Liabilties',
          inputArray: [] as unknown as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Non-current Financial Liabilities',
          inputArray: this.financialHistoryArrays.get(
            'nclFinancialLiabilties'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Non-current Deffered Tax Liabilities',
          inputArray: this.financialHistoryArrays.get(
            'nclDefferedTaxLiabilties'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Other Non-current Liabilities',
          inputArray: this.financialHistoryArrays.get(
            'nclOtherLiabilties'
          ) as FormArray,
        },
        {
          lineType: LineType.SUB_TOTAL,
          title: 'Total Non-current Liabilites',
          inputArray: this.financialHistoryArrays.get(
            'nclSubTotal'
          ) as FormArray,
        },
        {
          lineType: LineType.SUBHEADER,
          title: 'Current Liabilties',
          inputArray: [] as unknown as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Trade and Other Payables',
          inputArray: this.financialHistoryArrays.get(
            'clTradeAndOtherPayables'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Current Financial Liabilites',
          inputArray: this.financialHistoryArrays.get(
            'clFinancialLiabilties'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Current Tax Payable',
          inputArray: this.financialHistoryArrays.get(
            'clTaxPayables'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Other Current Liabilites',
          inputArray: this.financialHistoryArrays.get(
            'clOtherLiabilties'
          ) as FormArray,
        },
        {
          lineType: LineType.SUB_TOTAL,
          title: 'Total Current Liabilites',
          inputArray: this.financialHistoryArrays.get(
            'clSubTotal'
          ) as FormArray,
        },
        {
          lineType: LineType.SECTION_TOTAL_WITH_SPACE_BEFORE,
          title: 'TOTAL EQUITY AND LIABILTIES',
          inputArray: this.financialHistoryArrays.get(
            'equityAndLiabiltiesTotal'
          ) as FormArray,
        },
      ],
    });
  }

  private setIncomeStatementForm() {
    this.financialHistory.push({
      sectionType: SectionType.HEADER,
      title: 'Income Statement',
      listOfControls: [
        {
          lineType: LineType.HEADER,
          title: '',
          inputArray: [] as unknown as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_WITH_EMPHASIS,
          title: 'Revenue',
          inputArray: this.financialHistoryArrays.get('revenue') as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Cost of Sales',
          inputArray: this.financialHistoryArrays.get(
            'costOfSales'
          ) as FormArray,
        },
        {
          lineType: LineType.SUB_TOTAL,
          title: 'Gross Profit',
          inputArray: this.financialHistoryArrays.get(
            'grossProfit'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Operating costs (excluding depreciation)',
          inputArray: this.financialHistoryArrays.get(
            'operatingExpenses'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Depreciation',
          inputArray: this.financialHistoryArrays.get(
            'depreciation'
          ) as FormArray,
        },
        {
          lineType: LineType.SUB_TOTAL,
          title: 'Operating profit',
          inputArray: this.financialHistoryArrays.get(
            'operatingProfit'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Other income',
          inputArray: this.financialHistoryArrays.get(
            'otherIncome'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Interest income',
          inputArray: this.financialHistoryArrays.get(
            'interestIncome'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Interest expense',
          inputArray: this.financialHistoryArrays.get(
            'interestExpense'
          ) as FormArray,
        },
        {
          lineType: LineType.SUB_TOTAL,
          title: 'Profit before tax',
          inputArray: this.financialHistoryArrays.get(
            'profitBeforeTax'
          ) as FormArray,
        },
        {
          lineType: LineType.STANDARD_LINE_NO_EMPHASIS,
          title: 'Taxation expense',
          inputArray: this.financialHistoryArrays.get(
            'taxExpense'
          ) as FormArray,
        },
        {
          lineType: LineType.SECTION_TOTAL,
          title: 'Profit after tax',
          inputArray: this.financialHistoryArrays.get(
            'profitAfterTax'
          ) as FormArray,
        },
      ],
    });
  }
}
