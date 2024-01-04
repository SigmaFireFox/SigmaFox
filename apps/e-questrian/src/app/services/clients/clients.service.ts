import { Injectable } from '@angular/core';
import { Clients, ClientDetail } from '../../interfaces/clients.interface';
import { GeneralItem } from '../../interfaces/common-page-configs.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private currentClientsData = {} as Clients;

  get clientsOnFile(): Clients {
    const clientsList = localStorage.getItem('clients');
    return JSON.parse(clientsList || '{}');
  }

  constructor() {
    this.currentClientsData = this.clientsOnFile;
  }

  getClientID(searchDisplayName: string): number {
    let clientID = 0;
    const numberOfClients = Object.keys(this.clientsOnFile).length;
    for (let counter = 1; counter < numberOfClients + 1; counter++) {
      if (this.clientsOnFile[counter].displayName === searchDisplayName) {
        clientID = counter;
        break;
      }
    }
    return clientID;
  }

  editClient(clientID: number, updatedClientDetail: ClientDetail) {
    this.currentClientsData[clientID] = updatedClientDetail;
    this.persistClientData();
  }

  addClient(clientDetail: ClientDetail) {
    const clientID = Object.keys(this.currentClientsData).length + 1;
    this.currentClientsData[clientID] = clientDetail;
    this.persistClientData();
  }

  setClientList(): GeneralItem {
    const clientListItem = {} as GeneralItem;
    Object.keys(this.currentClientsData).forEach((key) => {
      clientListItem[parseInt(key)] = {
        listedDetails: [
          { content: this.currentClientsData[parseInt(key)].displayName },
          { content: this.currentClientsData[parseInt(key)].email },
          { content: this.currentClientsData[parseInt(key)].telephoneNumber },
        ],
        voided: this.currentClientsData[parseInt(key)].voided,
      };
    });
    console.log(clientListItem);
    return clientListItem;
  }

  // private getClientData(): Clients {
  //   const clientsList = localStorage.getItem('clients');
  //   this.clientsData = JSON.parse(clientsList || '{}');
  //   return this.clientsData;
  // }

  private persistClientData(): void {
    localStorage.setItem('clients', JSON.stringify(this.currentClientsData));
  }
}
