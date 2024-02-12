import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FinancialDocListPageConfig,
  FinancialDocType,
  MenuPageConfig,
  ProcessResultsPageConfig,
} from 'apps/e-questrian/src/app/interfaces/common-page-configs.interface';
import {
  OptionStyling,
  PathType,
} from 'apps/e-questrian/src/app/interfaces/menu-options.interface';
import { GenerateStatementParameters } from 'apps/e-questrian/src/app/modals/generate-statement/generate-statement.modal';
import { StatementsService } from 'apps/e-questrian/src/app/services/statements/statements.service';
import { FinanceRoutePaths } from '../../../../models/routing.enums';

export enum ViewState {
  PARAMS,
  RESULTS,
}

@Component({
  selector: 'app-invoices-view-page',
  templateUrl: './statements-detail.page.html',
  styleUrls: ['./statements-detail.page.scss'],
})
export class StatementsDetailPage {
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
        display: 'Generate New Statement',
        pathConfig: {
          path: FinanceRoutePaths.StatementsGenerate,
          type: PathType.Sibling,
        },
        styling: OptionStyling.Primary,
      },
      {
        display: 'Back to Finance Menu',
        pathConfig: {
          path: FinanceRoutePaths.FinanceMenu,
          type: PathType.Parent,
        },
        styling: OptionStyling.Secondary,
      },
    ],
  } as MenuPageConfig;

  statementPageConfig = {
    header: '',
    subHeader: 'Statement',
    financialDocType: FinancialDocType.STATEMENT,
    isVoidToggable: false,
    items: [],
  } as FinancialDocListPageConfig;

  constructor(
    private activatedRoute: ActivatedRoute,
    private statementService: StatementsService,
    private router: Router
  ) {}

  ngOnInit() {
    const clientID = this.activatedRoute.snapshot.queryParams['client'];
    const startDate = this.activatedRoute.snapshot.queryParams['startDate'];
    const endDate = this.activatedRoute.snapshot.queryParams['endDate'];

    if (!clientID || !startDate || !endDate) return;

    const params: GenerateStatementParameters = {
      client: clientID,
      startDate: new Date(+startDate),
      endDate: new Date(+endDate),
    };

    this.statementPageConfig.items =
      this.statementService.generateStatement(params);
  }

  onStatementItemClicked(document: {
    docType: FinancialDocType;
    docNum: number;
  }) {
    if (document.docType === FinancialDocType.INVOICE) {
      this.router.navigate(
        [
          `../../${FinanceRoutePaths.InvoiceMenu}/${FinanceRoutePaths.InvoiceDetail}`,
        ],
        {
          relativeTo: this.activatedRoute,
          queryParams: {
            invoiceID: document.docNum,
            returnTo: 'Statement',
          },
        }
      );
    }
  }
}
