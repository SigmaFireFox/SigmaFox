import { DocType } from '../enums/doc-types.enum';
import { ClientDetailWithFinancialRecords } from './clients.interface';
import { MenuOption } from './menu-options.interface';

export interface PageConfig {
  header: string;
  subHeader?: string;
}

export interface MenuPageConfig extends PageConfig {
  menu: MenuOption[];
}

export interface DocID {
  docType: FinancialDocType;
  docNum: number;
}

export enum FinancialDocType {
  LIST,
  STATEMENT,
  INVOICE,
  PAYMENT,
  CREDITNOTE,
  BALANCE,
}

export interface FinancialDocListPageConfig extends PageConfig {
  financialDocType: FinancialDocType;
  isVoidToggable: boolean;
  items: FinancialDocItem[];
}

export interface FinancialDocItem {
  number: number;
  date: Date;
  detail: string;
  amount: number;
  docType: FinancialDocType;
  voided: boolean;
}

export interface DocView extends PageConfig {
  docType: DocType;
  docNumber: number;
  docClient: ClientDetailWithFinancialRecords;
  lineItems: LineItemGroup[];
  summaryItems: SummaryItem[];
}

export interface LineItemGroup {
  [groupName: string]: LineItem[];
}

export interface LineItem {
  number: number;
  date: Date;
  detail: string;
  amount: number;
}

export interface SummaryItem {
  detail: string;
  amount: number;
  bold?: boolean;
  isTally?: boolean;
}
export interface ProcessResultsPageConfig extends PageConfig {
  explainer: string;
  results: ProcessResult[];
}

export enum ResultType {
  NUMBER,
  DATE,
  LIST,
}

export interface ProcessResult {
  description: string;
  resultType: ResultType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: any;
}

export interface GeneralItemsListPageConfig extends PageConfig {
  columns: PageColumns[];
  items: GeneralItem;
}

export interface PageColumns {
  content: string;
  widthFactor: number;
  widthPerc?: string;
}

export interface GeneralItem {
  [refID: number]: GeneralItemDetail;
}

export interface GeneralItemDetail {
  listedDetails: GeneralItemField[];
  voided: boolean;
}

export interface GeneralItemField {
  content: string;
  widthPerc?: string;
}
