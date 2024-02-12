import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeneralScreenHeaderComponent } from '../../components/general-screen-header/general-screen-header.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { GenerateInvoiceModal } from '../../modals/generate-invoice/generate-invoice.modal';
import { PaymentsModal } from '../../modals/payments/payments.modal';
import { FinancialDocListScreen } from '../../screens/financial-doc-list/financial-doc-list.screen';
import { FinancialDocViewScreen } from '../../screens/financial-doc-view/financial-doc-view.screen';
import { ProcessResultsScreen } from '../../screens/process-results/process-results.screen';
import { FinanceRoutingModule } from './finance-routing.module';
import { FinancesPage } from './finances.page';
import { FinanceMainMenuPage } from './sub-pages/finance-main-menu/finance-main-menu.page';
import { InvoicesMenuPage } from './sub-pages/invoices-menu/invoices-menu.page';
import { InvoiceDetailPage } from './sub-pages/invoices-menu/sub-pages/invoice-detail/invoice-detail.page';
import { InvoicesGenerateParamsPage } from './sub-pages/invoices-menu/sub-pages/invoices-generate/invoices-generate.page';
import { InvoicesListPage } from './sub-pages/invoices-menu/sub-pages/invoices-list/invoices-list.page';
import { PaymentsMenuPage } from './sub-pages/payments-menu/payments-menu.page';
import { PaymentDetailPage } from './sub-pages/payments-menu/sub-pages/payment-detail/payment-detail.page';
import { PaymentRecordPage } from './sub-pages/payments-menu/sub-pages/payment-record/payment-record.page';
import { PaymentsListPage } from './sub-pages/payments-menu/sub-pages/payments-list/payments-list.page';

@NgModule({
  declarations: [
    FinancesPage,
    FinanceMainMenuPage,
    InvoicesMenuPage,
    InvoicesListPage,
    InvoiceDetailPage,
    InvoicesGenerateParamsPage,
    PaymentsMenuPage,
    PaymentsListPage,
    PaymentDetailPage,
    PaymentRecordPage,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FinanceRoutingModule,
    MenuComponent,
    FinancialDocListScreen,
    FinancialDocViewScreen,
    GenerateInvoiceModal,
    GeneralScreenHeaderComponent,
    ProcessResultsScreen,
    PaymentsModal,
  ],
  exports: [RouterModule],
})
export class FinancePageModule {}
