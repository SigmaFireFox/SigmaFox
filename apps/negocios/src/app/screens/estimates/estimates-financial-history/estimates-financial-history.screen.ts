import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { EstimatesFinancialHistory } from 'app/~global-interfaces/estimates-financial-history.interface';

@Component({
  selector: 'app-estimates-financial-history-screen',
  templateUrl: './estimates-financial-history.screen.html',
  styleUrls: ['./estimates-financial-history.screen.scss'],
})
export class EstimatesFinancialHistoryScreen implements OnInit {
  @Input() numberOfYearsRequired: number = 0;
  @Input() lastFinancialYear: number = new Date().getFullYear();
  @Input() updatedDataRequested: Observable<boolean> | undefined;

  @Output() updateFinancialHistory = new EventEmitter<
    EstimatesFinancialHistory[]
  >();
  @Output() formErrors = new EventEmitter<string[]>();
  @Output() formWarnings = new EventEmitter<string[]>();

  private dataRequestSubscription: Subscription | undefined;

  $requestHistoryFormData = new BehaviorSubject(false);

  financialHistory: EstimatesFinancialHistory[] = [];

  ngOnInit() {
    this.setSubscriptionsRequired();
  }

  ngOnDestroy() {
    this.dataRequestSubscription!.unsubscribe();
  }

  onReceiptOfFormData(formData: EstimatesFinancialHistory[]) {
    this.financialHistory = formData;
    this.submitUpdate();
  }

  private setSubscriptionsRequired() {
    this.dataRequestSubscription = this.updatedDataRequested!.subscribe(
      (requestScreenData) => {
        requestScreenData ? this.$requestHistoryFormData.next(true) : null;
      }
    );
  }

  // Functions to vet and submit data back to page
  private submitUpdate() {
    if (!this.isFinancialHistoryAcceptable()) {
      this.formErrors.emit(this.getListOfErrors());
      return;
    }
    if (!this.isFinancialHistoryReasonable) {
      this.formWarnings.emit(this.getListOfWarnings());
    }
    this.updateFinancialHistory.emit(this.financialHistory);
  }

  // Functions realted to form acceptabilty
  private isFinancialHistoryAcceptable(): boolean {
    if (!this.isBalanceSheetBalanced()) {
      return false;
    }
    return true;
  }

  private isBalanceSheetBalanced(): boolean {
    for (let i = 0; i < this.numberOfYearsRequired; i++) {
      if (
        this.financialHistory[i].assetsTotal !==
        this.financialHistory[i].equityAndLiabiltiesTotal
      ) {
        return false;
      }
    }
    return true;
  }

  private getListOfErrors(): string[] {
    let listOfErrors: string[] = [];
    if (!this.isBalanceSheetBalanced()) {
      listOfErrors = listOfErrors.concat(this.getListOfImbalancedYears());
    }
    return listOfErrors;
  }

  private getListOfImbalancedYears(): string[] {
    let listOfImabalancedYear: string[] = [];
    for (let i = 0; i < this.numberOfYearsRequired; i++) {
      if (
        this.financialHistory[i].assetsTotal !==
        this.financialHistory[i].equityAndLiabiltiesTotal
      ) {
        listOfImabalancedYear.push(
          'The balance sheet for ' + i.toString() + ' does not balance'
        );
      }
    }
    return listOfImabalancedYear;
  }

  // Functions realted to form reasonabilty
  private isFinancialHistoryReasonable(): boolean {
    if (!this.isIncomeStatementReasonable()) {
      return false;
    }
    if (!this.isBalanceSheetReasonable()) {
      return false;
    }
    return true;
  }

  private isIncomeStatementReasonable() {
    return true;
    // TODO: Reasonabilty tests for Income Statement
  }

  private isBalanceSheetReasonable() {
    return true;
    // TODO: Reasonabilty tests for Balance Sheet
  }

  private getListOfWarnings(): string[] {
    let listOfWarnings: string[] = [];
    !this.isIncomeStatementReasonable()
      ? listOfWarnings.concat(this.getListOfISWarnings())
      : null;
    !this.isBalanceSheetReasonable()
      ? listOfWarnings.concat(this.getListOfBSWarnings())
      : null;

    return listOfWarnings;
  }

  private getListOfISWarnings(): string[] {
    return [];
  }

  private getListOfBSWarnings(): string[] {
    return [];
  }
}
