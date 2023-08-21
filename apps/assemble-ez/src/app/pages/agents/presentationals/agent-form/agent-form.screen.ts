import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormFieldType } from 'app/enums/form.eum';
import { FormConfig } from 'app/interfaces/form-screen.interface';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { AgentPageViewState as ViewState } from 'app/enums/viewstates.enum';

@Component({
  selector: 'app-agent-form-screen',
  templateUrl: './agent-form.screen.html',
  styleUrls: ['./agent-form.screen.scss'],
})
export class AgentFormScreen {
  @Input() currentValues: { [key: string]: string } = {};
  @Output() formSubmitted = new EventEmitter<{ [key: string]: string }>();
  @Output() viewStateSelected = new EventEmitter<number>();

  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to agent list',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.VIEW,
    },
  ];

  newAgentFormConfig: FormConfig = {
    formTitle:
      "Please provide the new agent's detauls \
      and we will send them an email to let them \
      know you have regustered them",
    isInExpansionTable: false,
    isDynamic: false,
    canProceed: false,
    proceedBlocked: false,
    fields: [
      {
        fieldDisplay: 'First name',
        fieldName: 'firstName',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: '',
      },
      {
        fieldDisplay: 'Last name',
        fieldName: 'lastName',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: '',
      },
      {
        fieldDisplay: 'Email',
        fieldName: 'email',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: '',
      },
      {
        fieldDisplay: 'Contact number',
        fieldName: 'contactNumber',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: '',
      },
    ],
    proceedText: 'Proceed',
  };

  onNewAgentFormSubmitted(formValue: { [key: string]: string }) {
    this.formSubmitted.emit(formValue);
  }

  onViewStateSelected(viewState: ViewState) {
    this.viewStateSelected.emit(viewState);
  }
}
