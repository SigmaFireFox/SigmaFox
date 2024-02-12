import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  DocView,
  MenuPageConfig,
} from 'apps/e-questrian/src/app/interfaces/common-page-configs.interface';
import {
  OptionAction,
  OptionStyling,
  PathType,
} from 'apps/e-questrian/src/app/interfaces/menu-options.interface';
import { PaymentsService } from 'apps/e-questrian/src/app/services/payments/payments.service';
import { FinanceRoutePaths } from '../../../../models/routing.enums';

@Component({
  selector: 'app-invoice-detail-page',
  templateUrl: './payment-detail.page.html',
  styleUrls: ['./payment-detail.page.scss'],
})
export class PaymentDetailPage {
  menuConfig = {
    header: '',
    menu: [],
  } as MenuPageConfig;

  paymentID = 0;
  paymentDocViewConfig: DocView = {} as DocView;
  showDocument = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentsService: PaymentsService
  ) {}

  async ngOnInit() {
    await this.setUpDocForDisplay();
    this.setMenu();
  }

  paymentVoided() {
    this.paymentsService.voidPayment(this.paymentID);
    this.paymentDocViewConfig.overlayText = 'Voided';
    this.setMenu();
  }

  private async setUpDocForDisplay() {
    this.paymentID = parseInt(
      this.activatedRoute.snapshot.queryParams['paymentID']
    );
    if (this.paymentID === null || Number.isNaN(this.paymentID)) return;
    this.paymentDocViewConfig =
      await this.paymentsService.setPaymentDocForDisplay(this.paymentID);
    this.showDocument = true;
  }

  private setMenu() {
    this.menuConfig.menu = [];
    if (this.paymentDocViewConfig.overlayText != 'Voided') {
      this.menuConfig.menu.push({
        display: 'Void payment',
        action: OptionAction.Void,
        styling: OptionStyling.Primary,
      });
    }

    this.menuConfig.menu.push({
      display: 'Back to Payment List',
      pathConfig: {
        path: FinanceRoutePaths.PaymentsList,
        type: PathType.Sibling,
      },
      styling: OptionStyling.Secondary,
    });
  }
}
