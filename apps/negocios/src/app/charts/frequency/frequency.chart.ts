import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppChartType, ChartType } from '../../~global-enums/chart.enum';
import {
  FrequencyChartData,
  FrequencyChartDescription,
} from '../../~global-interfaces/charts.interface';
import { VariableType } from '../../~global-interfaces/variables.enum';

@Component({
  selector: 'app-frequency-chart',
  templateUrl: './frequency.chart.html',
  styleUrls: ['./frequency.chart.scss'],
})
export class FrequencyChart implements OnInit {
  @Input() rawChartData = {} as FrequencyChartData;

  @Output() chartDescription = new EventEmitter<FrequencyChartDescription>();

  // Public variables for chart display
  chartType: ChartType = ChartType.LineChart;
  chartData: any[] = [];
  chartColumns = ['Range', 'Frequency %'];
  chartTitle = '';
  chartOptions = {
    width: 300,
    height: 240,
    curveType: 'function',
    legend: 'none',
  };

  // Private variables for calculations
  private numberOfBuckets = 5;
  private minValue: number = 0;
  private maxValue: number = 0;
  private bucketSize: number = 0;
  private frequency: number[] = [];
  private buckets: number[][] = [];

  constructor() {}

  ngOnInit(): void {
    this.setChartParameters();
    this.setChartBuckets();
    this.getFrequencyCount();
    this.setChartDataObject();
    this.returnChartDesciption();
  }

  private setChartParameters() {
    this.minValue = Math.min(...this.rawChartData.data);
    this.maxValue = Math.max(...this.rawChartData.data);
    this.bucketSize = +(
      (this.maxValue - this.minValue) /
      this.numberOfBuckets
    ).toFixed(2);
  }

  private setChartBuckets() {
    for (
      let bucketNumber = 0;
      bucketNumber < this.numberOfBuckets;
      bucketNumber++
    ) {
      this.buckets.push([
        +(this.minValue + bucketNumber * this.bucketSize).toFixed(2),
        +(this.minValue + (bucketNumber + 1) * this.bucketSize).toFixed(2),
      ]);
      this.frequency.push(0);
    }
  }

  private getFrequencyCount() {
    this.rawChartData.data.forEach((forecastedValue) => {
      this.buckets.forEach((bucket, index) => {
        if (forecastedValue >= bucket[0] && forecastedValue < bucket[1]) {
          this.frequency[index]++;
        }
      });
    });
  }

  private setChartDataObject() {
    this.buckets.forEach((bucket, index) => {
      const frequency: number =
        +this.frequency[index] / +this.rawChartData.data.length;
      let label = '';
      switch (this.rawChartData.dataType) {
        case VariableType.NUMBER: {
          label = ((+bucket[0] + +bucket[1]) / 2).toFixed(0);
          break;
        }
        case VariableType.MARGIN: {
          label = ((+bucket[0] + +bucket[1]) / 2).toFixed(2) + '%';
          break;
        }
      }
      this.chartData.push([label, frequency]);
    });
  }

  private returnChartDesciption() {
    let midBucketLowerBoundery = this.buckets[2][0];
    let midBucketUpperBoundery = this.buckets[2][1];
    let probabilty = (this.chartData[2][1] * 100).toFixed(2);

    this.chartDescription.emit({
      appChartType: AppChartType.FREQUENCY,
      dataType: this.rawChartData.dataType,
      firstSD: {
        lowerBound: this.buckets[2][0],
        upperBound: this.buckets[2][1],
        probailty: +(this.chartData[2][1] * 100).toFixed(2),
      },
      secondSD: {
        lowerBound: this.buckets[1][0],
        upperBound: this.buckets[3][1],
        probailty: +(
          (this.chartData[1][1] + this.chartData[2][1] + this.chartData[3][1]) *
          100
        ).toFixed(2),
      },
    });
  }
}
