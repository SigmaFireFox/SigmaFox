import { Component, Input, OnInit } from '@angular/core';
import { RegressionAnalysisService } from 'app/services/regression-analysis/regression-analysis.service';
import {
  FrequencyChartData,
  ScatterChartData,
} from 'app/~global-interfaces/charts.interface';
import {
  ComparativeData,
  ComparativeDataStats,
} from 'app/~global-interfaces/market-data.interface';
import { RegressionAnalysis } from 'app/~global-interfaces/regression-analysis.interface';

@Component({
  selector: 'app-estimate-results-regression-screensection',
  templateUrl: './estimate-results-regression.component.html',
  styleUrls: ['./estimate-results-regression.component.scss'],
})
export class EstimateResultsRegressionComponent implements OnInit {
  @Input() comparativeDataWithoutOutliers: ComparativeData[] = [];

  charts: ScatterChartData[] = [];

  constructor(private regressionAnalysis: RegressionAnalysisService) {}

  ngOnInit(): void {
    this.setChartData();
  }

  private setChartData() {
    this.charts.push(
      {
        title: 'Values relative to Revenues',
        hAxisTitle: 'Revenue',
        vAxisTitle: 'Value',
        data: this.setRevenueVsMarketCapChartData().data,
        trendlineType:
          this.setRevenueVsMarketCapChartData().regressionAnalysis
            .suggestedTrendlineType,
      },
      {
        title: 'Values relative to Gross Profits',
        hAxisTitle: 'Gross Profits',
        vAxisTitle: 'Value',
        data: this.setGrossProfitVsMarketCapChartData().data,
        trendlineType:
          this.setGrossProfitVsMarketCapChartData().regressionAnalysis
            .suggestedTrendlineType,
      },
      {
        title: 'Values relative to Operating Profits',
        hAxisTitle: 'Operating Profits',
        vAxisTitle: 'Value',
        data: this.setOperatingProfitVsMarketCapChartData().data,
        trendlineType:
          this.setOperatingProfitVsMarketCapChartData().regressionAnalysis
            .suggestedTrendlineType,
      },
      {
        title: 'Values relative to Net Profits',
        hAxisTitle: 'Net Profits',
        vAxisTitle: 'Value',
        data: this.setNetProfitVsMarketCapChartData().data,
        trendlineType:
          this.setNetProfitVsMarketCapChartData().regressionAnalysis
            .suggestedTrendlineType,
      }
    );
  }

  private setRevenueVsMarketCapChartData(): {
    data: number[][];
    regressionAnalysis: RegressionAnalysis;
  } {
    let chartData = {} as {
      data: number[][];
      regressionAnalysis: RegressionAnalysis;
    };

    chartData.data = [];
    this.comparativeDataWithoutOutliers.forEach((entity) => {
      chartData.data.push([
        entity.revenue / 1000000,
        entity.marketCap / 1000000,
      ]);
    });
    chartData.regressionAnalysis =
      this.regressionAnalysis.getRegressionAnalysis(chartData.data);

    return chartData;
  }

  private setGrossProfitVsMarketCapChartData(): {
    data: number[][];
    regressionAnalysis: RegressionAnalysis;
  } {
    let chartData = {} as {
      data: number[][];
      regressionAnalysis: RegressionAnalysis;
    };

    chartData.data = [];
    this.comparativeDataWithoutOutliers.forEach((entity) => {
      chartData.data.push([
        entity.grossProfit / 100000,
        entity.marketCap / 100000,
      ]);
    });
    chartData.regressionAnalysis =
      this.regressionAnalysis.getRegressionAnalysis(chartData.data);

    return chartData;
  }

  private setOperatingProfitVsMarketCapChartData(): {
    data: number[][];
    regressionAnalysis: RegressionAnalysis;
  } {
    let chartData = {} as {
      data: number[][];
      regressionAnalysis: RegressionAnalysis;
    };

    chartData.data = [];
    this.comparativeDataWithoutOutliers.forEach((entity) => {
      chartData.data.push([
        entity.operatingProfit / 100000,
        entity.marketCap / 100000,
      ]);
    });
    chartData.regressionAnalysis =
      this.regressionAnalysis.getRegressionAnalysis(chartData.data);

    return chartData;
  }

  private setNetProfitVsMarketCapChartData(): {
    data: number[][];
    regressionAnalysis: RegressionAnalysis;
  } {
    let chartData = {} as {
      data: number[][];
      regressionAnalysis: RegressionAnalysis;
    };

    chartData.data = [];
    this.comparativeDataWithoutOutliers.forEach((entity) => {
      chartData.data.push([
        entity.netProfit / 100000,
        entity.marketCap / 100000,
      ]);
    });
    chartData.regressionAnalysis =
      this.regressionAnalysis.getRegressionAnalysis(chartData.data);

    return chartData;
  }
}
