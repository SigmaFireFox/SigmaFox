/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoicingService } from '../../services/invoicing.service';
import { PaymentsPeachService } from '../../services/payments-peach.service';
import {
  AppUserProfile,
  UserPlan,
  PlanTerm,
  UserProfileService,
} from '../../services/user-profile.service';

export interface PaymentResponse {
  amount: string;
  buildNumber: string;
  card: PaymentCard;
  currency: string;
  customParameters: PaymentCustomParameters;
  customer: PaymentCustomer;
  descriptor: string;
  id: string;
  ndc: string;
  paymentBrand: string;
  paymentType: string;
  result: PaymentResult;
  risk: { score: string };
  threeDSecure: Payment3DSecure;
  timestamp: string;
}

export interface PaymentCard {
  bin: string;
  binCountry: string;
  expiryMonth: string;
  expiryYear: string;
  holder: string;
  last4Digits: string;
}

export interface PaymentCustomParameters {
  CTPE_DESCRIPTOR_TEMPLATE: string;
  SHOPPER_EndToEndIdentity: string;
}

export interface PaymentCustomer {
  ip: string;
  ipCountry: string;
}

export interface PaymentResult {
  code: string;
  description: string;
}

export interface PaymentRisk {
  score: string;
}

export interface Payment3DSecure {
  eci: string;
}

@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.scss'],
})
export class PaymentResultPage implements OnInit {
  userProfile = {} as AppUserProfile;
  resourcePath = '';
  checkoutId = '';
  paymentResponse = {} as PaymentResponse;
  paymentSucessfull = false;
  newPlanReceived = false;
  userProfileReady = false;
  newPlanDescription = '';
  newTermDescription = '';
  newPlan = { plan: UserPlan.FREE, term: PlanTerm.NONE };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private paymentService: PaymentsPeachService,
    private invoicingService: InvoicingService,
    private userProfileService: UserProfileService
  ) {}

  async ngOnInit() {
    this.initialiseSubscriptions();
    await this.getPaymentResponse();
  }

  onToGoalsClicked() {
    this.router.navigateByUrl('/');
  }

  onToProfileClicked() {
    this.router.navigateByUrl('/user-profile');
  }

  private initialiseSubscriptions() {
    this.userProfileService.currentUserProfile$.subscribe((userProfile) => {
      this.updateUserProfile(userProfile);
    });
    this.invoicingService.upgradedPlanAndTerm$.subscribe((plan) => {
      this.setUpgradedPlan(plan);
    });
  }

  private updateUserProfile(userProfile: AppUserProfile) {
    if (Object.keys(userProfile).length !== 0) {
      if (this.userProfile !== userProfile) {
        this.userProfile = userProfile;
        this.userProfileReady = true;
        this.updateUserPlan();
      }
    }
  }

  private setUpgradedPlan(plan: { plan: UserPlan; term: PlanTerm }) {
    this.newPlan = plan;
    plan.plan === 1
      ? (this.newPlanDescription = 'Basic')
      : (this.newPlanDescription = 'Premium');
    plan.term === 1
      ? (this.newTermDescription = 'month-to-month basis')
      : plan.term === 2
      ? (this.newTermDescription = 'six month term')
      : (this.newTermDescription = 'twelve month term');
    this.newPlanReceived = true;
    this.updateUserPlan();
  }

  private async getPaymentResponse() {
    this.route.queryParams.subscribe((params) => {
      this.resourcePath = params['resourcePath'];
    });
    this.paymentResponse = (await this.paymentService.getPaymentStatus(
      this.resourcePath
    )) as PaymentResponse;
    this.setPaymentSucessStatus();
    this.updateUserPlan();
  }

  private setPaymentSucessStatus() {
    // TODO: More logic to go here
    this.paymentSucessfull = true;
  }

  private updateUserPlan() {
    if (
      this.newPlanReceived &&
      this.paymentSucessfull &&
      this.userProfileReady
    ) {
      this.userProfileService.setUserNewPlan(this.newPlan);
    }
  }
}
