/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ComparativeData,
  ComparativeDataStats,
} from 'apps/negocios/src/app/~global-interfaces/market-data.interface';
import { MarketDataService } from '../../../../services/market-data/market-data.service';

@Component({
  selector: 'app-estimate-results-comparatives-screensection',
  templateUrl: './estimate-results-comparatives.screensection.html',
  styleUrls: ['./estimate-results-comparatives.screensection.scss'],
})
export class EstimateResultsComparativesScreenSection implements OnInit {
  @Input() orginalComparativeData: ComparativeData[] = [];

  @Output() modifiedComparativeData = new EventEmitter<ComparativeData[]>();

  originalComparativeDataStats = {} as ComparativeDataStats;
  combinedComparativeData = [] as ComparativeData[];

  tableHeaders = [
    'Revenue',
    'Gross Profit',
    'Operating Profit',
    'Net Profit',
    'Market Cap',
  ];

  comparativeDataWithoutOutliers = [] as ComparativeData[];
  comparativeDataOutliers = [] as ComparativeData[];
  comparativeDataStatsWithoutOutliers = {} as ComparativeDataStats;
  combinedComparativeDataWithoutOutliers = [] as ComparativeData[];

  constructor(private marketDataService: MarketDataService) {}

  ngOnInit(): void {
    this.setComparativeDataStats();
    this.seperateComparativeDataOutliers();
  }

  private setComparativeDataStats() {
    this.originalComparativeDataStats =
      this.marketDataService.setComparativeDataStats(
        this.orginalComparativeData
      );
    this.mergeOrginalComparativeDataAndStats();
  }

  private mergeOrginalComparativeDataAndStats() {
    this.orginalComparativeData.forEach((item) => {
      this.combinedComparativeData.push(item);
    });
    this.combinedComparativeData.push({
      description: 'Break',
    } as ComparativeData);
    Object.values(this.originalComparativeDataStats).forEach((stat) => {
      this.combinedComparativeData.push(stat);
    });
    this.combinedComparativeData.push({
      description: 'Break',
    } as ComparativeData);
  }

  private seperateComparativeDataOutliers() {
    const splitComparativeData = this.marketDataService.getComparativeOutliers(
      this.orginalComparativeData,
      this.originalComparativeDataStats
    );
    this.comparativeDataWithoutOutliers =
      splitComparativeData.modifiedComparativeData;
    this.comparativeDataOutliers = splitComparativeData.outliers;
    this.comparativeDataStatsWithoutOutliers =
      this.marketDataService.setComparativeDataStats(
        this.comparativeDataWithoutOutliers
      );

    this.modifiedComparativeData.emit(this.comparativeDataWithoutOutliers);
    this.mergeModifiedComparativeDataAndStats();
  }

  private mergeModifiedComparativeDataAndStats() {
    this.comparativeDataWithoutOutliers.forEach((item) => {
      this.combinedComparativeDataWithoutOutliers.push(item);
    });
    this.combinedComparativeDataWithoutOutliers.push({
      description: 'Break',
    } as ComparativeData);
    Object.values(this.comparativeDataStatsWithoutOutliers).forEach((stat) => {
      this.combinedComparativeDataWithoutOutliers.push(stat);
    });
    this.combinedComparativeDataWithoutOutliers.push({
      description: 'Break',
    } as ComparativeData);
  }
}
