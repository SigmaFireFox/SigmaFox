import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { EstimatesFinancialHistory } from '../../../~global-interfaces/estimates-financial-history.interface';
import { OptionElected } from '../../../~global-interfaces/estimates-opening-balances.interface';

@Component({
  selector: 'app-estimates-opening-balances-screen',
  templateUrl: './estimates-opening-balances.screen.html',
  styleUrls: ['./estimates-opening-balances.screen.scss'],
})
export class EstimatesOpeningBalancesScreen {
  @Input() firstFinancialYearData = {} as EstimatesFinancialHistory;
  @Input() optionElectedRequested: Observable<boolean> | undefined;
  @Input() openingBalancesRequested: Observable<boolean> | undefined;

  @Output() OptionElected = new EventEmitter<OptionElected>();
  @Output() OpeningBalances = new EventEmitter<EstimatesFinancialHistory>();
  @Output() OpeningBalanceImbalanced = new EventEmitter<void>();

  optionElected = OptionElected.NONE;
  optionEnter = false;
  optionZero = false;
  optionIgnore = false;

  optionRequestSubscription: Subscription | undefined;
  balanceRequestSubscription: Subscription | undefined;
  $requestOpeningBalanceFormBalances = new BehaviorSubject(false);

  ngOnInit(): void {
    this.setSubscriptionsRequired();
  }

  amendOptionElected(option: OptionElected) {
    this.optionElected = option;
    switch (option) {
      case OptionElected.ENTER_BALANCES: {
        this.optionZero = false;
        this.optionIgnore = false;
        break;
      }
      case OptionElected.ZERO_BASE: {
        this.optionEnter = false;
        this.optionIgnore = false;
        break;
      }
      case OptionElected.IGNORE: {
        this.optionEnter = false;
        this.optionZero = false;
        break;
      }
    }
  }

  handleReceivedOpeningBalances(openingBalances: EstimatesFinancialHistory) {
    if (
      openingBalances.assetsTotal === openingBalances.equityAndLiabiltiesTotal
    ) {
      this.OpeningBalances.emit(openingBalances);
    } else {
      this.OpeningBalanceImbalanced.emit();
    }
  }

  private setSubscriptionsRequired() {
    this.optionRequestSubscription = this.optionElectedRequested!.subscribe(
      (optionElectedRequested) => {
        optionElectedRequested ? this.submitOptionElected() : null;
      }
    );
    this.balanceRequestSubscription = this.openingBalancesRequested!.subscribe(
      (openingBalancesRequested) => {
        openingBalancesRequested ? this.submitOpeningBalances() : null;
      }
    );
  }

  private submitOptionElected() {
    this.OptionElected.emit(this.optionElected);
  }

  private submitOpeningBalances() {
    this.$requestOpeningBalanceFormBalances.next(true);
  }
}
