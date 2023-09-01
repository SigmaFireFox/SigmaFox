import { Injectable } from '@angular/core';
import { testData } from '../test-data';

@Injectable({
  providedIn: 'root',
})
export class LeaguesService {
  getLeagues(): string[] {
    let listOfLeagues: string[] = [];
    Object.keys(testData).forEach((leagueID) => {
      listOfLeagues.push(testData[leagueID].leagueName);
    });
    return listOfLeagues;
  }
}
