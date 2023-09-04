import { MonthsOfYear } from '../~global-enums/general.enum';

export interface ValuationsData {
  title: string;
  basicDetails: ValuationsBasicDetails;
  financialHistory: ValuationsFinancialHistory;
}

export interface ValuationsBasicDetails {
  targetEntityName: string;
  targetEntityFYE: MonthsOfYear;
  valuationDate: Date;
}

export interface ValuationsFinancialHistory {
  data: ValuationsFinancialHistoryYear[];
}

export interface ValuationsFinancialHistoryYear {
  revenue: number;
  costOfSales: number;
  operatingExpenses: number;
  otherIncome: number;
  interestExpense: number;
  interestIncome: number;
  taxation: number;
}
