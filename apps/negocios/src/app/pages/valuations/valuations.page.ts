import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isEqual } from 'lodash';
import {
  ValuationsData,
  ValuationsBasicDetails,
  ValuationsFinancialHistory,
} from 'app/~global-interfaces/valuations.interface';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { ViewState } from './ViewState.enum';

@Component({
  selector: 'app-valuations',
  templateUrl: './valuations.page.html',
  styleUrls: ['./valuations.page.scss'],
})
export class ValuationsPage implements OnInit {
  sidebarMenu = ['Basic Details', 'Financial History'];
  isSavable: boolean | undefined;
  ViewState = ViewState;
  currentViewState = ViewState.BASIC_DETAIL;
  valuationID = '';

  orginalValuationData: ValuationsData = {
    title: '',
    basicDetails: {} as ValuationsBasicDetails,
    financialHistory: {} as ValuationsFinancialHistory,
  };
  updatedValuationData: ValuationsData = {
    title: '',
    basicDetails: {} as ValuationsBasicDetails,
    financialHistory: {} as ValuationsFinancialHistory,
  };

  constructor(private route: ActivatedRoute, private fb: FirebaseService) {}

  async ngOnInit(): Promise<void> {
    await this.getLastestFirebaseVersion();
  }

  // Page click callbacks ----------------------------
  onMenuOptionClicked(option: string) {
    switch (option) {
      case 'Basic Details': {
        this.currentViewState = ViewState.BASIC_DETAIL;
        break;
      }
      case 'Financial History': {
        this.currentViewState = ViewState.FINANCIAL_HISTORY;
        break;
      }
    }
  }

  async saveValuation() {
    await this.fb.saveValuation(this.valuationID, this.updatedValuationData);
    await this.getLastestFirebaseVersion();
  }

  async revertChanges() {
    await this.getLastestFirebaseVersion();
  }

  // Embedded components callbacks ----------------------------
  updateBasicDetails(updatedBasicDetails: ValuationsBasicDetails) {
    const cleanUpdatedBasicDetails = this.removeUndefineds(
      updatedBasicDetails
    ) as ValuationsBasicDetails;
    this.updatedValuationData.basicDetails = cleanUpdatedBasicDetails;
    if (
      isEqual(
        this.updatedValuationData.basicDetails,
        this.orginalValuationData.basicDetails
      )
    ) {
      this.isSavable = false;
    } else {
      this.isSavable = true;
    }
  }

  // Private functions ----------------------------
  private async getValuationDateFromFirebase() {
    this.valuationID = this.route.snapshot.paramMap.get('id') as string;
    let firebaseValuationData = await this.fb.getValuationByID(
      this.valuationID
    );
    for (let key in this.orginalValuationData) {
      if (firebaseValuationData[key]) {
        this.orginalValuationData[key as keyof ValuationsData] =
          this.updatedValuationData[key as keyof ValuationsData] =
            firebaseValuationData[key];
      }
    }
    this.orginalValuationData.basicDetails.valuationDate =
      this.covertJsontoDateFormat(
        this.orginalValuationData.basicDetails.valuationDate as unknown as {
          nanos: number;
          seconds: number;
        }
      );
  }

  private makeCopyOfValuationData() {
    this.updatedValuationData = JSON.parse(
      JSON.stringify(this.orginalValuationData)
    );
    this.updatedValuationData.basicDetails.valuationDate =
      this.orginalValuationData.basicDetails.valuationDate;
  }

  private covertJsontoDateFormat(timeObject: {
    nanos: number;
    seconds: number;
  }): Date {
    let requiredDate = new Date(Date.UTC(1970, 0, 1));
    requiredDate.setUTCSeconds(timeObject.seconds);
    return requiredDate;
  }

  private removeUndefineds(object: any) {
    Object.keys(object).forEach((key) =>
      object[key] === undefined ? delete object[key] : {}
    );
    return object;
  }

  async getLastestFirebaseVersion() {
    await this.getValuationDateFromFirebase();
    this.makeCopyOfValuationData();
    this.isSavable = false;
  }
}
