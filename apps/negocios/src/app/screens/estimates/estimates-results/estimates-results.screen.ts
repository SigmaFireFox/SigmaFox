/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { EstimatesForecastsService } from '../../../services/estimates/estimates-forecasts.service';
import { MarketDataService } from '../../../services//market-data/market-data.service';
import { FrequencyChartData } from '../../../~global-interfaces/charts.interface';
import { EstimatesCashFlowYear } from '../../../~global-interfaces/estimates-cashflows.interface';
import { EstimatesFinancialHistory } from '../../../~global-interfaces/estimates-financial-history.interface';
import { ForecastVariableData } from '../../../~global-interfaces/estimates-forecasts.interface';
import {
  ComparativeData,
  MarketDataTicker,
} from '../../../~global-interfaces/market-data.interface';
import { VariableType } from '../../../~global-interfaces/variables.enum';

@Component({
  selector: 'app-estimates-results-screen',
  templateUrl: './estimates-results.screen.html',
  styleUrls: ['./estimates-results.screen.scss'],
})
export class EstimatesResultsScreen implements OnInit {
  @Input() financialHistory: EstimatesFinancialHistory[] = [];
  @Input() cashFlows: EstimatesCashFlowYear[] = [];

  forecastDataForDisplay: FrequencyChartData[] = [];
  estimateSummaryDataForDisplay: FrequencyChartData[] = [];
  receivedForecastedData = {} as ForecastVariableData;

  // Variables required for convertion of received forecasts
  grossProfitMargins: number[] = [];
  operatinfProfitMargins: number[] = [];
  nonCoreItems: number[] = [];
  taxRates: number[] = [];
  netEarnings: number[] = [];
  comparativeMarketData: ComparativeData[] | undefined;
  comparativeMarketDataWithoutOutliers: ComparativeData[] | undefined;

  constructor(
    private estimatesResultsService: EstimatesForecastsService,
    private marketDataService: MarketDataService,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.setExampleData();
    this.getForecasts();
    this.convertReceivedForecasts();
    this.setForecastDataForDisplay();
    this.setEstimateSummaryDataForDisplay();
    this.comparativeMarketData = await this.getComparativeData();
  }

  setModifiedComparativeData(modifedComparativeData: ComparativeData[]) {
    this.comparativeMarketDataWithoutOutliers = modifedComparativeData;
    this.cd.detectChanges();
  }

  private setExampleData() {
    this.financialHistory = [
      {
        year: 2020,
        revenue: 10000,
        costOfSales: -4000,
        operatingExpenses: -1500,
        ncaPPE: 50000,
        depreciation: -2200,
        otherIncome: 200,
        interestIncome: 400,
        interestExpense: -100,
        taxExpense: -1000,
      } as EstimatesFinancialHistory,
      {
        year: 2021,
        revenue: 12000,
        costOfSales: -4000,
        operatingExpenses: -2000,
        ncaPPE: 70000,
        depreciation: -2700,
        otherIncome: 300,
        interestIncome: 300,
        interestExpense: -250,
        taxExpense: -1000,
      } as EstimatesFinancialHistory,
    ];
  }

  private getForecasts() {
    this.receivedForecastedData = this.estimatesResultsService.prepareForecasts(
      this.financialHistory,
      this.cashFlows
    );
  }

  private convertReceivedForecasts() {
    // Gross Profit Margins
    this.receivedForecastedData.costOfSalesPerc.forEach((item) => {
      this.grossProfitMargins.push(item + 100);
    });

    // Operating Profit Margins
    this.receivedForecastedData.operatingExpensesPerc.forEach((item, index) => {
      const depreciationAsPercOfRevenue =
        (this.receivedForecastedData.revenue[index] *
          this.receivedForecastedData.ppeRevenueMutliple[index] *
          this.receivedForecastedData.depreciationPPEPerc[index]) /
        100 /
        this.receivedForecastedData.revenue[index];
      this.operatinfProfitMargins.push(
        this.receivedForecastedData.costOfSalesPerc[index] +
          item +
          depreciationAsPercOfRevenue +
          100
      );
    });

    // Non-core items
    this.receivedForecastedData.otherIncome.forEach((item, index) => {
      this.nonCoreItems.push(
        item +
          this.receivedForecastedData.interestExpense[index] +
          this.receivedForecastedData.interestIncome[index]
      );
    });

    // Tax rates
    this.receivedForecastedData.taxRate.forEach((item) => {
      this.taxRates.push(Math.abs(item));
    });

    // Net earnings
    this.receivedForecastedData.revenue.forEach((item, index) => {
      this.netEarnings.push(
        (((item * this.operatinfProfitMargins[index]) / 100 -
          this.nonCoreItems[index]) *
          (100 - this.taxRates[index])) /
          100
      );
    });
  }

  private setForecastDataForDisplay() {
    this.forecastDataForDisplay.push(
      {
        title: 'Revenue',
        data: this.receivedForecastedData.revenue,
        dataType: VariableType.NUMBER,
      },
      {
        title: 'Gross Profit Margins',
        data: this.grossProfitMargins,
        dataType: VariableType.MARGIN,
      },
      {
        title: 'Operating Profit Margins',
        data: this.operatinfProfitMargins,
        dataType: VariableType.MARGIN,
      },
      {
        title: 'Non-core items',
        data: this.nonCoreItems,
        dataType: VariableType.NUMBER,
      },
      {
        title: 'Tax Rates',
        data: this.taxRates,
        dataType: VariableType.MARGIN,
      }
    );
  }

  private setEstimateSummaryDataForDisplay() {
    this.estimateSummaryDataForDisplay.push({
      title: 'Anticipated Earnings',
      data: this.netEarnings,
      dataType: VariableType.NUMBER,
    });
  }

  private async getComparativeData(): Promise<ComparativeData[]> {
    const comparativeCompanies: MarketDataTicker[] = [
      {
        exchange: 'Nasdaq',
        companyCode: 'AAPL',
      },
      {
        exchange: 'NYSE',
        companyCode: 'HPQ',
      },
      {
        exchange: 'NYSE',
        companyCode: 'DDD',
      },
      {
        exchange: 'Nasdaq',
        companyCode: 'ZBRA',
      },
      {
        exchange: 'Nasdaq',
        companyCode: 'FTNT',
      },
      {
        exchange: 'Nasdaq',
        companyCode: 'RDWR',
      },
      {
        exchange: 'Nasdaq',
        companyCode: 'LOGI',
      },
      {
        exchange: 'NYSE',
        companyCode: 'JNPR',
      },
      {
        exchange: 'Nasdaq',
        companyCode: 'SMCI',
      },
      {
        exchange: 'Nasdaq',
        companyCode: 'ISSC',
      },
      {
        exchange: 'Nasdaq',
        companyCode: 'NTAP',
      },
      {
        exchange: 'Nasdaq',
        companyCode: 'STX',
      },
    ];

    const comparativeMarketData: ComparativeData[] = [];
    for (let i = 0; i < comparativeCompanies.length; i++) {
      const comparativeData = await this.marketDataService.getComparativeData(
        comparativeCompanies[i]
      );
      comparativeMarketData.push(comparativeData);
    }
    return comparativeMarketData;
  }
}
