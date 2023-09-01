import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BasicAppInfoHandlerService {
  docResult: any;
  constructor(private db: AngularFirestore) {}

  async getList(requiredList: string) {
    const docRef = this.db.collection('AppBasicData').doc(requiredList);
    const docOb = docRef.get();
    await this.getDbDoc(docOb);
    return this.docResult;
  }

  async getDivCodeData() {
    const docRef = this.db.collection('ResultIndices').doc('DivCodesBySource');
    const docOb = docRef.get();
    await this.getDbDoc(docOb);
    return this.docResult;
  }

  async getAvaliableResults() {
    const docRef = this.db.collection('ResultIndices').doc('AvaliableResults');
    const docOb = docRef.get();
    await this.getDbDoc(docOb);
    return this.docResult;
  }

  async getDbDoc(
    docOb: Observable<firebase.default.firestore.DocumentSnapshot<unknown>>
  ): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        docOb.subscribe((info) => {
          this.docResult = info.data();
          resolve();
        });
      } /* reject here*/
    );
  }
}
