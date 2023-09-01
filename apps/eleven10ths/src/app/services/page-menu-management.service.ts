// External imports
import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';

// Internal imports
import { BasicAppInfoHandlerService } from './basic-app-info-handler.service';

@Injectable({
  providedIn: 'root',
})
export class PageMenuManagementService {
  // Constructor
  constructor(private basicInfo: BasicAppInfoHandlerService) {}

  // Functions
  getSelectedSport(routeParams: ParamMap): string {
    const selectedSport = String(routeParams.get('sport'));
    return selectedSport;
  }

  async getSportMenu(sport: string): Promise<Observable<any>> {
    const avaliableResults: { [sport: string]: any } =
      await this.basicInfo.getAvaliableResults();
    const pageMenu = of(avaliableResults[sport]);
    return pageMenu;
  }
}
