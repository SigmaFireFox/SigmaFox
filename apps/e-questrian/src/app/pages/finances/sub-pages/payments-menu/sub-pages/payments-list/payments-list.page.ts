import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FinancialDocListPageConfig,
  FinancialDocType,
  MenuPageConfig,
} from 'apps/e-questrian/src/app/interfaces/common-page-configs.interface';
import {
  OptionStyling,
  PathType,
} from 'apps/e-questrian/src/app/interfaces/menu-options.interface';
import { PaymentsService } from 'apps/e-questrian/src/app/services/payments/payments.service';
import { FinanceRoutePaths } from '../../../../models/routing.enums';

@Component({
  selector: 'app-invoices-view-page',
  templateUrl: './payments-list.page.html',
  styleUrls: ['./payments-list.page.scss'],
})
export class PaymentsListPage {
  pageConfig = {
    header: 'Payments List',
    financialDocType: FinancialDocType.LIST,
    isVoidToggable: true,
    items: [],
  } as FinancialDocListPageConfig;

  menuConfig = {
    header: '',
    subHeader: '',
    menu: [
      {
        display: 'Record new payment',
        pathConfig: {
          path: FinanceRoutePaths.PaymentsRecord,
          type: PathType.Sibling,
        },
      },
      {
        display: 'Back to Payments Menu',
        pathConfig: {
          path: FinanceRoutePaths.PaymentsMenu,
          type: PathType.Parent,
        },
        styling: OptionStyling.Secondary,
      },
    ],
  } as MenuPageConfig;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private invoiceService: InvoicesService
    private paymentsService: PaymentsService
  ) {}

  ngOnInit() {
    this.pageConfig.items = this.paymentsService.setPaymentsDataForDisplay();
  }

  onPaymentClicked(document: { docType: FinancialDocType; docNum: number }) {
    this.router.navigate([`../${FinanceRoutePaths.PaymentDetail}`], {
      relativeTo: this.activatedRoute,
      queryParams: {
        paymentID: document.docNum,
      },
    });
  }
}
