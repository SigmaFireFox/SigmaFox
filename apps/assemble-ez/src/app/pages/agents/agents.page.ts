import { Component } from '@angular/core';
import { AgentPageViewState as ViewState } from '../../../app/enums/viewstates.enum';
import {
  AgentProfile,
  AgentService,
} from '../../../app/services/agent.service';
import { LoadingService } from '../../../app/services/loading.service';
import { LeadsService } from '../../../app/services/leads.service';
import {
  Notification,
  NotificationConfig,
  NotificationType,
} from '../../../app/modals/notifications/notifications.modal';
import {
  Warning,
  WarningConfig,
  WarningType,
} from '../../../app/modals/warning/warning.modal';
import { UserInfo } from '../../../app/interfaces/api.interface';
import { UserInfoService } from '../../../app/services/user-info.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-agents-page',
  templateUrl: './agents.page.html',
  styleUrls: ['./agents.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class AgentsPage {
  viewState = ViewState;
  currentViewState = ViewState.VIEW;
  agents: { [key: string]: unknown } = {};
  agentProfile = {} as AgentProfile;
  agentLeads: { [key: string]: unknown } = {};
  currentValues: { [key: string]: unknown } = {};
  notificationConfig: NotificationConfig | undefined;
  isNotifying = false;
  warnigConfig: WarningConfig | undefined;
  isWarning = false;

  constructor(
    private agentService: AgentService,
    private leadsService: LeadsService,
    private loadingService: LoadingService,
    private userInfoService: UserInfoService
  ) {
    this.getUpdatedAgents();
  }

  async onAgentAdded(formValue: { [key: string]: string }) {
    const agent = formValue as unknown as AgentProfile;
    this.agentService.getAgentDefaultPassword().then((password) => {
      agent.password = password;
    });
    agent.contactNumber = '+27' + parseInt(agent.contactNumber).toString();
    this.loadingService.setLoading('Adding agent');
    await this.agentService.addAgent(agent).then(
      () => {
        // this.emailsService.newAgentEmail();
        this.loadingService.cancelLoading();
      },
      () => {
        this.loadingService.cancelLoading();
      }
    );
    await this.getUpdatedAgents();
    this.currentViewState = ViewState.VIEW;
  }

  async onAgentEdited(formValue: { [key: string]: string }) {
    delete formValue['password'];
    const agent = formValue as unknown as AgentProfile;
    agent.contactNumber = '+27' + parseInt(agent.contactNumber).toString();
    agent.id = this.agentProfile.id;
    this.loadingService.setLoading('Updating agent');
    await this.agentService.editAgent(agent).then(
      () => {
        this.loadingService.cancelLoading();
      },
      () => {
        this.loadingService.cancelLoading();
      }
    );
    await this.getUpdatedAgents();
    this.currentViewState = ViewState.VIEW;
  }

  async onAgentClicked(index: number) {
    this.setAgentProfile(index);
    await this.setAgentLeads();
    this.currentViewState = ViewState.VIEW_AGENT;
  }

  onRequestToEdit() {
    this.currentValues = this.agentProfile as unknown as {
      [key: string]: string;
    };
    this.currentViewState = ViewState.EDIT;
  }

  onViewStateSelected(viewState: number) {
    if (viewState === ViewState.ADD) {
      this.loadingService.setLoading('Checking for agent password');
      this.agentService.getAgentDefaultPassword().then(
        () => {
          this.currentViewState = viewState;
          this.loadingService.cancelLoading();
        },
        () => {
          this.notificationConfig = {
            type: NotificationType.REQUIRES_AGENT_PASSWORD,
            notification: Notification.REQUIRES_AGENT_PASSWORD,
          };
          this.isNotifying = true;
          this.currentViewState = ViewState.SET_AGENT_PASSWORD;
          this.loadingService.cancelLoading();
        }
      );
    } else {
      this.currentViewState = viewState;
    }
  }

  onAgentPasswordSet(formValue: { [key: string]: string }) {
    this.loadingService.setLoading('Setting password');
    this.userInfoService
      .updateUserInfo({
        agentDefaultPassword: formValue['newPassword'],
      } as UserInfo)
      .then(
        async () => {
          this.loadingService.cancelLoading();
          this.notificationConfig = {
            type: NotificationType.CHANGE_PASSWORD,
            notification: Notification.AGENT_PASSWORD_CHANGED,
          };
          this.isNotifying = true;
          this.currentViewState = ViewState.ADD;
        },
        async () => {
          this.loadingService.cancelLoading();
        }
      );
  }

  onPasswordMismatch() {
    this.warnigConfig = {
      type: WarningType.PASSWORD_CHANGE,
      warning: Warning.MISMATCHED_PASSWORD,
    };
    this.isWarning = true;
  }

  onNotificationProceed() {
    this.isNotifying = false;
  }

  private setAgentProfile(index: number) {
    const agentRefs = Object.values(this.agents);
    this.agentProfile = agentRefs[index] as AgentProfile;
    Object.keys(this.agents).forEach((key) => {
      if (
        JSON.stringify(this.agents[key as keyof AgentProfile]) ===
        JSON.stringify(agentRefs[index])
      ) {
        this.agentProfile.id = key;
      }
    });
    this.currentViewState = ViewState.VIEW_AGENT;
  }

  private async setAgentLeads() {
    this.agentLeads = {};
    const leads = (await this.leadsService.getLeads()) as {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    };
    Object.keys(leads).forEach((key) => {
      if (leads[key]['assignedTo'] === this.agentProfile.id) {
        this.agentLeads[key] = leads[key];
      }
    });
  }

  private async getUpdatedAgents(): Promise<void> {
    await this.agentService.getAgents().then(
      async (agents) => {
        this.agents = agents;
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {}
    );
  }
}
