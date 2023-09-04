import { TrendlineType } from 'app/~global-enums/chart.enum';

export interface RegressionAnalysis {
  dataReceived: number[][];
  equationContants: RegressionEquationConstants;
  r2s: { linear: number; exponential: number; polynomial: number };
  suggestedTrendlineType: TrendlineType;
}

export interface RegressionEquationConstants {
  linear: {
    m: number;
    c: number;
  };
  exponential: {
    base: number;
    exp: number;
  };
  polynomial: {
    a2: number;
    a1: number;
    a0: number;
  };
}
