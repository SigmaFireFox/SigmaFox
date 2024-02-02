import { Injectable } from '@angular/core';
import { ClientDetails } from '@sigmafox/modals';
import {
  Clients,
  ClientDetailWithFinancialRecords,
} from '../../interfaces/clients.interface';
import { GeneralItem } from '../../interfaces/common-page-configs.interface';

export enum FinancialRecordType {
  Invoice,
  Payment,
  CreditNote,
}

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

  getClientIDFromDisplayName(searchDisplayName: string): number {
    let clientID = 0;
    const numberOfClients = Object.keys(this.clientsOnFile).length;
    for (let counter = 1; counter < numberOfClients + 1; counter++) {
      if (
        this.clientsOnFile[counter].clientDetails.displayName ===
        searchDisplayName
      ) {
        clientID = counter;
        break;
      }
    }
    return clientID;
  }

  editClient(clientID: number, updatedClientDetail: ClientDetails) {
    this.currentClientsData[clientID].clientDetails = {
      ...this.currentClientsData[clientID].clientDetails,
      ...updatedClientDetail,
    };
    this.persistClientData();
  }

  addClient(clientDetail: ClientDetails) {
    const clientID = Object.keys(this.currentClientsData).length + 1;
    this.currentClientsData[clientID] = {
      clientDetails: clientDetail,
      financialRecords: { invoices: [], creditNotes: [], payments: [] },
    };
    this.persistClientData();
  }

  addFinancialRecordToClient(
    clientID: number,
    financialRecordType: FinancialRecordType,
    docNumber: number
  ) {
    switch (financialRecordType) {
      case FinancialRecordType.Invoice: {
        this.currentClientsData[clientID].financialRecords.invoices.push(
          docNumber
        );
        break;
      }
      case FinancialRecordType.Payment: {
        this.currentClientsData[clientID].financialRecords.payments.push(
          docNumber
        );
        break;
      }
      case FinancialRecordType.CreditNote: {
        this.currentClientsData[clientID].financialRecords.creditNotes.push(
          docNumber
        );
        break;
      }
    }
    this.persistClientData();
  }

  setClientList(): GeneralItem {
    const clientListItem = {} as GeneralItem;
    Object.keys(this.currentClientsData).forEach((key) => {
      clientListItem[parseInt(key)] = {
        listedDetails: [
          {
            content:
              this.currentClientsData[parseInt(key)].clientDetails.displayName,
          },
          {
            content: this.currentClientsData[parseInt(key)].clientDetails.email,
          },
          {
            content:
              this.currentClientsData[parseInt(key)].clientDetails
                .contactNumber,
          },
        ],
        voided: this.currentClientsData[parseInt(key)].clientDetails.voided,
      };
    });
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
