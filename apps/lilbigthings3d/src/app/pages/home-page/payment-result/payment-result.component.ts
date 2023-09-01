import { Component, OnInit } from '@angular/core';

export enum PaymentResultViewState {
  NONE,
  SUCCESS,
  CANCEL,
  NOTIFY,
}

@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.scss'],
})
export class PaymentResultComponent implements OnInit {
  viewState = PaymentResultViewState;
  currentViewState = PaymentResultViewState.NONE;

  ngOnInit(): void {
    switch (location.pathname) {
      case '/payment-result/success':
        this.currentViewState = PaymentResultViewState.SUCCESS;
        break;
      case '/payment-result/canceled':
        this.currentViewState = PaymentResultViewState.CANCEL;
        break;
      case '/payment-result/notify':
        this.currentViewState = PaymentResultViewState.NOTIFY;
    }
  }
}
