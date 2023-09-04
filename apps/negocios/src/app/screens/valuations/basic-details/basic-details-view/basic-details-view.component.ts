/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, Input } from '@angular/core';
import { MonthsOfYear } from 'apps/negocios/src/app/~global-enums/general.enum';
import { ValuationsBasicDetails } from 'apps/negocios/src/app/~global-interfaces/valuations.interface';

/* eslint-disable @angular-eslint/component-selector */
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
