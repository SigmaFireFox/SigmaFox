import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListConfig } from 'app/interfaces/list-screen.interface';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { AgentPageViewState as ViewState } from 'app/enums/viewstates.enum';

@Component({
  selector: 'app-view-agents-screen',
  templateUrl: './view-agents.screen.html',
  styleUrls: ['./view-agents.screen.scss'],
})
export class ViewAgentsScreen implements OnInit {
  @Input() agents: { [key: string]: any } = {};
  @Output() agentClicked = new EventEmitter<number>();
  @Output() viewStateSelected = new EventEmitter<number>();

  agentsListConfig: ListConfig = {
    isInExpansionTable: false,
    title: '',
    headers: [],
    lines: [],
  };

  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Add agent',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.ADD,
    },
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to main menu',
      optionType: MenuOptionType.HOME,
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.setAgentListConfig();
  }

  onAgentClicked(index: number) {
    this.agentClicked.emit(index);
  }

  onViewStateSelected(viewState: ViewState) {
    this.viewStateSelected.emit(viewState);
  }

  private setAgentListConfig() {
    if (Object.keys(this.agents).length === 0) {
      this.agentsListConfig.title =
        "It seems you don't have any agents \
        registered on your profile - why not \
        add one now";
      return;
    }

    this.agentsListConfig.title = 'Click on agent below to view their details';

    this.agentsListConfig.headers.push(
      {
        widthFactor: 1,
        content: 'Name',
      },
      {
        widthFactor: 1,
        content: 'Email',
      }
    );

    Object.keys(this.agents).forEach((agentRef) => {
      let agent = this.agents[agentRef] as {
        firstName: string;
        lastName: string;
        email: string;
      };
      let agentListItem: string[] = [];
      agentListItem.push(agent.firstName + ' ' + agent.lastName);
      agentListItem.push(agent.email);
      this.agentsListConfig.lines.push(agentListItem);
    });
  }
}
