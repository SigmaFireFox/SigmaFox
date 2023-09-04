import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EstimatesFinancialHistory } from '../../~global-interfaces/estimates-financial-history.interface';
import { EstimatesBasics } from '../../~global-interfaces/estimates-basics.interface';
import {
  EstimatesLegalStatus,
  IncompleteEstimatesLegalStatus,
} from '../../~global-interfaces/estimates-legal.interface';
import {
  Button,
  NotificationContent,
} from '../../~global-interfaces/notification-content.interface';
import { EstimateError } from './EstimateErrors.enum';
import { ViewState } from './ViewState.enum';
import { OptionElected } from '../../~global-interfaces/estimates-opening-balances.interface';
import { EstimatesCashFlowService } from '../../services/estimates/estimates-cashflows.service';
import { EstimatesCashFlowYear } from '../../~global-interfaces/estimates-cashflows.interface';
import { EstimatesForecastsService } from '../../services/estimates/estimates-forecasts.service';

@Component({
  selector: 'app-estimates-page',
  templateUrl: './estimates.page.html',
  styleUrls: ['./estimates.page.scss'],
})
export class EstimatesPage implements OnInit {
  // View States
  ViewState = ViewState;
  currentViewState = ViewState.RESULTS;

  // Navigation buttons
  showBackBtn: boolean = false;
  showForwardBtn: boolean = true;
  showNotification: boolean = false;
  primarySpecialBtnText: string = 'Go to Desktop Valuations';
  secondarySpecialBtnText: string = 'Go to Full Valuations';

  // Error handling
  userNotification = {} as NotificationContent;
  currentError = EstimateError.NONE;

  // Screen and Data management
  $requestLegalScreenData = new BehaviorSubject(false);
  $requestBasicScreenData = new BehaviorSubject(false);
  $requestHistoryScreenData = new BehaviorSubject(false);
  $requestOpeningBalanceScreenOptionElected = new BehaviorSubject(false);
  $requestOpeningBalanceScreenBalances = new BehaviorSubject(false);
  estimateLegalStatus: EstimatesLegalStatus | undefined;
  estimateBasicDetails: EstimatesBasics | undefined;
  numberOfYearsRequired: number = 2;
  lastFinancialYear: number = new Date().getFullYear();
  financialHistory: EstimatesFinancialHistory[] = [];
  firstFinancialYearData = {} as EstimatesFinancialHistory;
  cashFlows: EstimatesCashFlowYear[] = [];

  constructor(
    private estimatesCashFlowService: EstimatesCashFlowService,
    private estimatesResultsService: EstimatesForecastsService
  ) {}

  ngOnInit() {
    this.showBackBtn = this.currentViewState !== ViewState.INTRO;
    this.setSubscriptionsRequired();
  }

  // Functions to handle page navigation buttons
  goBack() {
    switch (this.currentViewState) {
      case ViewState.LEGAL: {
        this.currentViewState = ViewState.INTRO;
        this.primarySpecialBtnText = 'Go to Desktop Valuations';
        this.secondarySpecialBtnText = 'Go to Full Valuations';
        break;
      }
      case ViewState.BASICS: {
        this.$requestBasicScreenData.next(false);
        this.currentViewState = ViewState.LEGAL;
        break;
      }
      case ViewState.FINANCIAL_HISTORY: {
        this.$requestLegalScreenData.next(false);
        this.currentViewState = ViewState.BASICS;
        break;
      }
      case ViewState.OPENING_BALANCES: {
        this.$requestHistoryScreenData.next(false);
        this.currentViewState = ViewState.FINANCIAL_HISTORY;
        break;
      }
      case ViewState.CONFIRMATION: {
        if (
          this.firstFinancialYearData.eqRetainedEarningsOpening !== undefined
        ) {
          this.$requestOpeningBalanceScreenOptionElected.next(false);
          this.$requestOpeningBalanceScreenBalances.next(false);
          this.currentViewState = ViewState.OPENING_BALANCES;
        } else {
          this.$requestHistoryScreenData.next(false);
          this.currentViewState = ViewState.FINANCIAL_HISTORY;
        }
        break;
      }
    }
  }

  goForward() {
    switch (this.currentViewState) {
      case ViewState.INTRO: {
        this.currentViewState = ViewState.LEGAL;
        this.primarySpecialBtnText = '';
        this.secondarySpecialBtnText = '';
        this.showBackBtn = true;
        break;
      }
      case ViewState.LEGAL: {
        this.$requestLegalScreenData.next(true);
        break;
      }
      case ViewState.BASICS: {
        this.$requestBasicScreenData.next(true);
        break;
      }
      case ViewState.FINANCIAL_HISTORY: {
        this.$requestHistoryScreenData.next(true);
        break;
      }
      case ViewState.OPENING_BALANCES: {
        this.$requestOpeningBalanceScreenOptionElected.next(true);
        break;
      }
      case ViewState.CONFIRMATION: {
        this.confirmWithUser();
        break;
      }
    }
  }

  onPrimarySpecialBtnClick() {
    switch (this.currentViewState) {
      case ViewState.INTRO: {
        // TODO: Go to sign up - but with entended end to be desktop valuations
        break;
      }
    }
  }

  onSecondarySpecialBtnClick() {
    switch (this.currentViewState) {
      case ViewState.INTRO: {
        // TODO: Go to sign up - but with entended end to be full valuations
        break;
      }
    }
  }

  //Functions required to handle data return responses from various screens
  acceptLegalStatus(status: EstimatesLegalStatus) {
    this.estimateLegalStatus = status;
    this.currentViewState = ViewState.BASICS;
  }

  handleIncompleteLegalStatus(status: IncompleteEstimatesLegalStatus) {
    // TODO: Needs to be a list to be sent to notify user
    this.currentError = EstimateError.INCOMPLETE_LEGAL;
    this.notifyUser();
  }

  acceptBasicDetail(basicDetails: EstimatesBasics) {
    this.estimateBasicDetails = basicDetails;
    this.numberOfYearsRequired =
      this.estimateBasicDetails.targetEntityFinancialHistoryYears;
    this.lastFinancialYear =
      this.estimateBasicDetails.targetEntityLastFinancialYear;
    this.currentViewState = ViewState.FINANCIAL_HISTORY;
  }

  handleIncompleteBasicDetail(incompleteBasicDetailsList: string[]) {
    this.currentError = EstimateError.INCOMPLETE_BASICS;
    this.notifyUser(incompleteBasicDetailsList);
  }

  acceptFinancialHistory(financialHistory: EstimatesFinancialHistory[]) {
    this.financialHistory = financialHistory;
    if (this.financialHistory[0].eqRetainedEarningsOpening > 0) {
      this.firstFinancialYearData = this.financialHistory[0];
      this.currentViewState = ViewState.OPENING_BALANCES;
    } else {
      this.estimatesCashFlowService.generateCashFlowStatements(
        this.financialHistory,
        OptionElected.NONE
      );
      this.currentViewState = ViewState.CONFIRMATION;
    }
  }

  handleFinancialHistoryErrors(errors: string[]) {
    this.currentError = EstimateError.FINANCIAL_HISTORY_ERRORS;
    this.notifyUser(errors);
  }

  handleFinancialHistoryWarnings(warnings: string[]) {}

  acceptOpeningBalancesOptionElected(optionElected: OptionElected) {
    switch (optionElected) {
      case OptionElected.NONE: {
        this.currentError = EstimateError.NO_OPENING_BALANCE_OPTION_ELECTED;
        this.notifyUser();
        // TOOO:
        break;
      }
      case OptionElected.ENTER_BALANCES: {
        this.$requestOpeningBalanceScreenBalances.next(true);
        break;
      }
      case OptionElected.ZERO_BASE: {
        // TOOO: Make all opening balances zero
        this.estimatesCashFlowService.generateCashFlowStatements(
          this.financialHistory,
          OptionElected.ZERO_BASE
        );
        this.currentViewState = ViewState.CONFIRMATION;
        break;
      }
      case OptionElected.IGNORE: {
        // TOOO: Ignore first year data or if only one year - ignore cash flow statement
        this.estimatesCashFlowService.generateCashFlowStatements(
          this.financialHistory,
          OptionElected.IGNORE
        );
        this.currentViewState = ViewState.CONFIRMATION;
        break;
      }
    }
  }

  acceptOpeningBalances(openingBalances: EstimatesFinancialHistory) {
    this.estimatesCashFlowService.generateCashFlowStatements(
      this.financialHistory,
      OptionElected.ENTER_BALANCES,
      openingBalances
    );
    this.currentViewState = ViewState.CONFIRMATION;
  }

  handleImbalancedOpeningBalances() {
    this.currentError = EstimateError.OPENING_BALANCE_IMBALANCED;
    this.notifyUser();
  }

  // Functions related to user notifications and warnings
  userNotificationPrimaryBtnClicked() {
    switch (this.currentViewState) {
      case ViewState.CONFIRMATION: {
        this.showNotification = false;
        this.estimatesResultsService.prepareForecasts(
          this.financialHistory,
          this.cashFlows
        );
        this.currentViewState = ViewState.RESULTS;
        return;
      }
      default: {
        this.showNotification = false;
      }
    }
  }

  userNotificationSecondaryBtnClicked() {
    this.showNotification = false;
  }

  private notifyUser(issuesList?: string[]) {
    switch (this.currentError) {
      case EstimateError.INCOMPLETE_LEGAL: {
        this.userNotification = {
          header: 'Um sorry',
          bodyText:
            `It seems you have not accepted or answered all the required questions.` +
            '\n' +
            `In order to proceed, please ensure all required answers are complete.`,
          primaryBtn: { title: 'Got it' } as Button,
          secondaryBtn: { title: '' } as Button,
        };
        this.showNotification = true;
        break;
      }
      case EstimateError.INCOMPLETE_BASICS: {
        let issuesCopy: string = '';
        if (issuesList) {
          issuesList.forEach((issue) => {
            issuesCopy = issuesCopy + '❌' + issue + '\n';
          });
        }
        this.userNotification = {
          header: 'Sorry about this',
          bodyText:
            `It seems you have not provided all the information we require to proceed, specifically:` +
            '\n' +
            '\n' +
            issuesCopy +
            '\n' +
            '\n' +
            `Please provide the required information before trying to proceed.`,
          primaryBtn: { title: 'Got it' } as Button,
          secondaryBtn: { title: '' } as Button,
        };
        this.showNotification = true;
        break;
      }
      case EstimateError.FINANCIAL_HISTORY_ERRORS: {
        let issuesCopy: string = '';
        if (issuesList) {
          issuesList.forEach((issue) => {
            issuesCopy = issuesCopy + '❌' + issue + '\n';
          });
        }
        this.userNotification = {
          header: 'Something seems to be amis',
          bodyText:
            `There are errors in your financial history that prevents us from being able to proceed, specifically:` +
            '\n' +
            '\n' +
            issuesCopy +
            '\n' +
            '\n' +
            `Please address and correct the above mentioned errors before trying to proceed.`,
          primaryBtn: { title: 'Got it' } as Button,
          secondaryBtn: { title: '' } as Button,
        };
        this.showNotification = true;
        break;
      }
      case EstimateError.NO_OPENING_BALANCE_OPTION_ELECTED: {
        this.userNotification = {
          header: 'Err...',
          bodyText:
            `It seems you have not elected any of the options avaliable on this screen` +
            '\n' +
            `Please elect an option provided, before attempting to proceed.`,
          primaryBtn: { title: 'Got it' } as Button,
          secondaryBtn: { title: '' } as Button,
        };
        this.showNotification = true;
        break;
      }
      case EstimateError.OPENING_BALANCE_IMBALANCED: {
        this.userNotification = {
          header: 'Little problem',
          bodyText:
            `The opening balances you have provided don't seem to balance` +
            '\n' +
            `Please ensure that the opening balances entered balance, before attempting to proceed.`,
          primaryBtn: { title: 'Got it' } as Button,
          secondaryBtn: { title: '' } as Button,
        };
        this.showNotification = true;
        break;
      }
    }
  }

  private confirmWithUser() {
    switch (this.currentViewState) {
      case ViewState.CONFIRMATION: {
        this.userNotification = {
          header: 'Are you sure?',
          bodyText:
            `Before we move on, we just need to make 100% you are happy with the data presented.` +
            '\n' +
            `Note: if you confirm this, we will start the estimate calculation process, at which point
            any errors will no longer be fixable. Once the estiamte is complete - any chance you wish 
            to make will not be possible and you will need to start the process from the begining 
            (unless you convert this estiamte to a valuation)`,
          primaryBtn: { title: "Ya I'm sure" } as Button,
          secondaryBtn: { title: "Let's check again" } as Button,
        };
        this.showNotification = true;
        break;
      }
    }
  }

  // Functions for initilisation of page
  private setSubscriptionsRequired() {
    this.estimatesCashFlowService
      .getUpdatedCashFlowStatements()
      .subscribe((cashFlows) => {
        this.cashFlows = cashFlows;
      });
  }
}
