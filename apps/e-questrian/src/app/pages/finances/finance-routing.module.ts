import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancesPage } from './finances.page';
import { FinanceRoutePaths } from './models/routing.enums';
import { FinanceMainMenuPage } from './sub-pages/finance-main-menu/finance-main-menu.page';
import { InvoicesMenuPage } from './sub-pages/invoices-menu/invoices-menu.page';
import { InvoiceDetailPage } from './sub-pages/invoices-menu/sub-pages/invoice-detail/invoice-detail.page';
import { InvoicesViewPage } from './sub-pages/invoices-menu/sub-pages/invoices-view/invoices-view.page';

export const routes: Routes = [
  {
    path: FinanceRoutePaths.FinancePage,
    component: FinancesPage,
    children: [
      {
        path: FinanceRoutePaths.FinanceMenu,
        component: FinanceMainMenuPage,
      },
      {
        path: FinanceRoutePaths.InvoiceMenu,
        component: InvoicesMenuPage,
      },
      {
        path: `${FinanceRoutePaths.InvoiceMenu}/${FinanceRoutePaths.InvoicesView}`,
        component: InvoicesViewPage,
      },
      {
        path: `${FinanceRoutePaths.InvoiceMenu}/${FinanceRoutePaths.InvoiceDetail}`,
        component: InvoiceDetailPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceRoutingModule {}
