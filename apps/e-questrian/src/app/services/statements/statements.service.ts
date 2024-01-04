import { Injectable } from '@angular/core';
import {
  FinancialDocItem,
  FinancialDocType,
} from '../../interfaces/common-page-configs.interface';
import { Invoices } from '../../interfaces/invoices.interface';
import { GenerateStatementParameters } from '../../modals/generate-statement/generate-statement.modal';
import { ClientsService } from '../clients/clients.service';
import { InvoicesService } from '../invoices/invoices.service';
import { PaymentsService } from '../payments/payments.service';

export interface StatementBasics {
  openingBalance: number;
  transactions: FinancialDocItem[];
  closingBalance: number;
}

@Injectable({
  providedIn: 'root',
})
export class StatementsService {
  get payments() {
    return this.paymentsService.paymentsOnFile;
  }

  get invoices(): Invoices {
    return this.invoicesService.invoicesOnFile;
  }

  constructor(
    private paymentsService: PaymentsService,
    private invoicesService: InvoicesService,
    private clientsService: ClientsService
  ) {}

  generateStatement(params: GenerateStatementParameters): FinancialDocItem[] {
    const statementBasics: StatementBasics = {
      openingBalance: 0,
      transactions: [],
      closingBalance: 0,
    };

    this.getAllFinancialDocsForClient(
      parseInt(params.client as string),
      statementBasics
    );
    this.dateScopeFinancialDocOfClient(
      statementBasics,
      params.startDate,
      params.endDate
    );
    this.sortTransactionByDate(statementBasics);
    return this.compileStatementFromStatementBasics(
      statementBasics,
      params.startDate,
      params.endDate
    );
  }

  private getAllFinancialDocsForClient(
    clientID: number,
    statementBasics: StatementBasics
  ) {
    this.getAllInvoicesForClient(clientID, statementBasics);
    this.getAllPaymentsForClient(clientID, statementBasics);
  }

  private getAllInvoicesForClient(
    clientID: number,
    statementBasics: StatementBasics
  ) {
    if (!this.invoices) return;
    Object.keys(this.invoices).forEach((key) => {
      if (this.invoices[parseInt(key)].clientID === clientID) {
        const invoice = this.invoices[parseInt(key)];
        const docToAdd: FinancialDocItem = {
          number: parseInt(key),
          date: new Date(invoice.date),
          detail: 'Invoice',
          amount: invoice.appointments.length * 250,
          docType: FinancialDocType.INVOICE,
          voided: invoice.voided,
        };
        statementBasics.transactions.push(docToAdd);
      }
    });
  }

  private getAllPaymentsForClient(
    clientID: number,
    statementBasics: StatementBasics
  ) {
    Object.keys(this.payments).forEach((key) => {
      if (this.payments[parseInt(key)].client === clientID) {
        const payment = this.payments[parseInt(key)];
        const docToAdd: FinancialDocItem = {
          number: parseInt(key),
          date: new Date(payment.date),
          detail: 'Payment',
          amount: -payment.amount as number,
          docType: FinancialDocType.PAYMENT,
          voided: payment.voided,
        };
        statementBasics.transactions.push(docToAdd);
      }
    });
  }

  private dateScopeFinancialDocOfClient(
    statementBasics: StatementBasics,
    startDate: Date,
    endDate: Date
  ) {
    const allTransactions = statementBasics.transactions;
    statementBasics.transactions = [];
    allTransactions.forEach((transaction) => {
      if (transaction.date < startDate) {
        statementBasics.openingBalance =
          statementBasics.openingBalance + transaction.amount;
      } else if (transaction.date <= endDate) {
        statementBasics.closingBalance =
          statementBasics.closingBalance + transaction.amount;
        statementBasics.transactions.push(transaction);
      }
    });
    statementBasics.closingBalance =
      statementBasics.closingBalance + statementBasics.openingBalance;
  }

  private sortTransactionByDate(statementBasics: StatementBasics) {
    statementBasics.transactions.sort(function (a, b) {
      const keyA = new Date(a.date),
        keyB = new Date(b.date);
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  }

  private compileStatementFromStatementBasics(
    statementBasics: StatementBasics,
    startDate: Date,
    endDate: Date
  ): FinancialDocItem[] {
    const statement: FinancialDocItem[] = [];

    // Add opening balance as first item in statement
    statement.push({
      number: 0,
      date: startDate,
      detail: 'Opening balance',
      amount: statementBasics.openingBalance,
      docType: FinancialDocType.BALANCE,
      voided: false,
    });

    // Add transaction for display to statement
    statementBasics.transactions.forEach((transaction) => {
      statement.push(transaction);
    });

    // Add closing balance as last item in statement
    statement.push({
      number: 0,
      date: endDate,
      detail: 'Closing balance',
      amount: statementBasics.closingBalance,
      docType: FinancialDocType.BALANCE,
      voided: false,
    });
    return statement;
  }
}
