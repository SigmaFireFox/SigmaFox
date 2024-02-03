import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../../components/menu/menu.component';
import { FinancialDocListScreen } from '../../screens/financial-doc-list/financial-doc-list.screen';
import { FinancialDocViewScreen } from '../../screens/financial-doc-view/financial-doc-view.screen';
import { FinanceRoutingModule } from './finance-routing.module';
import { FinancesPage } from './finances.page';
import { FinanceMainMenuPage } from './sub-pages/finance-main-menu/finance-main-menu.page';
import { InvoicesMenuPage } from './sub-pages/invoices-menu/invoices-menu.page';
import { InvoiceDetailPage } from './sub-pages/invoices-menu/sub-pages/invoice-detail/invoice-detail.page';
import { InvoicesListPage } from './sub-pages/invoices-menu/sub-pages/invoices-list/invoices-list.page';

@NgModule({
  declarations: [
    FinancesPage,
    FinanceMainMenuPage,
    InvoicesMenuPage,
    InvoicesListPage,
    InvoiceDetailPage,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FinanceRoutingModule,
    MenuComponent,
    FinancialDocListScreen,
    FinancialDocViewScreen,
  ],
  exports: [RouterModule],
})
export class FinancePageModule {}
