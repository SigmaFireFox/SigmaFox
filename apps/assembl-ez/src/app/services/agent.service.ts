import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormFieldOption } from 'app/interfaces/form-screen.interface';
import { last } from 'rxjs';
import {
  AuthenticationService,
  SignInDetails,
} from './authentication-service.service';
import {
  CollectionType,
  DataManagementService,
} from './data-management.service';

export interface AgentProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  constructor(
    private authenticationService: AuthenticationService,
    private dataManagementService: DataManagementService
  ) {}

  getAgents(): Promise<{ [key: string]: AgentProfile }> {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(JSON.parse(sessionStorage['agents']));
      } catch (error) {
        reject(error);
      }
    });
  }

  async getAgentOptions(): Promise<FormFieldOption[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let listOfAgents: FormFieldOption[] = [];
        const agents = await this.getAgents();
        Object.keys(agents).forEach((id) => {
          listOfAgents.push({
            display: agents[id].firstName + ' ' + agents[id].lastName,
            value: id,
          });
        });
        resolve(listOfAgents);
      } catch (error) {
        reject(error);
      }
    });
  }

  async addAgent(agent: AgentProfile): Promise<void> {
    const url = 'https://us-central1-assembl-ez.cloudfunctions.net/addAgent';

    return new Promise(async (resolve, reject) => {
      await this.dataManagementService
        .postData(CollectionType.AGENT, url, agent)
        .then(
          async (response) => {
            console.log(response);
            resolve();
          },
          async (error) => {
            reject();
          }
        );
    });
  }

  async editAgent(agent: AgentProfile): Promise<void> {
    const url = 'https://us-central1-assembl-ez.cloudfunctions.net/editAgent';

    return new Promise(async (resolve, reject) => {
      await this.dataManagementService
        .postData(CollectionType.AGENT, url, agent)
        .then(
          async (success) => {
            resolve();
          },
          async (error) => reject()
        );
    });
  }

  getAgentDefaultPassword(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      if (sessionStorage['userInfo']) {
        let userInfo = JSON.parse(sessionStorage['userInfo']);
        userInfo['agentDefaultPassword']
          ? resolve(userInfo['agentDefaultPassword'])
          : reject();
      }
      reject();
    });
  }
}
