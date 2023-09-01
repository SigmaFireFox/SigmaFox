import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { environment } from '../../enviroments/enviroments';

export interface AppUser {
  userName: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  async getAllDocuments(
    collectionName: string
  ): Promise<Record<string, AppUser>> {
    const querySnapshot = await getDocs(collection(this.db, collectionName));
    const documents: Record<string, AppUser> = {};
    querySnapshot.forEach((doc) => {
      documents[doc.id] = doc.data() as AppUser;
    });
    return documents;
  }
}
