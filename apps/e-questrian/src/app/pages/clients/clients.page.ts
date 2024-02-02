/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/component-class-suffix */
import { Component } from '@angular/core';
import { ClientDetails } from '@sigmafox/modals';
import {
  ClientMenuPageConfig,
  ClientListPageConfig,
  ViewClientsMenuConfig,
} from '../../configs/client-page.configs';
import { ClientPageViewState as ViewState } from '../../enums/viewstates.enum';
import { ClientDetailWithFinancialRecords } from '../../interfaces/clients.interface';
import { ClientsService } from '../../services/clients/clients.service';

export interface MenuOption {
  display: string;
  viewState: ViewState;
}

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage {
  clientMenuPageConfig = ClientMenuPageConfig;
  clientListPageConfig = ClientListPageConfig;
  viewClientsMenuConfig = ViewClientsMenuConfig;

  viewStateEnum = ViewState;
  currentViewState = ViewState.MAIN;
  currentClient: ClientDetailWithFinancialRecords =
    {} as ClientDetailWithFinancialRecords;

  currentClientID = 0;

  get clients() {
    return this.clientService.clientsOnFile;
  }

  constructor(private clientService: ClientsService) {}

  switchViewState(viewStateSelected: ViewState) {
    this.currentViewState = viewStateSelected;
    switch (this.currentViewState) {
      case ViewState.VIEW: {
        this.clientListPageConfig.items = this.clientService.setClientList();
      }
    }
  }

  viewClient(clientID: number) {
    this.currentClientID = clientID;
    this.updateClientDetails(clientID);
    this.switchViewState(ViewState.CLIENT_DETAIL);
  }

  onClientUpdate(updatedClientDetails: ClientDetails) {
    this.clientService.editClient(this.currentClientID, updatedClientDetails);
  }

  onModalClosed() {
    this.switchViewState(ViewState.VIEW);
  }

  private updateClientDetails(clientID: number) {
    this.currentClient = this.clients[clientID];
  }
}
