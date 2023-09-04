import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MonthsOfYear } from '../../../../~global-enums/general.enum';
import { ValuationsBasicDetails } from 'app/~global-interfaces/valuations.interface';
import { _isTestEnvironment } from '@angular/cdk/platform';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-basic-details-form',
  templateUrl: './basic-details-form.component.html',
  styleUrls: ['./basic-details-form.component.scss'],
})
export class BasicDetailsFormComponent {
  @Input() valuationBasicDetails = {
    targetEntityName: '',
    targetEntityFYE: undefined as unknown as MonthsOfYear,
    valuationDate: undefined as unknown as Date,
  } as ValuationsBasicDetails;
  @Input() updatedDataRequested: Observable<void> | undefined;
  @Output() changesMade = new EventEmitter<boolean>();

  @Output() updateBasicDetails = new EventEmitter<ValuationsBasicDetails>();

  basicDetails = this.formBuilder.group({
    targetEntityName: ['', Validators.required],
    targetEntityFYE: ['', Validators.required],
    valuationDate: ['', Validators.required],
  });

  monthsOfYear = MonthsOfYear;
  originalOrder = (
    a: KeyValue<string, MonthsOfYear>,
    b: KeyValue<string, MonthsOfYear>
  ): number => {
    return 0;
  };

  private dataRequestSubscription: Subscription | undefined;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.setSubscriptionsRequired();
    this.setBasicDetailsForm();
  }

  ngOnDestroy() {
    this.unsubscribeToAll();
  }

  private setBasicDetailsForm() {
    this.basicDetails.patchValue({
      targetEntityName: this.valuationBasicDetails.targetEntityName,
      targetEntityFYE: this.valuationBasicDetails.targetEntityFYE,
      valuationDate: this.valuationBasicDetails.valuationDate,
    });
  }

  private setSubscriptionsRequired() {
    this.dataRequestSubscription = this.updatedDataRequested!.subscribe(() =>
      this.submittedUpdatedData()
    );
    this.basicDetails.valueChanges.subscribe((result: any) => {
      if (this.basicDetails.dirty) {
        this.isChangesMade();
      }
    });
  }

  private isChangesMade() {
    if (
      isEqual(
        this.basicDetails.value as ValuationsBasicDetails,
        this.valuationBasicDetails
      )
    ) {
      this.changesMade.emit(false);
    } else {
      this.changesMade.emit(true);
    }
  }

  private unsubscribeToAll() {
    this.dataRequestSubscription!.unsubscribe();
  }

  private submittedUpdatedData() {
    this.updateBasicDetails.emit(
      this.basicDetails.value as ValuationsBasicDetails
    );
  }
}
