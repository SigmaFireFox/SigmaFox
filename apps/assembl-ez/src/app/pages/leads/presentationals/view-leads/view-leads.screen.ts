import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListConfig } from 'app/interfaces/list-screen.interface';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { LeadsPageViewState as ViewState } from 'app/enums/viewstates.enum';
import { FormFieldOption } from 'app/interfaces/form-screen.interface';

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
    let agentDisplayNames = this.setAgentDisplayNames();
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
      let lead = this.leads[leadRef] as {
        name: string;
        email: string;
        assignedTo: string;
      };
      let leadListItem: string[] = [];
      leadListItem.push(lead.name);
      leadListItem.push(agentDisplayNames[lead.assignedTo] || 'Unassigned');
      this.leadListConfig.lines.push(leadListItem);
    });
  }

  private setAgentDisplayNames(): { [key: string]: string } {
    let agentDisplayNames: { [key: string]: string } = {};
    this.assignToOptions.forEach((agent) => {
      agentDisplayNames[agent.value] = agent.display;
    });
    return agentDisplayNames;
  }
}
