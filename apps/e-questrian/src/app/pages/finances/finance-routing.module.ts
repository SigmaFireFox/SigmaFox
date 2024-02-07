import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancesPage } from './finances.page';
import { FinanceRoutePaths } from './models/routing.enums';
import { FinanceMainMenuPage } from './sub-pages/finance-main-menu/finance-main-menu.page';
import { InvoicesMenuPage } from './sub-pages/invoices-menu/invoices-menu.page';
import { InvoiceDetailPage } from './sub-pages/invoices-menu/sub-pages/invoice-detail/invoice-detail.page';
import { InvoicesGenerateParamsPage } from './sub-pages/invoices-menu/sub-pages/invoices-generate/invoices-generate.page';
import { InvoicesListPage } from './sub-pages/invoices-menu/sub-pages/invoices-list/invoices-list.page';

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
        path: `${FinanceRoutePaths.InvoiceMenu}/${FinanceRoutePaths.InvoicesList}`,
        component: InvoicesListPage,
      },
      {
        path: `${FinanceRoutePaths.InvoiceMenu}/${FinanceRoutePaths.InvoiceDetail}`,
        component: InvoiceDetailPage,
      },
      {
        path: `${FinanceRoutePaths.InvoiceMenu}/${FinanceRoutePaths.InvoiceGenerate}`,
        component: InvoicesGenerateParamsPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceRoutingModule {}
