import { FinancePageViewState as ViewState } from '../enums/viewstates.enum';
import {
  MenuPageConfig,
  FinancialDocType,
  FinancialDocListPageConfig,
  ProcessResultsPageConfig,
} from '../interfaces/common-page-configs.interface';
import { OptionStyling } from '../interfaces/menu-options.interface';

export const FinanceMenuPageConfig = {
  header: '',
  subHeader: 'Finance Menu',
  menu: [
    {
      display: 'Invoices',
      viewState: ViewState.INVOICES,
    },
    {
      display: 'Payments',
      viewState: ViewState.PAYMENTS,
    },
    {
      display: 'Statements',
      viewState: ViewState.GENERATE_STATEMENTS_PARAMETERS,
    },
    {
      display: 'Back to Main Menu',
      path: '/home',
      styling: OptionStyling.Secondary,
    },
  ],
} as MenuPageConfig;

export const InvoicesMenuPageConfig = {
  header: '',
  subHeader: 'Invoices Menu',
  menu: [
    { display: 'View Invoices', viewState: ViewState.VIEW_INVOICES },
    {
      display: 'Generate invoices',
      viewState: ViewState.GENERATE_INVOICES_PARAMETERS,
    },
    {
      display: 'Back to Finance Menu',
      viewState: ViewState.MAIN,
      styling: OptionStyling.Secondary,
    },
  ],
} as MenuPageConfig;

export const InvoiceListPageConfig = {
  header: '',
  subHeader: 'Invoices',
  financialDocType: FinancialDocType.LIST,
  items: [],
} as FinancialDocListPageConfig;

export const InvoiceListMenuConfig = {
  header: '',
  subHeader: '',
  menu: [
    {
      display: 'Back to Invoices Menu',
      viewState: ViewState.INVOICES,
      styling: OptionStyling.Secondary,
    },
  ],
} as MenuPageConfig;

export const GenerateInvoiceResultsPageConfig = {
  header: '',
  subHeader: 'Invoices generated',
  explainer: 'The results of the invoice generation are presented below',
  results: [],
} as ProcessResultsPageConfig;

export const NoInvoiceGeneratedResultsPageConfig = {
  header: '',
  subHeader: 'No Invoices Generated',
  explainer:
    'Based on the current appointments and invoices previously, we were unable to find any further invoices possible to generate',
  results: [],
} as ProcessResultsPageConfig;

export const GenerateInvoiceResultsMenuConfig = {
  header: '',
  subHeader: '',
  menu: [{ display: 'View invoices', viewState: ViewState.VIEW_INVOICES }],
} as MenuPageConfig;

export const PaymentsMenuPageConfig = {
  header: '',
  subHeader: 'Payments Menu',
  menu: [
    { display: 'RecordPayment', viewState: ViewState.PAYMENT_DETAIL },
    { display: 'View Payments', viewState: ViewState.VIEW_PAYMENTS },
    {
      display: 'Back to Finance Menu',
      viewState: ViewState.MAIN,
      styling: OptionStyling.Secondary,
    },
  ],
} as MenuPageConfig;

export const PaymentListPageConfig = {
  header: '',
  subHeader: 'Payments',
  financialDocType: FinancialDocType.LIST,
  items: [],
} as FinancialDocListPageConfig;

export const PaymentListMenuConfig = {
  header: '',
  subHeader: '',
  menu: [
    {
      display: 'Back to Payments Menu',
      viewState: ViewState.PAYMENTS,
      styling: OptionStyling.Secondary,
    },
  ],
} as MenuPageConfig;

export const StatementPageConfig = {
  header: '',
  subHeader: 'Statement',
  financialDocType: FinancialDocType.STATEMENT,
  items: [],
} as FinancialDocListPageConfig;

export const StatementMenuConfig = {
  header: '',
  subHeader: '',
  menu: [
    {
      display: 'Back to Finance Menu',
      viewState: ViewState.MAIN,
      styling: OptionStyling.Secondary,
    },
  ],
} as MenuPageConfig;
