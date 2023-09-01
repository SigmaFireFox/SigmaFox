/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { BasicAppInfoHandlerService } from '../../services/basic-app-info-handler.service';
import {
  resultIndex,
  seasonResultsObject,
} from '../../services/data-importer.service';
import { DbAnalyticsService } from '../../services/db-analytics.service';
import { PageMenuManagementService } from '../../services/page-menu-management.service';

export interface seasonResultsObjectID extends seasonResultsObject {
  id: string;
}

@Component({
  selector: 'app-data-analytics',
  templateUrl: './data-analytics.component.html',
  styleUrls: ['./data-analytics.component.css'],
})
export class DataAnalyticsComponent {
  analysisTriggered = false;
  results: Observable<seasonResultsObjectID[]> | undefined;
  constructor(
    private analytics: DbAnalyticsService,
    private basicInfo: BasicAppInfoHandlerService,
    private menuManagement: PageMenuManagementService,
    private db: AngularFirestore
  ) {}

  analyseDB() {
    this.analysisTriggered = true;
    this.results = this.analytics.indexDB();
  }

  async burnDB() {
    const qry: firebase.default.firestore.QuerySnapshot<unknown> = await this.db
      .collection('Results')
      .ref.get();
    qry.forEach((doc: { ref: { delete: () => void } }) => {
      doc.ref.delete();
    });
  }

  async displayMenuObject() {
    const menu: { [sport: string]: { [country: string]: any } } = {};
    const avaliableResults: resultIndex =
      await this.basicInfo.getAvaliableResults();
    for (const [sport, countriesOb] of Object.entries(avaliableResults)) {
      menu[sport] = countriesOb;
      for (const [country, leaguesOb] of Object.entries(countriesOb)) {
        menu[sport][country] = leaguesOb;
      }
    }
    console.log(menu);
  }
}
