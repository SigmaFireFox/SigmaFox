import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import {
  ComparativeData,
  ComparativeDataStats,
  FMPFinancialStatement,
  FMPProfile,
  MarketDataTicker,
} from '../../~global-interfaces/market-data.interface';

@Injectable({
  providedIn: 'root',
})
export class MarketDataService {
  exchangeCode = '';
  entityCode = '';
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();
  constructor(private afs: AngularFirestore, private http: HttpClient) {}

  async getComparativeData(ticker: MarketDataTicker): Promise<ComparativeData> {
    this.exchangeCode = ticker.exchange;
    this.entityCode = ticker.companyCode;
    let comparativeData = {} as ComparativeData;
    let comparativeProfileData = {} as ComparativeData;
    let comparativeStatement = {} as ComparativeData;
    await this.getProfileData().then((profile) => {
      comparativeProfileData = profile;
    });
    await this.getFinancialStatements().then((statement) => {
      comparativeStatement = statement;
    });
    comparativeData = {
      ...comparativeProfileData,
      ...comparativeStatement,
    };
    return comparativeData;
  }

  private async getFinancialStatements(): Promise<ComparativeData> {
    let latestStatement = {} as ComparativeData;
    let doc: any = await this.afs
      .collection('market-financial-statements')
      .doc(this.exchangeCode + '-' + this.entityCode)
      .get()
      .toPromise();

    if (doc.exists) {
      this.areFinancialStatementsUpdated(doc.data())
        ? (latestStatement = this.getLastestStatements(doc.data()))
        : await this.getFinancialStatementsExternally().then((reponse) => {
            latestStatement = reponse;
          });
    } else {
      await this.getFinancialStatementsExternally().then((reponse) => {
        latestStatement = reponse;
      });
    }
    return latestStatement;
  }

  private areFinancialStatementsUpdated(statements: Object): boolean {
    if (Object.keys(statements).indexOf(this.currentYear.toString()) > 0) {
      return true;
    }
    if (
      Object.keys(statements).indexOf((this.currentYear - 1).toString()) > 0
    ) {
      return (
        this.currentMonth <
        +statements[(this.currentYear - 1).toString() as keyof Object][
          'date' as keyof Function
        ].substring(5, 7)
      );
    } else {
      return false;
    }
  }

  private async getFinancialStatementsExternally(): Promise<ComparativeData> {
    let latestStatements = {} as ComparativeData;
    const endpoint: string =
      'https://financialmodelingprep.com/api/v3/income-statement/' +
      this.entityCode +
      '?limit=120&apikey=21a28945b0887e94a5550c28d306e6ce';
    const statementData = await this.http.get(endpoint).toPromise();
    latestStatements = await this.writeExternalReturnedStatementToInternal(
      statementData as FMPFinancialStatement[]
    );
    return latestStatements;
  }

  private async writeExternalReturnedStatementToInternal(
    statementsToWrite: FMPFinancialStatement[]
  ): Promise<ComparativeData> {
    let lastestStatement = { statementYear: 0 } as ComparativeData;
    statementsToWrite.forEach(async (item) => {
      const year = +item.calendarYear;
      let condensedStatement: ComparativeData =
        this.mapFMPFinancialStatementToCondencedFinancialStatement(item);

      if (+year > +lastestStatement.statementYear) {
        lastestStatement = condensedStatement;
      }

      await this.afs
        .collection('market-financial-statements')
        .doc(this.exchangeCode + '-' + this.entityCode)
        .set({ [year]: item }, { merge: true });
    });
    return lastestStatement;
  }

  private mapFMPFinancialStatementToCondencedFinancialStatement(
    fmpObject: FMPFinancialStatement
  ): ComparativeData {
    let condensedObject = {} as ComparativeData;
    condensedObject.statementYear = +fmpObject.calendarYear;
    condensedObject.revenue = fmpObject.revenue;
    condensedObject.grossProfit = fmpObject.grossProfit;
    condensedObject.operatingProfit =
      fmpObject.ebitda - fmpObject.depreciationAndAmortization;
    condensedObject.netProfit = fmpObject.netIncome;
    return condensedObject;
  }

  private getLastestStatements(
    statements: FMPFinancialStatement[]
  ): ComparativeData {
    let lastestYear = 0;
    let lastestCondencedStatement = {} as ComparativeData;
    Object.keys(statements).forEach((year) => {
      if (+year > lastestYear) {
        lastestYear = +year;
      }
    });
    lastestCondencedStatement =
      this.mapFMPFinancialStatementToCondencedFinancialStatement(
        statements[lastestYear]
      );
    return lastestCondencedStatement;
  }

  private async getProfileData() {
    let latestProfile = {} as ComparativeData;
    let doc: any = await this.afs
      .collection('market-latest-profile-data')
      .doc(this.exchangeCode + '-' + this.entityCode)
      .get()
      .toPromise();

    if (doc.exists) {
      latestProfile = this.getInternalStoredProfile(doc.data());
    } else {
      await this.getProfileExternally().then((data) => {
        latestProfile = data;
      });
    }

    return latestProfile;
  }

  private async getProfileExternally(): Promise<ComparativeData> {
    let latestProfile = {} as ComparativeData;
    const endpoint: string =
      'https://financialmodelingprep.com/api/v3/profile/' +
      this.entityCode +
      '?apikey=21a28945b0887e94a5550c28d306e6ce';
    const profileData = await this.http.get(endpoint).toPromise();
    latestProfile = await this.writeExternalReturnedProfileToInternal(
      profileData as FMPProfile[]
    );

    return latestProfile;
  }

  private async writeExternalReturnedProfileToInternal(
    profileToWrite: FMPProfile[]
  ): Promise<ComparativeData> {
    const latestProfile = profileToWrite[0];
    let latestComparativeData = {} as ComparativeData;
    await this.afs
      .collection('market-latest-profile-data')
      .doc(this.exchangeCode + '-' + this.entityCode)
      .set(latestProfile, { merge: true });
    latestComparativeData.description = latestProfile.companyName;
    latestComparativeData.marketCap = latestProfile.mktCap;
    return latestComparativeData;
  }

  private getInternalStoredProfile(storedDoc: FMPProfile): ComparativeData {
    let profile = {} as ComparativeData;
    profile.description = storedDoc.companyName;
    profile.marketCap = storedDoc.mktCap;
    return profile;
  }

  setComparativeDataStats(
    comparativeData: ComparativeData[]
  ): ComparativeDataStats {
    let comparativeDataStats = {
      mean: {
        description: 'Mean (Average)',
        marketCap: 0,
        statementYear: 0,
        revenue: 0,
        grossProfit: 0,
        operatingProfit: 0,
        netProfit: 0,
      } as ComparativeData,
      standardDeviation: {
        description: 'Standard Deviation',
        marketCap: 0,
        statementYear: 0,
        revenue: 0,
        grossProfit: 0,
        operatingProfit: 0,
        netProfit: 0,
      } as ComparativeData,
    };

    comparativeData.forEach((item) => {
      comparativeDataStats.mean.revenue += item.revenue;
      comparativeDataStats.mean.grossProfit += item.grossProfit;
      comparativeDataStats.mean.operatingProfit += item.operatingProfit;
      comparativeDataStats.mean.netProfit += item.netProfit;
      comparativeDataStats.mean.marketCap += item.marketCap;
    });
    comparativeDataStats.mean.revenue /= comparativeData.length;
    comparativeDataStats.mean.grossProfit /= comparativeData.length;
    comparativeDataStats.mean.operatingProfit /= comparativeData.length;
    comparativeDataStats.mean.netProfit /= comparativeData.length;
    comparativeDataStats.mean.marketCap /= comparativeData.length;

    comparativeData.forEach((item) => {
      comparativeDataStats.standardDeviation.revenue += Math.abs(
        item.revenue - comparativeDataStats.mean.revenue
      );
      comparativeDataStats.standardDeviation.grossProfit += Math.abs(
        item.grossProfit - comparativeDataStats.mean.grossProfit
      );
      comparativeDataStats.standardDeviation.operatingProfit += Math.abs(
        item.operatingProfit - comparativeDataStats.mean.operatingProfit
      );
      comparativeDataStats.standardDeviation.netProfit += Math.abs(
        item.netProfit - comparativeDataStats.mean.netProfit
      );
      comparativeDataStats.standardDeviation.marketCap += Math.abs(
        item.marketCap - comparativeDataStats.mean.marketCap
      );
    });

    comparativeDataStats.standardDeviation.revenue /= comparativeData.length;
    comparativeDataStats.standardDeviation.grossProfit /=
      comparativeData.length;
    comparativeDataStats.standardDeviation.operatingProfit /=
      comparativeData.length;
    comparativeDataStats.standardDeviation.netProfit /= comparativeData.length;
    comparativeDataStats.standardDeviation.marketCap /= comparativeData.length;

    return comparativeDataStats;
  }

  comparativeDataContainsOutliers(
    comparativeDataStats: ComparativeDataStats
  ): boolean {
    let containsOutliers: boolean = false;
    Object.keys(comparativeDataStats.mean).forEach((key) => {
      if (key === 'description' || key === 'statementYear') return;
      if (
        comparativeDataStats.mean[key as keyof ComparativeData] <
        comparativeDataStats.standardDeviation[key as keyof ComparativeData]
      ) {
        containsOutliers = true;
      }
    });
    return containsOutliers;
  }

  getComparativeOutliers(
    orginalComparativeData: ComparativeData[],
    comparativeDataStats: ComparativeDataStats
  ): {
    outliers: ComparativeData[];
    modifiedComparativeData: ComparativeData[];
  } {
    let updatedcomparativeData = orginalComparativeData;
    let updatedComparativeStats = this.setComparativeDataStats(
      updatedcomparativeData
    );
    let outliersContained =
      this.comparativeDataContainsOutliers(comparativeDataStats);
    let comparativeOutliers = [] as ComparativeData[];
    do {
      const largestOutlierIndex = this.getIndexOfLargestOutlier(
        updatedcomparativeData,
        comparativeDataStats
      );
      comparativeOutliers.push(updatedcomparativeData[largestOutlierIndex]);
      updatedcomparativeData.splice(largestOutlierIndex, 1);
      updatedComparativeStats = this.setComparativeDataStats(
        updatedcomparativeData
      );
      outliersContained = this.comparativeDataContainsOutliers(
        updatedComparativeStats
      );
    } while (outliersContained);
    return {
      outliers: comparativeOutliers,
      modifiedComparativeData: updatedcomparativeData,
    };
  }

  private getIndexOfLargestOutlier(
    comparativeData: ComparativeData[],
    comparativeDataStats: ComparativeDataStats
  ): number {
    let highestStandardDeviation = 0;
    let indexOfComparativeToRemove = 0;
    comparativeData.forEach((comparative, index) => {
      Object.keys(comparative).forEach((key) => {
        if (key === 'description' || key === 'statementYear') return;
        const currentStandardDeviation =
          +comparative[key as keyof ComparativeData] /
          +comparativeDataStats.standardDeviation[key as keyof ComparativeData];
        if (currentStandardDeviation > highestStandardDeviation) {
          highestStandardDeviation = currentStandardDeviation;
          indexOfComparativeToRemove = index;
        }
      });
    });
    return indexOfComparativeToRemove;
  }
}
