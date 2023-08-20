import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MenuAction,
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { LeadsPageViewState as ViewState } from 'app/enums/viewstates.enum';
import { DetailPresentationConfig } from 'app/interfaces/detail-presentation-component';
import { FormFieldOption } from 'app/interfaces/form-screen.interface';

export interface PageConfig {
  header: string;
  subHeader: string;
}

export interface ProcessResultsPageConfig extends PageConfig {
  explainer: string;
  results: ProcessResult[];
}

export interface ProcessResult {
  description: string;
  resultType: ResultType;
  result: any;
}

export enum ResultType {
  NUMBER,
  DATE,
  LIST,
}

@Component({
  selector: 'app-view-lead-detail-screen',
  templateUrl: './view-lead-detail.screen.html',
  styleUrls: ['./view-lead-detail.screen.scss'],
})
export class ViewLeadDetailScreen {
  @Input() lead: { [key: string]: string } = {};
  @Input() assignToOptions: FormFieldOption[] = [];
  @Output() viewStateSelected = new EventEmitter<number>();
  @Output() requestToEdit = new EventEmitter<void>();

  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Edit this lead',
      optionType: MenuOptionType.ACTION,
      action: MenuAction.EDIT,
    },
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to leads',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.VIEW_ALL,
    },
  ];

  resultsType = ResultType;

  leadDetailsConfig = {
    title: '',
    lines: [],
    inExpansionPanel: false,
  } as DetailPresentationConfig;

  ngOnInit() {
    let agentDisplayNames = this.setAgentDisplayNames();
    this.leadDetailsConfig.title = this.lead['name'];
    if (this.lead['email']) {
      this.leadDetailsConfig.lines.push({
        header: 'Email',
        detail: this.lead['email'],
        oneliner: true,
      });
    }
    if (this.lead['contactNumber']) {
      this.leadDetailsConfig.lines.push({
        header: 'Contact number',
        detail: this.lead['contactNumber'],
        oneliner: true,
      });
    }
    this.leadDetailsConfig.lines.push({
      header: 'Assigned to',
      detail: agentDisplayNames[this.lead['assignedTo']] || 'Unassigned',
      oneliner: true,
    });
  }

  onViewStateSelected(viewState: number) {
    this.viewStateSelected.emit(viewState);
  }

  onActionSelected(action: MenuAction) {
    switch (action) {
      case MenuAction.EDIT: {
        this.requestToEdit.emit();
      }
    }
  }

  private setAgentDisplayNames(): { [key: string]: string } {
    let agentDisplayNames: { [key: string]: string } = {};
    this.assignToOptions.forEach((agent) => {
      agentDisplayNames[agent.value] = agent.display;
    });
    return agentDisplayNames;
  }
}
