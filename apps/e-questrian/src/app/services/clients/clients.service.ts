import { Injectable } from '@angular/core';
import { Clients, ClientDetail } from '../../interfaces/clients.interface';
import { GeneralItem } from '../../interfaces/common-page-configs.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private clientsData = {} as Clients;

  get clients(): Clients {
    return this.getClientData();
  }

  getClientID(searchDisplayName: string): number {
    let clientID = 0;
    const numberOfClients = Object.keys(this.clients).length;
    for (let counter = 1; counter < numberOfClients + 1; counter++) {
      if (this.clients[counter].displayName === searchDisplayName) {
        clientID = counter;
        break;
      }
    }
    return clientID;
  }

  editClient(oldClient: ClientDetail, newClient: ClientDetail) {
    this.getClientData();
    this.removeClient(oldClient);
    this.addClient(newClient);
  }

  removeClient(client: ClientDetail) {
    const numberOfClients = Object.keys(this.clientsData).length;
    for (let clientID = 1; clientID < numberOfClients + 1; clientID++) {
      if (
        JSON.stringify(this.clientsData[clientID]) === JSON.stringify(client)
      ) {
        delete this.clientsData[clientID];
        break;
      }
    }
  }

  addClient(clientDetail: ClientDetail) {
    this.getClientData();
    const clientID = Object.keys(this.clientsData).length + 1;
    this.clientsData[clientID] = clientDetail;
    this.setClientData();
  }

  setClientList(): GeneralItem {
    const clientListItem = {} as GeneralItem;
    Object.keys(this.clients).forEach((key) => {
      clientListItem[parseInt(key)] = [
        { content: this.clients[parseInt(key)].displayName },
        { content: this.clients[parseInt(key)].email },
        { content: this.clients[parseInt(key)].telephoneNumber },
      ];
    });
    return clientListItem;
  }

  private getClientData(): Clients {
    const clientsList = localStorage.getItem('clients');
    this.clientsData = JSON.parse(clientsList || '{}');
    return this.clientsData;
  }

  private setClientData(): void {
    localStorage.setItem('clients', JSON.stringify(this.clientsData));
  }
}
