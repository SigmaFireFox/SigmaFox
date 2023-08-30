import { Injectable } from '@angular/core';
import { FormFieldOption } from '../../app/interfaces/form-screen.interface';
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
  constructor(private dataManagementService: DataManagementService) {}

  getAgents(): Promise<{ [key: string]: AgentProfile }> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        resolve(JSON.parse(sessionStorage['agents']));
      } catch (error) {
        reject(error);
      }
    });
  }

  async getAgentOptions(): Promise<FormFieldOption[]> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const listOfAgents: FormFieldOption[] = [];
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

    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      await this.dataManagementService
        .postData(CollectionType.AGENT, url, agent)
        .then(
          async (response) => {
            console.log(response);
            resolve();
          },
          async () => {
            reject();
          }
        );
    });
  }

  async editAgent(agent: AgentProfile): Promise<void> {
    const url = 'https://us-central1-assembl-ez.cloudfunctions.net/editAgent';

    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      await this.dataManagementService
        .postData(CollectionType.AGENT, url, agent)
        .then(
          async () => {
            resolve();
          },
          async () => reject()
        );
    });
  }

  getAgentDefaultPassword(): Promise<string> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      if (sessionStorage['userInfo']) {
        const userInfo = JSON.parse(sessionStorage['userInfo']);
        userInfo['agentDefaultPassword']
          ? resolve(userInfo['agentDefaultPassword'])
          : reject();
      }
      reject();
    });
  }
}
