/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ValuationsData } from '../../~global-interfaces/valuations.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private afs: AngularFirestore, private router: Router) {}

  async getOrSetClientValuationList(userID: string): Promise<string[]> {
    let valuationList: string[] = [];
    const doc: any = await this.getClientValuationList(userID);
    if (doc.exists) {
      for (const [key, value] of Object.entries(doc.data())) {
        if (key === 'valuations') {
          valuationList = value as string[];
        } else {
          // FIXME: This should be a addClientValuationList()
          this.setClientValuationList(userID);
          valuationList = [] as string[];
        }
      }
    } else {
      this.setClientValuationList(userID);
      valuationList = [] as string[];
    }
    return valuationList;
  }

  async getValuationByID(valuationID: string) {
    let valuation: any;
    const doc: any = await this.afs
      .collection('valuations')
      .doc(valuationID)
      .get()
      .toPromise();
    if (doc.exists) {
      valuation = doc.data();
    } else {
      valuation = { title: 'Valuation not found' } as any;
    }
    return valuation;
  }

  async addNewValuationByUserID(userID: string, valuationTitle: string) {
    const newValuation = await this.afs.collection('valuations').add({
      title: valuationTitle,
    });

    const doc: any = await this.getClientValuationList(userID);
    if (doc.exists) {
      for (const [key, value] of Object.entries(doc.data())) {
        if (key === 'valuations') {
          const valuationsList = value as any;
          valuationsList.push({
            id: newValuation.id,
            title: valuationTitle,
          });
          this.afs
            .collection('client-valuations-lists')
            .doc(userID)
            .set({ valuations: valuationsList }, { merge: true });
        }
      }
    }

    this.router.navigate(['/valuations/', { id: newValuation.id }]);
  }

  async viewValuation(valuationID: string) {
    this.router.navigate(['/valuations/', { id: valuationID }]);
  }

  async deleteValuation(userID: string, valuationID: string) {
    let valuationsList: any[] = [];
    const doc: any = await this.getClientValuationList(userID);
    if (doc.exists) {
      for (const [key, value] of Object.entries(doc.data())) {
        if (key === 'valuations') {
          valuationsList = value as any;
        }
      }
    }
    valuationsList.forEach((valuation, index) => {
      if (valuation.id === valuationID) valuationsList.splice(index, 1);
    });
    const userRef = await this.afs
      .collection('client-valuations-lists')
      .doc(userID);
    await userRef.set({ valuations: valuationsList }, { merge: true });
    this.afs.collection('valuations').doc(valuationID).delete();
  }

  async saveValuation(valuationID: string, valuationData: ValuationsData) {
    await this.afs
      .collection('valuations')
      .doc(valuationID)
      .set(valuationData, { merge: true });
  }

  private async getClientValuationList(
    userID: string
  ): Promise<firebase.default.firestore.DocumentSnapshot<unknown> | undefined> {
    // let response: firebase.default.firestore.DocumentSnapshot<unknown> =
    return await this.afs
      .collection('client-valuations-lists')
      .doc(userID)
      .get()
      .toPromise();
  }

  private setClientValuationList(userID: string): void {
    this.afs
      .collection('client-valuations-lists')
      .doc(userID)
      .set({ valuations: [] });
  }
}
