/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LeadsPageViewState as ViewState } from 'apps/assemble-ez/src/app/enums/viewstates.enum';
import { FormFieldOption } from 'apps/assemble-ez/src/app/interfaces/form-screen.interface';
import { ListConfig } from 'apps/assemble-ez/src/app/interfaces/list-screen.interface';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'apps/assemble-ez/src/app/interfaces/menu-screen.interface';

@Component({
  selector: 'app-view-leads-screen',
  templateUrl: './view-leads.screen.html',
  styleUrls: ['./view-leads.screen.scss'],
})
export class ViewLeadsScreen implements OnInit {
  @Input() leads: { [key: string]: any } = {};
  @Input() assignToOptions: FormFieldOption[] = [];
  @Output() viewStateSelected = new EventEmitter<number>();
  @Output() leadClicked = new EventEmitter<number>();

  leadListConfig: ListConfig = {
    isInExpansionTable: false,
    title: '',
    headers: [],
    lines: [],
  };
  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Add lead',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.ADD,
    },
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to lead menu',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.MENU,
    },
  ];

  ngOnInit() {
    this.setleadListConfig();
  }

  onViewStateSelected(viewState: number) {
    this.viewStateSelected.emit(viewState);
  }

  onLeadClicked(index: number) {
    this.leadClicked.emit(index);
  }

  private setleadListConfig() {
    const agentDisplayNames = this.setAgentDisplayNames();
    if (Object.keys(this.leads).length === 0) {
      this.leadListConfig.title =
        'It seems that you have no leads as yet. Why not add a lead now';
      return;
    }

    this.leadListConfig.headers.push(
      {
        widthFactor: 1,
        content: 'Name',
      },
      {
        widthFactor: 1,
        content: 'Assigned to',
      }
    );

    Object.keys(this.leads).forEach((leadRef) => {
      const lead = this.leads[leadRef] as {
        name: string;
        email: string;
        assignedTo: string;
      };
      const leadListItem: string[] = [];
      leadListItem.push(lead.name);
      leadListItem.push(agentDisplayNames[lead.assignedTo] || 'Unassigned');
      this.leadListConfig.lines.push(leadListItem);
    });
  }

  private setAgentDisplayNames(): { [key: string]: string } {
    const agentDisplayNames: { [key: string]: string } = {};
    this.assignToOptions.forEach((agent) => {
      agentDisplayNames[agent.value] = agent.display;
    });
    return agentDisplayNames;
  }
}
