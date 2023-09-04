import { Component, Input, OnInit } from '@angular/core';
import {
  FrequencyChartData,
  FrequencyChartDescription,
} from 'app/~global-interfaces/charts.interface';
import { VariableType } from '../../../../~global-interfaces/variables.enum';

@Component({
  selector: 'app-estimates-results-forecasts-screensection',
  templateUrl: './estimates-results-forecasts.screensection.html',
  styleUrls: ['./estimates-results-forecasts.screensection.scss'],
})
export class EstimatesResultsForecastsScreenSection implements OnInit {
  @Input() forecastDataForDisplay: FrequencyChartData[] = [];

  chartDescriptions: FrequencyChartDescription[] = [];
  variableType = VariableType;

  constructor() {}

  ngOnInit(): void {}

  displayChartDescription(chartDescriptionData: FrequencyChartDescription) {
    this.chartDescriptions.push(chartDescriptionData);
  }
}
