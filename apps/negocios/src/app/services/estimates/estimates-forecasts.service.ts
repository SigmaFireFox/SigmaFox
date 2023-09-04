import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EstimatesCashFlowYear } from '../../../app/~global-interfaces/estimates-cashflows.interface';
import { EstimatesFinancialHistory } from '../../../app/~global-interfaces/estimates-financial-history.interface';
import { ForecastVariableData } from '../../../app/~global-interfaces/estimates-forecasts.interface';
import { VariableType } from '../../../app/~global-interfaces/variables.enum';

export interface ForecastParameter {
  startPoint: number;
  cv: number;
}

@Injectable({
  providedIn: 'root',
})
export class EstimatesForecastsService {
  results: any = null;
  $estimateResults = new BehaviorSubject(this.results);
  financialHistory: EstimatesFinancialHistory[] = [];
  cashFlows: EstimatesCashFlowYear[] = [];
  variableData: ForecastVariableData = {
    revenue: [],
    costOfSalesPerc: [],
    operatingExpensesPerc: [],
    ppeRevenueMutliple: [],
    depreciationPPEPerc: [],
    otherIncome: [],
    interestIncome: [],
    interestExpense: [],
    taxRate: [],
  } as ForecastVariableData;
  forecastedData: ForecastVariableData = {
    revenue: [],
    costOfSalesPerc: [],
    operatingExpensesPerc: [],
    ppeRevenueMutliple: [],
    depreciationPPEPerc: [],
    otherIncome: [],
    interestIncome: [],
    interestExpense: [],
    taxRate: [],
  } as ForecastVariableData;
  mininumNumberOfForecasts = 256;

  constructor() {}

  prepareForecasts(
    financialHistory: EstimatesFinancialHistory[],
    cashFlows: EstimatesCashFlowYear[]
  ) {
    this.financialHistory = financialHistory;
    this.cashFlows = cashFlows;
    this.forecastForwardEarnings();
    return this.forecastedData;
  }

  private forecastForwardEarnings() {
    this.setForecastVariableData();
    this.getForecasts();
  }

  private setForecastVariableData() {
    this.financialHistory.forEach((yearFinancialData) => {
      Object.keys(this.variableData).forEach((key) => {
        switch (key) {
          case 'costOfSalesPerc' as keyof ForecastVariableData: {
            this.variableData[key as keyof ForecastVariableData].push(
              +yearFinancialData.costOfSales / yearFinancialData.revenue
            );
            break;
          }
          case 'operatingExpensesPerc' as keyof ForecastVariableData: {
            this.variableData[key as keyof ForecastVariableData].push(
              +yearFinancialData.operatingExpenses / yearFinancialData.revenue
            );
            break;
          }
          case 'ppeRevenueMutliple' as keyof ForecastVariableData: {
            this.variableData[key as keyof ForecastVariableData].push(
              yearFinancialData.ncaPPE / yearFinancialData.revenue
            );
            break;
          }
          case 'depreciationPPEPerc' as keyof ForecastVariableData: {
            this.variableData[key as keyof ForecastVariableData].push(
              yearFinancialData.depreciation / yearFinancialData.ncaPPE
            );
            break;
          }
          case 'taxRate' as keyof ForecastVariableData: {
            this.variableData[key as keyof ForecastVariableData].push(
              +yearFinancialData.taxExpense /
                (yearFinancialData.revenue +
                  yearFinancialData.costOfSales +
                  yearFinancialData.operatingExpenses +
                  yearFinancialData.depreciation +
                  yearFinancialData.otherIncome +
                  yearFinancialData.interestIncome +
                  yearFinancialData.interestExpense)
            );
            break;
          }
          default: {
            this.variableData[key as keyof ForecastVariableData].push(
              yearFinancialData[key as keyof EstimatesFinancialHistory]
            );
          }
        }
      });
    });
  }

  private getForecasts() {
    Object.keys(this.forecastedData).forEach((key) => {
      const numberFormattedKeys = [
        'revenue',
        'ppeRevenueMutliple',
        'otherIncome',
        'interestIncome',
        'interestExpense',
      ];
      let numberFormat: VariableType | undefined;
      numberFormattedKeys.includes(key)
        ? (numberFormat = VariableType.NUMBER)
        : key === 'taxRate'
        ? (numberFormat = VariableType.TAX)
        : (numberFormat = VariableType.MARGIN);

      numberFormat === VariableType.TAX
        ? (this.forecastedData[key as keyof ForecastVariableData] =
            this.forecastStraightLine(
              this.variableData[key as keyof ForecastVariableData],
              VariableType.MARGIN
            ))
        : (this.forecastedData[key as keyof ForecastVariableData] =
            this.forecast(
              this.variableData[key as keyof ForecastVariableData],
              numberFormat
            ));
    });
  }

  private forecast(arrayToForecast: number[], type: VariableType): number[] {
    let forecasts: number[] = [];
    const forecastParameters = this.setForecastParameters(arrayToForecast);
    for (let i = 0; i < this.mininumNumberOfForecasts; i++) {
      forecasts.push(this.createProjection(forecastParameters, type));
    }
    return forecasts;
  }

  private forecastStraightLine(
    arrayToForecast: number[],
    type: VariableType
  ): number[] {
    let forecasts: number[] = [];
    const arrayMean =
      arrayToForecast.reduce((a, b) => a + b) / arrayToForecast.length;
    const arrayStdDeviation = Math.sqrt(
      arrayToForecast
        .map((x) => Math.pow(x - arrayMean, 2))
        .reduce((a, b) => a + b) / arrayToForecast.length
    );
    for (let i = 0; i < this.mininumNumberOfForecasts; i++) {
      forecasts.push(
        this.createProjection(
          {
            startPoint: arrayMean,
            cv: (arrayStdDeviation / arrayMean) * 3,
          } as ForecastParameter,
          type
        )
      );
    }
    return forecasts;
  }

  private setForecastParameters(array: number[]): ForecastParameter {
    let forecastParameters = {
      startPoint: 0,
      cv: 0,
    };
    switch (array.length) {
      case 1: {
        forecastParameters.startPoint = array[0];
        forecastParameters.cv = 1;
        break;
      }
      case 2: {
        forecastParameters.startPoint = array[1] * 2 - array[0];
        const arrayMean = array.reduce((a, b) => a + b) / array.length;
        const arrayStdDeviation = Math.sqrt(
          array.map((x) => Math.pow(x - arrayMean, 2)).reduce((a, b) => a + b) /
            array.length
        );
        forecastParameters.cv = (arrayStdDeviation / arrayMean) * 3;
        break;
      }
      default: {
        break;
      }
    }
    return forecastParameters;
  }

  private createProjection(
    forecastParameters: ForecastParameter,
    type: VariableType
  ): number {
    let projectedNumber = 0;
    let distanceToStartPoint =
      forecastParameters.cv - Math.random() * forecastParameters.cv * 2;
    distanceToStartPoint < 0
      ? (distanceToStartPoint = Math.pow(distanceToStartPoint, 2) * -1)
      : (distanceToStartPoint = Math.pow(distanceToStartPoint, 2));

    projectedNumber = +(
      forecastParameters.startPoint *
      (1 + distanceToStartPoint)
    );
    type === VariableType.MARGIN
      ? (projectedNumber = projectedNumber * 100)
      : null;

    projectedNumber = +projectedNumber.toFixed(2);
    return projectedNumber;
  }
}
