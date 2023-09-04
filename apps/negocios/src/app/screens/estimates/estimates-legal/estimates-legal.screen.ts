import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-estimates-legal-screen',
  templateUrl: './estimates-legal.screen.html',
  styleUrls: ['./estimates-legal.screen.scss'],
})
export class EstimatesLegalScreen implements OnInit {
  @Input() updatedDataRequested: Observable<boolean> | undefined;
  @Output() legalStatus = new EventEmitter<{
    tAndCsAccepted: boolean;
    dataRecordingAccepted: boolean;
  }>();
  @Output() incompeleteLegalStatus = new EventEmitter<{
    tAndCsAccepted: boolean;
    dataRecordingAccepted: boolean;
  }>();

  tAndCsChecked = false;
  dataRecordingAccepted = false;
  dataRecordingRejected = false;
  dataRequestSubscription: Subscription | undefined;

  constructor() {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.setSubscriptionsRequired();
  }

  dataRecordingChecked(accepted: boolean) {
    if (accepted) {
      this.dataRecordingRejected = false;
    } else {
      this.dataRecordingAccepted = false;
    }
  }

  private setSubscriptionsRequired() {
    this.dataRequestSubscription = this.updatedDataRequested!.subscribe(
      (requestScreenData) => {
        requestScreenData ? this.submitUpdate() : null;
      }
    );
  }

  private submitUpdate() {
    if (
      this.tAndCsChecked &&
      (this.dataRecordingAccepted || this.dataRecordingRejected)
    ) {
      this.legalStatus.emit({
        tAndCsAccepted: true,
        dataRecordingAccepted: this.dataRecordingAccepted,
      });
    } else {
      let incompleteProcess = {
        tAndCsAccepted: false,
        dataRecordingAccepted: false,
      };
      if (this.tAndCsChecked) {
        incompleteProcess.tAndCsAccepted = true;
      }
      if (this.dataRecordingAccepted || this.dataRecordingRejected) {
        incompleteProcess.dataRecordingAccepted = true;
      }
      this.incompeleteLegalStatus.emit(incompleteProcess);
    }
  }
}
