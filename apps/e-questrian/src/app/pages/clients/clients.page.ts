/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/component-class-suffix */
import { Component } from '@angular/core';
import {
  ClientMenuPageConfig,
  ClientListPageConfig,
  ViewClientsMenuConfig,
} from '../../configs/client-page.configs';
import { ClientPageViewState as ViewState } from '../../enums/viewstates.enum';
import { ClientDetail } from '../../interfaces/clients.interface';
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
  clients = this.clientService.clients;
  currentClient: ClientDetail = {} as ClientDetail;

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
    this.clients = this.clientService.clients;
    this.currentClient = this.clients[clientID];
    this.currentViewState = ViewState.CLIENT_DETAIL;
  }

  addClient(client: ClientDetail) {
    this.clientService.addClient(client);
    this.clients = this.clientService.clients;
  }

  editClient(newClient: ClientDetail) {
    this.clientService.editClient(this.currentClient, newClient);
    this.clients = this.clientService.clients;
  }
}
