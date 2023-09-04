import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MonthsOfYear } from 'app/~global-enums/general.enum';
import { ValuationsBasicDetails } from 'app/~global-interfaces/valuations.interface';

@Component({
  selector: 'app-basic-details-view',
  templateUrl: './basic-details-view.component.html',
  styleUrls: ['./basic-details-view.component.scss'],
})
export class BasicDetailsViewScreen {
  @Input() valuationBasicDetails = {
    targetEntityName: '',
    targetEntityFYE: undefined as unknown as MonthsOfYear,
    valuationDate: undefined as unknown as Date,
  } as ValuationsBasicDetails;
}
