import { Component } from '@angular/core';
import { LeadsPageViewState as ViewState } from 'app/enums/viewstates.enum';
import { FormFieldOption } from 'app/interfaces/form-screen.interface';
import {
  NotificationConfig,
  NotificationType,
  Notification,
} from 'app/modals/notifications/notifications.modal';
import {
  Warning,
  WarningConfig,
  WarningType,
} from 'app/modals/warning/warning.modal';
import { AgentService } from 'app/services/agent.service';
import { AuthenticationService } from 'app/services/authentication-service.service';
import { LeadsService } from 'app/services/leads.service';
import { LoadingService } from 'app/services/loading.service';

@Component({
  selector: 'app-leads-page',
  templateUrl: './leads.page.html',
  styleUrls: ['./leads.page.scss'],
})
export class LeadsPage {
  viewState = ViewState;
  currentViewState = ViewState.MENU;

  leads: { [key: string]: any } = {};
  lead: { [key: string]: string } = {};
  assignToOptions: FormFieldOption[] = [];

  isWarning = false;
  warnigConfig: WarningConfig | undefined;
  isNotifying = false;
  notificationConfig: NotificationConfig | undefined;

  constructor(
    private leadService: LeadsService,
    private loadingService: LoadingService,
    private authenticationService: AuthenticationService,
    private agentService: AgentService
  ) {}

  onLeadAdded(formValue: { [key: string]: string }) {
    this.loadingService.setLoading('Adding lead');
    this.leadService.addLead(formValue).then(
      async (success) => {
        this.notificationConfig = {
          type: NotificationType.LEAD,
          notification: Notification.LEAD_ADDED,
        };
        this.loadingService.cancelLoading();
        this.isNotifying = true;
        await this.getUpdatedLeads();
        this.currentViewState = ViewState.VIEW_ALL;
      },
      (error) => {
        this.loadingService.cancelLoading();
        this.warnigConfig = {
          type: WarningType.LEADS,
          warning: Warning.UNABLE_TO_ADD,
        };
        this.isWarning = true;
      }
    );
  }

  onLeadEdited(formValue: { [key: string]: string }) {
    this.loadingService.setLoading('Updating lead');
    formValue['id'] = this.lead['id'];
    this.leadService.editLead(formValue).then(
      async (success) => {
        this.notificationConfig = {
          type: NotificationType.LEAD,
          notification: Notification.LEAD_EDITED,
        };
        this.loadingService.cancelLoading();
        this.isNotifying = true;
        await this.getUpdatedLeads();
        this.currentViewState = ViewState.VIEW_ALL;
      },
      (error) => {
        this.loadingService.cancelLoading();
        this.warnigConfig = {
          type: WarningType.LEADS,
          warning: Warning.UNABLE_TO_EDIT,
        };
        this.isWarning = true;
      }
    );
  }

  onLeadClicked(index: number) {
    let leadRefs = Object.values(this.leads);
    this.lead = leadRefs[index];
    Object.keys(this.leads).forEach((key) => {
      if (JSON.stringify(this.leads[key]) === JSON.stringify(leadRefs[index])) {
        this.lead['id'] = key;
      }
    });
    this.currentViewState = ViewState.VIEW_LEAD;
  }

  onRequestToEdit() {
    this.currentViewState = ViewState.EDIT;
  }

  async onViewStateSelected(viewState: number) {
    switch (viewState) {
      case ViewState.VIEW_ALL: {
        await this.getUpdatedLeads();
        await this.setAssigningToOptions();
        break;
      }
      case ViewState.ADD: {
        this.lead = {};
        await this.setAssigningToOptions();
      }
    }
    this.currentViewState = viewState;
  }

  private async getUpdatedLeads(): Promise<void> {
    await this.leadService.getLeads().then(
      async (leads) => {
        this.leads = leads;
      },
      (error) => {}
    );
  }

  private async setAssigningToOptions() {
    this.assignToOptions = [];
    this.assignToOptions.push(
      {
        display: 'Unassigned',
        value: '',
      },
      {
        display: 'Myself',
        value: await this.authenticationService.userID,
      }
    );

    this.agentService.getAgentOptions().then(
      async (agentsList) => {
        this.assignToOptions = this.assignToOptions.concat(agentsList);
      },
      async (error) => {}
    );
  }
}
