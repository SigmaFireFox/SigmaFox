import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MenuPageConfig,
  ProcessResultsPageConfig,
  ResultType,
} from 'apps/e-questrian/src/app/interfaces/common-page-configs.interface';
import {
  OptionStyling,
  PathType,
} from 'apps/e-questrian/src/app/interfaces/menu-options.interface';
import { GenerateInvoiceParameters } from 'apps/e-questrian/src/app/modals/generate-invoice/generate-invoice.modal';
import {
  GenerateInvoiceResult,
  InvoicesService,
} from 'apps/e-questrian/src/app/services/invoices/invoices.service';
import { FinanceRoutePaths } from '../../../../models/routing.enums';

export enum ViewState {
  PARAMS,
  RESULTS,
}

@Component({
  selector: 'app-invoices-view-page',
  templateUrl: './invoices-generate.page.html',
  styleUrls: ['./invoices-generate.page.scss'],
})
export class InvoicesGenerateParamsPage {
  isInvoiceGenerationComplete = true;
  currentViewState = ViewState.PARAMS;
  viewState = ViewState;

  generateInvoiceResultsPageConfig: ProcessResultsPageConfig =
    {} as ProcessResultsPageConfig;

  menuConfig = {
    header: '',
    subHeader: '',
    menu: [
      {
        display: 'View invoices',
        pathConfig: {
          path: FinanceRoutePaths.InvoicesList,
          type: PathType.Sibling,
        },
      },
      {
        display: 'Back to invoices menu',
        pathConfig: {
          path: FinanceRoutePaths.InvoiceMenu,
          type: PathType.Parent,
        },
        styling: OptionStyling.Secondary,
      },
    ],
  } as MenuPageConfig;

  constructor(
    private activatedRoute: ActivatedRoute,
    private invoiceService: InvoicesService,
    private router: Router
  ) {}

  onGenerateInvoicesClicked(params: GenerateInvoiceParameters) {
    const results = this.invoiceService.generateInvoices(params);
    this.setInvoiceGenerationResultsForDisplay(results);
    this.currentViewState = ViewState.RESULTS;
  }

  onCancelClicked() {
    this.router.navigate([`./../../${FinanceRoutePaths.InvoiceMenu}`], {
      relativeTo: this.activatedRoute,
    });
  }

  private setInvoiceGenerationResultsForDisplay(
    results: GenerateInvoiceResult
  ) {
    if (!results) return;
    this.generateInvoiceResultsPageConfig = results.numberOfInvoices
      ? {
          header: '',
          subHeader: 'Invoices generated',
          explainer:
            'The results of the invoice generation are presented below',
          results: [
            {
              description: 'Number of invoices generated',
              resultType: ResultType.NUMBER,
              result: results.numberOfInvoices,
            },
            {
              description: 'Clients invoices',
              resultType: ResultType.LIST,
              result: results.clients,
            },
            {
              description: 'Invoices date range - Start',
              resultType: ResultType.DATE,
              result: results.startDate,
            },
            {
              description: 'Invoices date range - End',
              resultType: ResultType.DATE,
              result: results.endDate,
            },
            {
              description: 'Total invoices value',
              resultType: ResultType.NUMBER,
              result: results.totalValue,
            },
            {
              description: 'Average value per invoice',
              resultType: ResultType.NUMBER,
              result: results.averageValue,
            },
            {
              description: 'Largest invoice value',
              resultType: ResultType.NUMBER,
              result: results.averageValue,
            },
          ],
        }
      : {
          header: '',
          subHeader: 'Unable to generate invoices',
          explainer:
            'We were unable to generate invoices based on the parameters provided. \
            Please consider widening your parameters to generate invoices',
          results: [],
        };
  }
}
