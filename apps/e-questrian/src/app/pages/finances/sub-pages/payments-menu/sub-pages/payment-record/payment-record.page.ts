import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentDetails } from 'apps/e-questrian/src/app/interfaces/payments.interface';
import { PaymentsService } from 'apps/e-questrian/src/app/services/payments/payments.service';
import { FinanceRoutePaths } from '../../../../models/routing.enums';

export enum ViewState {
  PARAMS,
  RESULTS,
}

@Component({
  selector: 'app-invoices-view-page',
  templateUrl: './payment-record.page.html',
  styleUrls: ['./payment-record.page.scss'],
})
export class PaymentRecordPage {
  constructor(
    private paymentsService: PaymentsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  onModalClose() {
    this.router.navigate([`./../../${FinanceRoutePaths.PaymentsMenu}`], {
      relativeTo: this.activatedRoute,
    });
  }

  paymentCreated(paymentDetails: PaymentDetails) {
    this.paymentsService.addPayment(paymentDetails);
  }
}
