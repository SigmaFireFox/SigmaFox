import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { MonthsOfYear } from 'app/~global-enums/general.enum';
import { ValuationsBasicDetails } from 'app/~global-interfaces/valuations.interface';
import { ScreenMode } from '../../screen-mode.enum';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.scss'],
})
export class BasicDetailsComponent {
  @Input() valuationBasicDetails = {
    targetEntityName: '',
    targetEntityFYE: undefined as unknown as MonthsOfYear,
    valuationDate: undefined as unknown as Date,
  } as ValuationsBasicDetails;
  @Output() updatedBasicDetails = new EventEmitter<ValuationsBasicDetails>();

  formDataRequired: Subject<void> = new Subject<void>();
  ScreenMode = ScreenMode;
  currentScreenMode = ScreenMode.VIEW;
  changesMade = false;

  toggleScreenMode() {
    if (this.currentScreenMode === ScreenMode.VIEW) {
      this.currentScreenMode = ScreenMode.FORM;
    } else {
      this.currentScreenMode = ScreenMode.VIEW;
    }
  }

  updateData() {
    this.toggleScreenMode();
    this.callFormData();
  }

  setChangesMade(changesMade: boolean) {
    this.changesMade = changesMade;
  }

  updateBasicDetails(updatedBasicDetails: ValuationsBasicDetails) {
    this.updatedBasicDetails.emit(updatedBasicDetails);
    this.changesMade = false;
  }

  private callFormData() {
    this.formDataRequired.next();
  }
}
