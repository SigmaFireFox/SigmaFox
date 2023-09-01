import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(private readonly fb: FirebaseService) {}

  async validateEmail(userNameOrEmail: string): Promise<string | null> {
    if (this.isEmail(userNameOrEmail)) {
      const email = userNameOrEmail;
      return email;
    }
    const userName = userNameOrEmail;
    return await this.lookUpEmailsFromUserName(userName);
  }

  private isEmail(userNameOrEmail: string): boolean {
    const matchArray = userNameOrEmail
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    return matchArray !== null;
  }

  async lookUpEmailsFromUserName(userName: string): Promise<string | null> {
    const allUsers = await this.fb.getAllDocuments('users');
    const user = allUsers[userName];
    if (!user) return null;
    return user.email || null;
  }
}
