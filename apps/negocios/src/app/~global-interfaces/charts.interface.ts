import { AppChartType, TrendlineType } from '../~global-enums/chart.enum';
import { VariableType } from './variables.enum';

export interface FrequencyChartData {
  title: string;
  data: number[];
  dataType: VariableType;
}

export interface FrequencyChartDescription {
  appChartType: AppChartType;
  dataType: VariableType;
  firstSD: FrequencyData;
  secondSD: FrequencyData;
}

export interface FrequencyData {
  upperBound: number;
  lowerBound: number;
  probailty: number;
}

export interface ScatterChartData {
  title: string;
  data: number[][];
  hAxisTitle: string;
  vAxisTitle: string;
  trendlineType: TrendlineType;
}
