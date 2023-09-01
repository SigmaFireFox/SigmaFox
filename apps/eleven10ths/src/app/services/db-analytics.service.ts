import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { seasonResultsObject } from './data-importer.service';
import { map } from 'rxjs/operators';

export interface seasonResultsObjectID extends seasonResultsObject {
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class DbAnalyticsService {
  private resultCollection:
    | AngularFirestoreCollection<seasonResultsObject>
    | undefined;
  results: Observable<seasonResultsObjectID[]> | undefined;
  constructor(private readonly firestore: AngularFirestore) {}

  indexDB() {
    this.resultCollection =
      this.firestore.collection<seasonResultsObject>('Results');
    this.results = this.resultCollection.snapshotChanges().pipe(
      map((actions: { payload: { doc: { data: () => any; id: any } } }[]) => {
        return actions.map(
          (a: { payload: { doc: { data: () => any; id: any } } }) => {
            const data = a.payload.doc.data() as seasonResultsObject;
            const id = a.payload.doc.id;
            console.log({ id, ...data });
            return { id, ...data };
          }
        );
      })
    );
    return this.results;
  }
}