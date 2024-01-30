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
import { AppClientDetail } from '../../interfaces/clients.interface';
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
  clients = this.clientService.clientsOnFile;
  currentClientApp: AppClientDetail = {} as AppClientDetail;
  currentClient: ClientDetails = {} as ClientDetails;

  currentClientID = 0;

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
    this.clients = this.clientService.clientsOnFile;
    this.updateClientDetails(clientID);
    this.currentViewState = ViewState.CLIENT_DETAIL;
  }

  addClient(client: AppClientDetail) {
    this.clientService.addClient(client);
    this.clients = this.clientService.clientsOnFile;
  }

  editClient(updatedClientDetails: AppClientDetail) {
    this.clientService.editClient(this.currentClientID, updatedClientDetails);
    this.clients = this.clientService.clientsOnFile;
  }

  removeClient() {
    const updatedClientDetails = this.currentClientApp;
    updatedClientDetails.voided = true;
    this.clientListPageConfig.items[this.currentClientID].voided = true;
    this.editClient(updatedClientDetails);
    this.currentViewState = ViewState.VIEW;
  }

  private updateClientDetails(clientID: number) {
    this.currentClientApp = this.clients[clientID];
    this.currentClient = {
      firstName: this.currentClientApp.firstName,
      lastName: this.currentClientApp.lastName,
      displayName: this.currentClientApp.displayName,
      email: this.currentClientApp.email,
      contactNumber: this.currentClientApp.telephoneNumber,
    };
  }
}
