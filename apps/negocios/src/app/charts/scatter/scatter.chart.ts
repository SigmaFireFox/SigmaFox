import { Component, Input, OnInit } from '@angular/core';
import { ChartType, TrendlineType } from '../../~global-enums/chart.enum';
import { ScatterChartData } from '../../~global-interfaces/charts.interface';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter.chart.html',
  styleUrls: ['./scatter.chart.scss'],
})
export class ScatterChart implements OnInit {
  @Input() chartConfig = {} as ScatterChartData;

  chartType = ChartType.ScatterChart;
  chartTitle: string = '';
  chartData: number[][] = [];
  chartOptions = {
    width: 450,
    height: 240,
    hAxis: { title: '' },
    vAxis: { title: '' },
    crosshair: { trigger: 'both', orientation: 'both' },
    chartArea: { width: '50%' },
    trendlines: {
      0: {
        type: 'linear',
        degree: 2,
        // showR2: true,
        // visibleInLegend: true,
      },
    },
    legend: { position: 'none' },
  };

  ngOnInit() {
    this.chartTitle = this.chartConfig.title;
    this.chartData = this.chartConfig.data;
    this.chartOptions.hAxis.title = this.chartConfig.hAxisTitle;
    this.chartOptions.vAxis.title = this.chartConfig.vAxisTitle;
    this.setChartTrendline();
  }

  private setChartTrendline() {
    switch (this.chartConfig.trendlineType) {
      case TrendlineType.LINEAR: {
        this.chartOptions.trendlines[0].type = 'linear';
        return;
      }
      case TrendlineType.EXPONENTIAL: {
        this.chartOptions.trendlines[0].type = 'exponential';
        return;
      }
      case TrendlineType.POLYNOMIAL: {
        this.chartOptions.trendlines[0].type = 'polynomial';
        return;
      }
    }
  }
}
