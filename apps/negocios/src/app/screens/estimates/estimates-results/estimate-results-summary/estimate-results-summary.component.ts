/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import {
  FrequencyChartData,
  FrequencyChartDescription,
} from 'apps/negocios/src/app/~global-interfaces/charts.interface';

import { VariableType } from '../../../../~global-interfaces/variables.enum';

@Component({
  selector: 'app-estimate-results-summary-screensection',
  templateUrl: './estimate-results-summary.component.html',
  styleUrls: ['./estimate-results-summary.component.scss'],
})
export class EstimateResultsSummaryComponent {
  @Input() estimateSummaryDataForDisplay: FrequencyChartData[] = [];

  chartDescriptions: FrequencyChartDescription[] = [];
  variableType = VariableType;

  displayChartDescription(chartDescriptionData: FrequencyChartDescription) {
    this.chartDescriptions.push(chartDescriptionData);
  }
}
