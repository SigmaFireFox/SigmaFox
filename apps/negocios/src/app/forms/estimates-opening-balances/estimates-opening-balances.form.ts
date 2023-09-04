/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { EstimatesFinancialHistory } from '../../~global-interfaces/estimates-financial-history.interface';
import { SectionType } from '../form.enums';

export enum OptionElected {
  NONE = 0,
  ENTER_BALANCES = 1,
  ZERO_BASE = 2,
  IGNORE = 3,
}

export interface FormSections {
  sectionType: SectionType;
  title?: string;
  listOfControls?: FormSectionsControl[];
}
export interface FormSectionsControl {
  title: string;
  controlName: string;
  closingValue: number;
}

@Component({
  selector: 'app-estimates-opening-balances-form',
  templateUrl: './estimates-opening-balances.form.html',
  styleUrls: ['./estimates-opening-balances.form.scss'],
})
export class EstimatesOpeningBalancesForm implements OnInit {
  @Input() firstFinancialYearData = {} as EstimatesFinancialHistory;
  @Input() openingBalancesRequested: Observable<boolean> | undefined;

  @Output() updatedOpeningBalances =
    new EventEmitter<EstimatesFinancialHistory>();

  balanceRequestSubscription: Subscription | undefined;

  sectionType = SectionType;
  listOfControls: string[] = [];
  openingBalancesFormStructure: FormSections[] = [];

  openingBalancesForm = this.formBuilder.group({
    ncaPPE: [0],
    ncaFinancialAssets: [0],
    ncaDefferedTaxAsset: [0],
    ncaOtherAssets: [0],
    ncaSubTotal: [0],
    caTradeAndOtherReceivables: [0],
    caCashAndCashEquivalents: [0],
    caInventories: [0],
    caFinancialAssets: [0],
    caTaxCredits: [0],
    caOtherAssets: [0],
    caSubTotal: [0],
    assetsTotal: [0],
    eqShareCapital: [0],
    eqRetainedEarningsClosing: [0],
    eqShareHolderLoans: [0],
    eqSubTotal: [0],
    nclFinancialLiabilties: [0],
    nclDefferedTaxLiabilties: [0],
    nclOtherLiabilties: [0],
    nclSubTotal: [0],
    clTradeAndOtherPayables: [0],
    clFinancialLiabilties: [0],
    clTaxPayables: [0],
    clOtherLiabilties: [0],
    clSubTotal: [0],
    equityAndLiabiltiesTotal: [0],
  }) as FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.setSubscriptionsRequired();
    this.setPredefinedInputValues();
    this.setUpForm();
    this.calcBalances();
  }

  updateFormControl(controlName: string, number: any) {
    this.openingBalancesForm.controls[controlName].setValue(number);
    this.calcBalances();
  }

  private setSubscriptionsRequired() {
    this.balanceRequestSubscription = this.openingBalancesRequested?.subscribe(
      (openingBalancesRequested) => {
        openingBalancesRequested ? this.submitOpeningBalances() : null;
      }
    );
  }

  private submitOpeningBalances() {
    this.calcBalances();
    this.updatedOpeningBalances.emit(
      this.openingBalancesForm.value as EstimatesFinancialHistory
    );
  }

  private setPredefinedInputValues() {
    this.openingBalancesForm.controls['eqRetainedEarningsClosing'].setValue(
      this.firstFinancialYearData.eqRetainedEarningsOpening
    );
  }

  private setUpForm() {
    this.setUpAssetsSection();
    this.setUpEquityAndLiabiltiesSection();
  }

  private setUpAssetsSection() {
    this.setUpNonCurrentAssetsSection();
    this.setUpCurrentAssetsSection();
    this.openingBalancesFormStructure.push({
      sectionType: SectionType.TOTAL,
      listOfControls: [
        {
          title: 'TOTAL ASSETS',
          controlName: 'assetsTotal',
          closingValue: this.firstFinancialYearData.assetsTotal,
        },
      ],
    });
  }

  private setUpEquityAndLiabiltiesSection() {
    this.setUpEquitySection();
    this.setUpLiabiltiesSection();
    this.openingBalancesFormStructure.push({
      sectionType: SectionType.TOTAL,
      listOfControls: [
        {
          title: 'TOTAL EQUITY AND LIABILITIES',
          controlName: 'equityAndLiabiltiesTotal',
          closingValue: this.firstFinancialYearData.equityAndLiabiltiesTotal,
        },
      ],
    });
  }

  private setUpEquitySection() {
    this.openingBalancesFormStructure.push({
      sectionType: SectionType.HEADER,
      title: 'Equity',
    });
    this.openingBalancesFormStructure.push({
      sectionType: SectionType.DISABLED_INPUT,
      listOfControls: [
        {
          title: 'Retained Earnings',
          controlName: 'eqRetainedEarningsClosing',
          closingValue: this.firstFinancialYearData.eqRetainedEarningsClosing,
        },
      ],
    });
    this.openingBalancesFormStructure.push({
      sectionType: SectionType.INPUT,
      listOfControls: [
        {
          title: 'Share Capital',
          controlName: 'eqShareCapital',
          closingValue: this.firstFinancialYearData.eqShareCapital,
        },
        {
          title: 'Shareholder Loans',
          controlName: 'eqShareHolderLoans',
          closingValue: this.firstFinancialYearData.eqShareHolderLoans,
        },
      ],
    });
    this.openingBalancesFormStructure.push({
      sectionType: SectionType.SUBTOTAL,
      listOfControls: [
        {
          title: 'Total Equity',
          controlName: 'eqSubTotal',
          closingValue: this.firstFinancialYearData.eqSubTotal,
        },
      ],
    });
  }

  private setUpLiabiltiesSection() {
    this.setUpNonCurrentLiabiltiesSection();
    this.setUpCurrentLiabiltiesSection();
  }

  private setUpNonCurrentAssetsSection() {
    this.openingBalancesFormStructure.push({
      sectionType: SectionType.HEADER,
      title: 'Non-current Assets',
    });
    this.openingBalancesFormStructure.push({
      sectionType: SectionType.INPUT,
      listOfControls: [
        {
          title: 'Plant, Property and Equipment',
          controlName: 'ncaPPE',
          closingValue: this.firstFinancialYearData.ncaPPE,
        },
        {
          title: 'Non-current Financial Assets',
          controlName: 'ncaFinancialAssets',
          closingValue: this.firstFinancialYearData.ncaFinancialAssets,
        },
        {
          title: 'Non-current Deffered Tax Assets',
          controlName: 'ncaDefferedTaxAsset',
          closingValue: this.firstFinancialYearData.ncaDefferedTaxAsset,
        },
        {
          title: 'Other Non-current  Assets',
          controlName: 'ncaOtherAssets',
          closingValue: this.firstFinancialYearData.ncaOtherAssets,
        },
      ],
    });
    this.openingBalancesFormStructure.push({
      sectionType: SectionType.SUBTOTAL,
      listOfControls: [
        {
          title: 'Total Non-current Assets',
          controlName: 'ncaSubTotal',
          closingValue: this.firstFinancialYearData.ncaSubTotal,
        },
      ],
    });
  }

  private setUpCurrentAssetsSection() {
    this.openingBalancesFormStructure.push({
      sectionType: SectionType.HEADER,
      title: 'Current Assets',
    });
    this.openingBalancesFormStructure.push({
      sectionType: SectionType.INPUT,
      listOfControls: [
        {
          title: 'Trade and Other Receivables',
          controlName: 'caTradeAndOtherReceivables',
          closingValue: this.firstFinancialYearData.caTradeAndOtherReceivables,
        },
        {
          title: 'Cash and Cash Equivalents',
          controlName: 'caCashAndCashEquivalents',
          closingValue: this.firstFinancialYearData.caCashAndCashEquivalents,
        },
        {
          title: 'Inventories',
          controlName: 'caInventories',
          closingValue: this.firstFinancialYearData.caCashAndCashEquivalents,
        },
        {
          title: 'Current Financial Assets',
          controlName: 'caFinancialAssets',
          closingValue: this.firstFinancialYearData.caFinancialAssets,
        },
        {
          title: 'Current Tax Credits',
          controlName: 'caTaxCredits',
          closingValue: this.firstFinancialYearData.caTaxCredits,
        },
        {
          title: 'Other Current Assets',
          controlName: 'caOtherAssets',
          closingValue: this.firstFinancialYearData.caOtherAssets,
        },
      ],
    });
    this.openingBalancesFormStructure.push({
      sectionType: SectionType.SUBTOTAL,
      listOfControls: [
        {
          title: 'Total Current Assets',
          controlName: 'caSubTotal',
          closingValue: this.firstFinancialYearData.caSubTotal,
        },
      ],
    });
  }

  private setUpNonCurrentLiabiltiesSection() {
    this.openingBalancesFormStructure.push({
      sectionType: SectionType.HEADER,
      title: 'Non-current Liabilities',
    });
    this.openingBalancesFormStructure.push({
      sectionType: SectionType.INPUT,
      listOfControls: [
        {
          title: 'Non-current Financial Liabilities',
          controlName: 'nclFinancialLiabilties',
          closingValue: this.firstFinancialYearData.nclFinancialLiabilties,
        },
        {
          title: 'Non-current Deffered Tax Liabilities',
          controlName: 'nclDefferedTaxLiabilties',
          closingValue: this.firstFinancialYearData.nclDefferedTaxLiabilties,
        },
        {
          title: 'Other Non-current Liabilities',
          controlName: 'nclOtherLiabilties',
          closingValue: this.firstFinancialYearData.nclOtherLiabilties,
        },
      ],
    });
    this.openingBalancesFormStructure.push({
      sectionType: SectionType.SUBTOTAL,
      listOfControls: [
        {
          title: 'Total Non-current Liabilities',
          controlName: 'nclSubTotal',
          closingValue: this.firstFinancialYearData.nclSubTotal,
        },
      ],
    });
  }

  private setUpCurrentLiabiltiesSection() {
    this.openingBalancesFormStructure.push({
      sectionType: SectionType.HEADER,
      title: 'Current Liabilties',
    });
    this.openingBalancesFormStructure.push({
      sectionType: SectionType.INPUT,
      listOfControls: [
        {
          title: 'Trade and Other Payables',
          controlName: 'clTradeAndOtherPayables',
          closingValue: this.firstFinancialYearData.clTradeAndOtherPayables,
        },
        {
          title: 'Current Financial Liabilties',
          controlName: 'clFinancialLiabilties',
          closingValue: this.firstFinancialYearData.clFinancialLiabilties,
        },
        {
          title: 'Current Tax Payables',
          controlName: 'clTaxPayables',
          closingValue: this.firstFinancialYearData.clTaxPayables,
        },
        {
          title: 'Other Current Liabilties',
          controlName: 'clOtherLiabilties',
          closingValue: this.firstFinancialYearData.clOtherLiabilties,
        },
      ],
    });
    this.openingBalancesFormStructure.push({
      sectionType: SectionType.SUBTOTAL,
      listOfControls: [
        {
          title: 'Total Current Liabilties',
          controlName: 'clSubTotal',
          closingValue: this.firstFinancialYearData.clSubTotal,
        },
      ],
    });
  }

  private calcBalances() {
    this.openingBalancesForm.controls['ncaSubTotal'].setValue(
      +this.openingBalancesForm.controls['ncaPPE'].value +
        +this.openingBalancesForm.controls['ncaFinancialAssets'].value +
        +this.openingBalancesForm.controls['ncaDefferedTaxAsset'].value +
        +this.openingBalancesForm.controls['ncaOtherAssets'].value
    );

    this.openingBalancesForm.controls['caSubTotal'].setValue(
      +this.openingBalancesForm.controls['caTradeAndOtherReceivables'].value +
        +this.openingBalancesForm.controls['caCashAndCashEquivalents'].value +
        +this.openingBalancesForm.controls['caFinancialAssets'].value +
        +this.openingBalancesForm.controls['caTaxCredits'].value +
        +this.openingBalancesForm.controls['caOtherAssets'].value
    );

    this.openingBalancesForm.controls['eqSubTotal'].setValue(
      +this.openingBalancesForm.controls['eqRetainedEarningsClosing'].value +
        +this.openingBalancesForm.controls['eqShareCapital'].value +
        +this.openingBalancesForm.controls['eqShareHolderLoans'].value
    );

    this.openingBalancesForm.controls['nclSubTotal'].setValue(
      +this.openingBalancesForm.controls['nclFinancialLiabilties'].value +
        +this.openingBalancesForm.controls['nclDefferedTaxLiabilties'].value +
        +this.openingBalancesForm.controls['nclOtherLiabilties'].value
    );

    this.openingBalancesForm.controls['clSubTotal'].setValue(
      +this.openingBalancesForm.controls['clTradeAndOtherPayables'].value +
        +this.openingBalancesForm.controls['clFinancialLiabilties'].value +
        +this.openingBalancesForm.controls['clTaxPayables'].value +
        +this.openingBalancesForm.controls['clOtherLiabilties'].value
    );

    this.openingBalancesForm.controls['assetsTotal'].setValue(
      +this.openingBalancesForm.controls['ncaSubTotal'].value +
        +this.openingBalancesForm.controls['caSubTotal'].value
    );

    this.openingBalancesForm.controls['equityAndLiabiltiesTotal'].setValue(
      +this.openingBalancesForm.controls['eqSubTotal'].value +
        +this.openingBalancesForm.controls['nclSubTotal'].value +
        +this.openingBalancesForm.controls['clSubTotal'].value
    );
  }
}
