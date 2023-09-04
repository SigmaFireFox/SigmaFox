/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import {
  FrequencyChartData,
  FrequencyChartDescription,
} from 'apps/negocios/src/app/~global-interfaces/charts.interface';

import { VariableType } from '../../../../~global-interfaces/variables.enum';

@Component({
  selector: 'app-estimates-results-forecasts-screensection',
  templateUrl: './estimates-results-forecasts.screensection.html',
  styleUrls: ['./estimates-results-forecasts.screensection.scss'],
})
export class EstimatesResultsForecastsScreenSection {
  @Input() forecastDataForDisplay: FrequencyChartData[] = [];

  chartDescriptions: FrequencyChartDescription[] = [];
  variableType = VariableType;

  displayChartDescription(chartDescriptionData: FrequencyChartDescription) {
    this.chartDescriptions.push(chartDescriptionData);
  }
}
