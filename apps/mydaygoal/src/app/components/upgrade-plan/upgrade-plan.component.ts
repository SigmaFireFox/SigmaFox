/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthServiceResponse } from '../../services/authentication.service';
import {
  PricingStructure,
  InvoiceDetail,
  RebateDetail,
  InvoicingService,
} from '../../services/invoicing.service';
import { PaymentsPeachService } from '../../services/payments-peach.service';
import {
  AppUserProfile,
  UserPlan,
  PlanTerm,
  UserProfileService,
} from '../../services/user-profile.service';

export interface CheckoutReponse {
  id: string;
  ndc: string;
  result: { code: string; description: string };
  timestamp: string;
}

export enum ViewState {
  NONE,
  START,
  PLAN_OPTIONS,
  PLAN_TERM,
  AMOUNT_DUE,
  CHECKOUT,
}

export enum Warning {
  NONE,
  PLAN_NOT_SELECTED,
  TERM_NOT_SELECTED,
}

@Component({
  selector: 'app-upgrade-plan',
  templateUrl: './upgrade-plan.component.html',
  styleUrls: ['./upgrade-plan.component.scss'],
})
export class UpgradePlanComponent implements OnInit {
  @Output() upgradeCanceled = new EventEmitter<void>();
  @Output() upgradeComplete = new EventEmitter<void>();

  user = {} as AuthServiceResponse;
  userProfile = {} as AppUserProfile;
  viewState = ViewState;
  currentViewState = ViewState.NONE;
  warning = Warning;
  currentWarning = Warning.NONE;

  userPlan = UserPlan;
  planSelected = UserPlan.FREE;
  planTerm = PlanTerm;
  termSelected = PlanTerm.NONE;

  pricing = {} as PricingStructure;
  invoiceDetail = {} as InvoiceDetail;
  rebateDetail = {} as RebateDetail;
  newExpiryDate = new Date();
  newPlanString = '';
  checkout: CheckoutReponse | undefined;
  paymentWidgetScriptReturnUrl = '';
  paymentResultUrl = '';
  // Referanace: 'https://peachpayments.docs.oppwa.com/tutorials/integration-guide';

  constructor(
    private userProfileService: UserProfileService,
    private paymentService: PaymentsPeachService,
    private invoicingService: InvoicingService
  ) {}

  ngOnInit(): void {
    this.subscribedToAll();
    this.setStartScreen();
  }

  // Public functions required
  onNextClick() {
    this.currentWarning = Warning.NONE;
    switch (this.currentViewState) {
      case ViewState.START: {
        this.setPlanOptionsScreen();
        return;
      }
      case ViewState.PLAN_OPTIONS: {
        this.planSelected
          ? this.setTermOptionScreen()
          : (this.currentWarning = Warning.PLAN_NOT_SELECTED);
        return;
      }
      case ViewState.PLAN_TERM: {
        this.termSelected
          ? this.setAmountDueScreen()
          : (this.currentWarning = Warning.TERM_NOT_SELECTED);
        return;
      }
      case ViewState.AMOUNT_DUE: {
        this.setCheckoutScreen();
        return;
      }
    }
  }

  onBackClick() {
    switch (this.currentViewState) {
      case ViewState.PLAN_OPTIONS: {
        this.currentViewState = ViewState.START;
        return;
      }
      case ViewState.PLAN_TERM: {
        this.currentViewState = ViewState.PLAN_OPTIONS;
        return;
      }
      case ViewState.AMOUNT_DUE: {
        this.currentViewState = ViewState.PLAN_TERM;
        return;
      }
    }
  }

  onCancelClick() {
    this.upgradeCanceled.emit();
  }

  onPlanSelected(planSelected: UserPlan) {
    this.planSelected = planSelected;
  }

  onTermSelected(termSelected: PlanTerm) {
    this.termSelected = termSelected;
  }

  // Private functions for the initialisation of the flow
  private subscribedToAll() {
    this.userProfileService.currentUserProfile$.subscribe((userProfile) => {
      this.userProfile = userProfile;
      this.planSelected = this.userProfile.accountDetails.planType;
    });
  }

  private setStartScreen() {
    this.currentViewState = ViewState.START;
  }

  // Private functions required to set up screens in order of screens.
  // Sub functions related to the setting up of each screen is below
  // that screen's set up functions
  private async setPlanOptionsScreen() {
    switch (this.planSelected) {
      case this.userPlan.FREE: {
        this.currentViewState = ViewState.PLAN_OPTIONS;
        return;
      }
      default: {
        this.planSelected = UserPlan.PREMIUM;
        this.setTermOptionScreen();
      }
    }
  }

  private setTermOptionScreen() {
    this.planSelected === this.userPlan.BASIC
      ? (this.pricing = this.invoicingService.planPricing.basic)
      : (this.pricing = this.invoicingService.planPricing.premium);
    this.currentViewState = ViewState.PLAN_TERM;
  }

  private async setAmountDueScreen() {
    this.checkout = await this.paymentService.postCheckout();
    this.invoiceDetail = this.invoicingService.getInvoice(
      this.planSelected,
      this.termSelected
    );
    this.rebateDetail = this.invoicingService.getRebate(this.userProfile);
    this.currentViewState = ViewState.AMOUNT_DUE;
  }

  private setCheckoutScreen() {
    this.setPaymentForm();
    this.invoicingService.setNewPlanToSessionStorage(
      this.planSelected,
      this.termSelected
    );
    this.currentViewState = ViewState.CHECKOUT;
  }

  private async setPaymentForm() {
    this.paymentResultUrl = '/payment-result/';
    this.paymentWidgetScriptReturnUrl =
      'https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=' +
      this.checkout?.id +
      '';
    this.loadScript(this.paymentWidgetScriptReturnUrl);
  }

  private loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}
