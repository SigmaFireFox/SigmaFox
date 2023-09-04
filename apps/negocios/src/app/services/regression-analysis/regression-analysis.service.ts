import { Injectable } from '@angular/core';
import { TrendlineType } from '../../~global-enums/chart.enum';
import { TrendlineData } from '../../~global-interfaces/market-data.interface';
import * as regression from 'regression';
import {
  RegressionAnalysis,
  RegressionEquationConstants,
} from 'app/~global-interfaces/regression-analysis.interface';
import { eq } from 'lodash';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root',
})
export class RegressionAnalysisService {
  constructor() {}

  getRegressionAnalysis(data: number[][]): RegressionAnalysis {
    const regressionEquationConstants = {
      linear: this.getRegressionEquationConstantsLinear(data),
      exponential: this.getRegressionEquationConstantsExponential(data),
      polynomial: this.getRegressionEquationConstantsPolynomial2ndOrder(data),
    } as RegressionEquationConstants;

    const r2s = this.setR2s(data, regressionEquationConstants);

    const optimalTrendLine = this.determineOptimalTrendlineType(r2s);

    return {
      dataReceived: data,
      r2s: r2s,
      equationContants: regressionEquationConstants,
      suggestedTrendlineType: optimalTrendLine,
    };
  }

  private getRegressionEquationConstantsLinear(
    data: number[][],
    precision?: number
  ): {
    m: number;
    c: number;
  } {
    if (!precision) {
      precision = 10;
    }

    let meanX = 0;
    let meanY = 0;
    data.forEach((dataPoint) => {
      meanX += dataPoint[0];
      meanY += dataPoint[1];
    });
    meanX /= data.length;
    meanY /= data.length;

    let squareOfDifferanceX = 0;
    let squareOfDifferanceY = 0;
    let squareOfDifferanceXY = 0;
    data.forEach((dataPoint) => {
      squareOfDifferanceX += Math.pow(dataPoint[0] - meanX, 2);
      squareOfDifferanceY += Math.pow(dataPoint[1] - meanY, 2);
      squareOfDifferanceXY += (dataPoint[0] - meanX) * (dataPoint[1] - meanY);
    });

    const pearsonCorrelationCoefficient =
      squareOfDifferanceXY /
      Math.sqrt(squareOfDifferanceX * squareOfDifferanceY);
    const standardDeviationX = Math.sqrt(
      squareOfDifferanceX / (data.length - 1)
    );
    const standardDeviationY = Math.sqrt(
      squareOfDifferanceY / (data.length - 1)
    );

    const gradient =
      (pearsonCorrelationCoefficient * standardDeviationY) / standardDeviationX;

    return {
      m:
        Math.round(gradient * Math.pow(10, precision)) /
        Math.pow(10, precision),
      c:
        Math.round((meanY - gradient * meanX) * Math.pow(10, precision)) /
        Math.pow(10, precision),
    };
  }

  private getRegressionEquationConstantsExponential(
    data: number[][],
    precision?: number
  ): {
    base: number;
    exp: number;
  } {
    if (!precision) {
      precision = 10;
    }

    let sumOfX = 0;
    let sumOfZ = 0;
    let sumOfXZ = 0;
    let sumOfX2 = 0;

    data.forEach((dataPoint) => {
      sumOfX += dataPoint[0];
      sumOfZ += Math.log(dataPoint[1]);
      sumOfXZ += dataPoint[0] * Math.log(dataPoint[1]);
      sumOfX2 += dataPoint[0] * dataPoint[0];
    });

    const a1 =
      (data.length * sumOfXZ - sumOfX * sumOfZ) /
      (data.length * sumOfX2 - sumOfX * sumOfX);
    const A = Math.exp(sumOfZ / data.length - (a1 * sumOfX) / data.length);

    return {
      base: Math.round(A * Math.pow(10, precision)) / Math.pow(10, precision),
      exp: Math.round(a1 * Math.pow(10, precision)) / Math.pow(10, precision),
    };
  }

  private getRegressionEquationConstantsPolynomial2ndOrder(
    data: number[][],
    precision?: number
  ): {
    a2: number;
    a1: number;
    a0: number;
  } {
    let ETi0 = data.length;
    let ETi1 = 0;
    let ETi2 = 0;
    let ETi3 = 0;
    let ETi4 = 0;

    let sumX = 0;
    let sumXbyY = 0;
    let sumXbyY2 = 0;

    data.forEach((dataPoint) => {
      ETi1 += Math.pow(dataPoint[0], 1);
      ETi2 += Math.pow(dataPoint[0], 2);
      ETi3 += Math.pow(dataPoint[0], 3);
      ETi4 += Math.pow(dataPoint[0], 4);
      sumX += dataPoint[1];
      sumXbyY += dataPoint[0] * dataPoint[1];
      sumXbyY2 += Math.pow(dataPoint[0], 2) * dataPoint[1];
    });

    let matrix1 = [
      [ETi0, ETi1, ETi2, sumX],
      [ETi1, ETi2, ETi3, sumXbyY],
      [ETi2, ETi3, ETi4, sumXbyY2],
    ];

    let matrix2 = [[] as number[], [] as number[], [] as number[]];

    const A2EliminationFactor = -matrix1[1][0] / matrix1[0][0];
    const A3EliminationFactor = -matrix1[2][0] / matrix1[0][0];

    matrix1[0].forEach((value, index) => {
      matrix2[0].push(matrix1[0][index]);
    });
    matrix1[1].forEach((value, index) => {
      matrix2[1].push(
        A2EliminationFactor * matrix1[0][index] + matrix1[1][index]
      );
    });
    matrix1[2].forEach((value, index) => {
      matrix2[2].push(
        A3EliminationFactor * matrix1[0][index] + matrix1[2][index]
      );
    });

    let matrix3 = [[] as number[], [] as number[], [] as number[]];

    const B3EliminationFactor = -matrix2[2][1] / matrix2[1][1];

    matrix2[0].forEach((value, index) => {
      matrix3[0].push(matrix2[0][index]);
    });
    matrix2[1].forEach((value, index) => {
      matrix3[1].push(matrix2[1][index]);
    });
    matrix2[2].forEach((value, index) => {
      matrix3[2].push(
        B3EliminationFactor * matrix2[1][index] + matrix2[2][index]
      );
    });

    const a2 = matrix3[2][3] / matrix3[2][2];
    const a1 = (matrix3[1][3] - matrix3[1][2] * a2) / matrix3[1][1];
    const a0 =
      (matrix3[0][3] - matrix3[0][1] * a1 - matrix3[0][2] * a2) / matrix3[0][0];

    return {
      a2: a2,
      a1: a1,
      a0: a0,
    };
  }

  private setR2s(
    data: number[][],
    equationContants: RegressionEquationConstants
  ): { linear: number; exponential: number; polynomial: number } {
    let r2s = { linear: 0, exponential: 0, polynomial: 0 };
    Object.keys(equationContants).forEach((equation) => {
      switch (equation) {
        case 'linear' as keyof RegressionEquationConstants: {
          r2s.linear = this.getR2Linear(data, equationContants.linear);
          break;
        }
        case 'exponential' as keyof RegressionEquationConstants: {
          r2s.exponential = this.getR2Exponential(data);
          break;
        }
        case 'polynomial' as keyof RegressionEquationConstants: {
          r2s.polynomial = this.getR2Polynomial(
            data,
            equationContants.polynomial
          );
          break;
        }
      }
    });
    return r2s;
  }

  private getR2Linear(
    data: number[][],
    equationConstants: {
      m: number;
      c: number;
    }
  ): number {
    let meanY = 0;
    data.forEach((dataPoint) => {
      meanY += dataPoint[1];
    });
    meanY /= data.length;

    let sumOfYDiffernceSquared = 0;
    data.forEach((dataPoint) => {
      sumOfYDiffernceSquared += Math.pow(dataPoint[1] - meanY, 2);
    });

    let sumOfActualVsPredictedYsSquard = 0;
    data.forEach((dataPoint) => {
      const predictedY =
        equationConstants.m * dataPoint[0] + equationConstants.c;
      sumOfActualVsPredictedYsSquard += Math.pow(predictedY - meanY, 2);
    });

    return sumOfActualVsPredictedYsSquard / sumOfYDiffernceSquared;
  }

  private getR2Exponential(data: number[][]): number {
    let transformedData: number[][] = [];
    data.forEach((item) => {
      const logX = item[0];
      const logY = Math.log(item[1]);
      transformedData.push([logX, logY]);
    });

    const transformedDataEquationContants =
      this.getRegressionEquationConstantsLinear(transformedData);
    return this.getR2Linear(transformedData, transformedDataEquationContants);
  }

  private getR2Polynomial(
    data: number[][],
    equationConstants: {
      a2: number;
      a1: number;
      a0: number;
    }
  ): number {
    let meanY = 0;
    data.forEach((value) => {
      meanY += value[1];
    });
    meanY /= data.length;

    let sumOfDiffernceOfActualVsPredictedYsSquared = 0;
    data.forEach((dataPoint) => {
      const predictedY =
        equationConstants.a2 * Math.pow(dataPoint[0], 2) +
        equationConstants.a1 * dataPoint[0] +
        equationConstants.a0;

      sumOfDiffernceOfActualVsPredictedYsSquared += Math.pow(
        dataPoint[1] - predictedY,
        2
      );
    });

    let sumOfDiffernceOfActualVsMeanYsSquared = 0;
    data.forEach((dataPoint) => {
      sumOfDiffernceOfActualVsMeanYsSquared += Math.pow(
        dataPoint[1] - meanY,
        2
      );
    });

    const r = Math.sqrt(
      1 -
        sumOfDiffernceOfActualVsPredictedYsSquared /
          sumOfDiffernceOfActualVsMeanYsSquared
    );

    return Math.pow(r, 2);
  }

  private getSpearmanCorrelation(data: number[][]): number {
    let dataXs: number[] = [];
    let dataYs: number[] = [];
    data.forEach((dataPoint) => {
      dataXs.push(dataPoint[0]);
      dataYs.push(dataPoint[1]);
    });

    var sortedXs = dataXs.slice().sort(function (a, b) {
      return b - a;
    });
    var xRanks = dataXs.map(function (v) {
      return sortedXs.indexOf(v) + 1;
    });

    var sortedYs = dataYs.slice().sort(function (a, b) {
      return b - a;
    });
    var yRanks = dataYs.map(function (v) {
      return sortedYs.indexOf(v) + 1;
    });

    let sumOfDifferenceSquared = 0;
    xRanks.forEach((value, index) => {
      sumOfDifferenceSquared += Math.pow(value - yRanks[index], 2);
    });

    const spearmansR =
      1 -
      (sumOfDifferenceSquared * 6) / (Math.pow(data.length, 3) - data.length);
    return spearmansR;
  }

  private getCoefficientOfDetermination(data: number[][]): number {
    let meanX = 0;
    let meanY = 0;
    data.forEach((dataPoint) => {
      meanX += dataPoint[0];
      meanY += dataPoint[1];
    });
    meanX /= data.length;
    meanY /= data.length;

    let sumOfXdifferenceByYdifference = 0;
    let sumOfXdifferenceSquared = 0;
    let sumOfYdifferenceSquared = 0;

    data.forEach((value) => {
      sumOfXdifferenceByYdifference += (value[0] - meanX) * (value[1] - meanY);
      sumOfXdifferenceSquared += Math.pow(value[0] - meanX, 2);
      sumOfYdifferenceSquared += Math.pow(value[1] - meanY, 2);
    });

    const r =
      sumOfXdifferenceByYdifference /
      Math.sqrt(sumOfXdifferenceSquared * sumOfYdifferenceSquared);

    return Math.pow(r, 2);
  }

  private determineOptimalTrendlineType(r2s: {
    linear: number;
    exponential: number;
    polynomial: number;
  }): TrendlineType {
    if (r2s.linear > r2s.exponential) {
      if (r2s.linear > r2s.polynomial) {
        return TrendlineType.LINEAR;
      } else {
        return TrendlineType.POLYNOMIAL;
      }
    } else {
      if (r2s.exponential > r2s.polynomial) {
        return TrendlineType.EXPONENTIAL;
      } else {
        return TrendlineType.POLYNOMIAL;
      }
    }
  }
}
