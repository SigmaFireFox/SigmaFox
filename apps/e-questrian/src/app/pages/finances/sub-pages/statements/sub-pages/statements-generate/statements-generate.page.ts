import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenerateStatementParameters } from 'apps/e-questrian/src/app/modals/generate-statement/generate-statement.modal';
import { StatementsService } from 'apps/e-questrian/src/app/services/statements/statements.service';
import { FinanceRoutePaths } from '../../../../models/routing.enums';

@Component({
  selector: 'app-invoices-view-page',
  templateUrl: './statements-generate.page.html',
  styleUrls: ['./statements-generate.page.scss'],
})
export class StatementsGeneratePage {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  generateStatement(params: GenerateStatementParameters) {
    this.router.navigate([`../${FinanceRoutePaths.StatementsDetail}`], {
      relativeTo: this.activatedRoute,
      queryParams: {
        client: params.client,
        startDate: new Date(params.startDate).getTime(),
        endDate: new Date(params.endDate).getTime(),
      },
    });
  }

  onParamsCancelled() {
    this.router.navigate([`../../${FinanceRoutePaths.FinanceMenu}`], {
      relativeTo: this.activatedRoute,
    });
  }
}
