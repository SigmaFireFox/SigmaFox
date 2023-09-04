import { TrendlineType } from '../~global-enums/chart.enum';

export interface MarketDataTicker {
  exchange: string;
  companyCode: string;
}

export interface ComparativeDataStats {
  mean: ComparativeData;
  standardDeviation: ComparativeData;
}

export interface TrendlineData {
  trendlineType: TrendlineType;
  equation: number[];
  string: string;
  r2: number;
}

export interface ComparativeData {
  description: string;
  marketCap: number;
  statementYear: number;
  revenue: number;
  grossProfit: number;
  operatingProfit: number;
  netProfit: number;
}

export interface FMPFinancialStatement {
  acceptedDate: string;
  calendarYear: string;
  cik: string;
  costAndExpenses: number;
  costOfRevenue: number;
  date: string;
  depreciationAndAmortization: number;
  ebitda: number;
  ebitdaratio: number;
  eps: number;
  epsdiluted: number;
  fillingDate: string;
  finalLink: string;
  generalAndAdministrativeExpenses: number;
  grossProfit: number;
  grossProfitRatio: number;
  incomeBeforeTax: number;
  incomeBeforeTaxRatio: number;
  incomeTaxExpense: number;
  interestExpense: number;
  interestIncome: number;
  link: string;
  netIncome: number;
  netIncomeRatio: number;
  operatingExpenses: number;
  operatingIncome: number;
  operatingIncomeRatio: number;
  otherExpenses: number;
  period: string;
  reportedCurrency: string;
  researchAndDevelopmentExpenses: number;
  revenue: number;
  sellingAndMarketingExpenses: 0;
  sellingGeneralAndAdministrativeExpenses: number;
  symbol: string;
  totalOtherIncomeExpensesNet: number;
  weightedAverageShsOut: number;
  weightedAverageShsOutDil: number;
}

export interface FMPProfile {
  symbol: string;
  price: number;
  beta: number;
  volAvg: number;
  mktCap: number;
  lastDiv: number;
  range: string;
  changes: number;
  companyName: string;
  currency: string;
  cik: string;
  isin: string;
  cusip: string;
  exchange: string;
  exchangeShortName: string;
  industry: string;
  website: string;
  description: string;
  ceo: string;
  sector: string;
  country: string;
  fullTimeEmployees: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  dcfDiff: number;
  dcf: number;
  image: string;
  ipoDate: string;
  defaultImage: boolean;
  isEtf: boolean;
  isActivelyTrading: boolean;
  isAdr: boolean;
  isFund: boolean;
}
