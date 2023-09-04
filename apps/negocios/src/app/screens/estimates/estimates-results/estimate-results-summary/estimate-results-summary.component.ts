import { Component, Input, OnInit } from '@angular/core';
import {
  FrequencyChartData,
  FrequencyChartDescription,
} from 'app/~global-interfaces/charts.interface';
import { VariableType } from '../../../../~global-interfaces/variables.enum';

@Component({
  selector: 'app-estimate-results-summary-screensection',
  templateUrl: './estimate-results-summary.component.html',
  styleUrls: ['./estimate-results-summary.component.scss'],
})
export class EstimateResultsSummaryComponent implements OnInit {
  @Input() estimateSummaryDataForDisplay: FrequencyChartData[] = [];

  chartDescriptions: FrequencyChartDescription[] = [];
  variableType = VariableType;

  constructor() {}

  ngOnInit(): void {}

  displayChartDescription(chartDescriptionData: FrequencyChartDescription) {
    this.chartDescriptions.push(chartDescriptionData);
  }
}
