/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/component-class-suffix */
import { Component } from '@angular/core';
import {
  FinanceMenuPageConfig,
  InvoicesMenuPageConfig,
  InvoiceListPageConfig,
  InvoiceListMenuConfig,
  GenerateInvoiceResultsPageConfig,
  GenerateInvoiceResultsMenuConfig,
  PaymentsMenuPageConfig,
  PaymentListPageConfig,
  PaymentListMenuConfig,
  StatementPageConfig,
  StatementMenuConfig,
  NoInvoiceGeneratedResultsPageConfig,
} from '../../configs/finance-page.configs';
import { FinancePageViewState as ViewState } from '../../enums/viewstates.enum';
import {
  DocView,
  FinancialDocType,
} from '../../interfaces/common-page-configs.interface';
import { PaymentDetails } from '../../interfaces/payments.interface';
import { GenerateInvoiceParameters } from '../../modals/generate-invoice/generate-invoice.modal';
import { GenerateStatementParameters } from '../../modals/generate-statement/generate-statement.modal';
import {
  InvoicesService,
  GenerateInvoiceResult,
} from '../../services/invoices/invoices.service';
import { PaymentsService } from '../../services/payments/payments.service';
import { StatementsService } from '../../services/statements/statements.service';

export interface MenuOption {
  display: string;
  viewState: ViewState;
}
@Component({
  selector: 'app-finances-page',
  templateUrl: './finances.page.html',
  styleUrls: ['./finances.page.scss'],
})
export class FinancesPage {
  // Configs
  financeMenuPageConfig = FinanceMenuPageConfig;
  invoicesMenuPageConfig = InvoicesMenuPageConfig;
  invoiceListPageConfig = InvoiceListPageConfig;
  invoiceListMenuConfig = InvoiceListMenuConfig;
  generateInvoiceResultsPageConfig = GenerateInvoiceResultsPageConfig;
  generateInvoiceResultsMenuConfig = GenerateInvoiceResultsMenuConfig;
  paymentsMenuPageConfig = PaymentsMenuPageConfig;
  paymentListPageConfig = PaymentListPageConfig;
  paymentListMenuConfig = PaymentListMenuConfig;
  statementPageConfig = StatementPageConfig;
  statementMenuConfig = StatementMenuConfig;

  viewStateEnum = ViewState;
  currentViewState = ViewState.MAIN;
  isInvoiceGenerationComplete = true;

  invoiceDocViewConfig = {} as DocView;
  currentPayment = {} as PaymentDetails;

  private currentInvoiceID = 0;
  private currentPaymentID = 0;

  constructor(
    private invoiceService: InvoicesService,
    private paymentsService: PaymentsService,
    private statementService: StatementsService
  ) {}

  onMenuOptionClicked(viewStateSelected: ViewState) {
    this.switchViewState(viewStateSelected);
  }

  onInvoiceClicked(document: { docType: FinancialDocType; docNum: number }) {
    this.currentInvoiceID = document.docNum;
    this.switchViewState(ViewState.INVOICE_DETAIL);
  }

  onPaymentClicked(document: { docType: FinancialDocType; docNum: number }) {
    const payments = this.paymentsService.payments;
    if (!payments) return;
    this.currentPayment = payments[document.docNum];
    this.switchViewState(ViewState.PAYMENT_DETAIL);
  }

  onStatementClicked(document: { docType: FinancialDocType; docNum: number }) {
    if (document.docType === FinancialDocType.INVOICE) {
      this.onInvoiceClicked(document);
      return;
    }
    if (document.docType === FinancialDocType.PAYMENT) {
      this.onPaymentClicked(document);
      return;
    }
  }

  paymentCreated(paymentDetails: PaymentDetails) {
    this.paymentsService.addPayment(paymentDetails);
  }

  paymentEdited(paymentDetails: PaymentDetails) {
    paymentDetails.voided = false;
    this.paymentsService.editPayment(this.currentPaymentID, paymentDetails);
  }

  paymentVoided() {
    this.paymentsService.voidPayment(this.currentPaymentID);
    this.switchViewState(ViewState.VIEW_PAYMENTS);
  }

  generateInvoices(params: GenerateInvoiceParameters) {
    this.isInvoiceGenerationComplete = false;
    const results = this.invoiceService.generateInvoices(params);
    this.setInvoiceGenerationResultsForDisplay(results);
    this.isInvoiceGenerationComplete = true;
    this.switchViewState(ViewState.GENERATE_INVOICES_RESULTS);
  }

  generateStatement(params: GenerateStatementParameters) {
    this.statementPageConfig.items =
      this.statementService.generateStatement(params);
    this.switchViewState(ViewState.VIEW_STATEMENT);
  }

  switchViewState(viewStateSelected: ViewState) {
    switch (viewStateSelected) {
      case ViewState.VIEW_INVOICES:
        this.getInvoiceDataForDisplay();
        break;
      case ViewState.INVOICE_DETAIL:
        this.getInvoiceDocForDisplay();
        break;
      case ViewState.VIEW_PAYMENTS:
        this.getPaymentDocForDisplay();
        break;
      case ViewState.PAYMENTS:
        this.currentPaymentID = 0;
        break;
    }
    this.currentViewState = viewStateSelected;
  }

  private getInvoiceDataForDisplay() {
    this.invoiceListPageConfig.items =
      this.invoiceService.setInvoiceDataForDisplay();
  }

  private getInvoiceDocForDisplay() {
    this.invoiceDocViewConfig = this.invoiceService.setInvoiceDocForDisplay(
      this.currentInvoiceID
    );
  }

  private getPaymentDocForDisplay() {
    this.currentPaymentID = 0;
    this.paymentListPageConfig.items =
      this.paymentsService.setPaymentDocForDisplay();
  }

  private setInvoiceGenerationResultsForDisplay(
    results: GenerateInvoiceResult
  ) {
    if (!results) return;
    results.numberOfInvoices
      ? this.invoiceService.setInvoiceGenerationResultsForDisplay(results)
      : (this.generateInvoiceResultsPageConfig =
          NoInvoiceGeneratedResultsPageConfig);
  }
}
