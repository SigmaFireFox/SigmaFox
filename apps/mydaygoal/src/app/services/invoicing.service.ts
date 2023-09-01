import { Injectable } from '@angular/core';
import { UserProfile } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { AppUserProfile, PlanTerm, UserPlan } from './user-profile.service';

export interface InvoiceDetail {
  invoiceNumber: string;
  invoiceAmount: number;
}

export interface PricingStructure {
  monthly: number;
  sixMotnths: number;
  twelveMonths: number;
}

export interface PlanPricing {
  basic: PricingStructure;
  premium: PricingStructure;
}

export interface RebateDetail {
  rebateDue: boolean;
  previousPlan: UserPlan;
  monthsRebated: number;
  rebateAmount: number;
}

@Injectable({
  providedIn: 'root',
})
export class InvoicingService {
  private today = new Date();
  private userPlan = UserPlan;
  private planTerm = PlanTerm;

  private upgradedPlanAndTerm = new BehaviorSubject<{
    plan: UserPlan;
    term: PlanTerm;
  }>({ plan: this.userPlan.FREE, term: this.planTerm.NONE });
  upgradedPlanAndTerm$ = this.upgradedPlanAndTerm.asObservable();

  constructor() {
    this.getNewPlanFromSessionStorage();
  }

  get planPricing() {
    const baseprice = { basic: 1, premium: 3 };
    let pricingPlan = {} as PlanPricing;
    Object.keys(baseprice).forEach((key) => {
      pricingPlan[key as keyof PlanPricing] = {
        monthly: baseprice[key as keyof PlanPricing],
        sixMotnths: baseprice[key as keyof PlanPricing] * 5,
        twelveMonths: baseprice[key as keyof PlanPricing] * 9,
      };
    });
    return pricingPlan;
  }

  getInvoice(planSelected: UserPlan, termSelected: PlanTerm): InvoiceDetail {
    let invoice = {} as InvoiceDetail;
    let plan = {} as PricingStructure;
    planSelected === this.userPlan.BASIC
      ? (plan = this.planPricing.basic)
      : (plan = this.planPricing.premium);
    termSelected === this.planTerm.MONTHLY
      ? (invoice.invoiceAmount = plan.monthly)
      : termSelected === this.planTerm.SIX_MONTHS
      ? (invoice.invoiceAmount = plan.sixMotnths)
      : (invoice.invoiceAmount = plan.twelveMonths);
    return invoice;
  }

  getRebate(userProfile: AppUserProfile): RebateDetail {
    let rebate = {
      previousPlan: userProfile.accountDetails.planType,
    } as RebateDetail;
    if (userProfile.accountDetails.planType === this.userPlan.FREE) {
      rebate.rebateDue = false;
      rebate.monthsRebated = 0;
      rebate.rebateAmount = 0;
    } else {
      rebate.rebateDue = true;
      rebate.monthsRebated = this.getMonthsToBeRebated(userProfile);
      rebate.monthsRebated !== 0
        ? (rebate.rebateAmount = this.getRebateAmount(
            rebate.previousPlan,
            userProfile.accountDetails.planTerm,
            rebate.monthsRebated
          ))
        : (rebate.rebateAmount = 0);
    }
    return rebate;
  }

  setNewPlanToSessionStorage(planSelected: UserPlan, termSelected: PlanTerm) {
    this.upgradedPlanAndTerm.next({ plan: planSelected, term: termSelected });
    sessionStorage.setItem(
      'newPlan',
      JSON.stringify({ plan: planSelected, term: termSelected })
    );
  }

  getNewPlanFromSessionStorage() {
    let newPlanString = sessionStorage.getItem('newPlan');
    let newPlan = {
      plan: UserPlan.FREE,
      term: PlanTerm.NONE,
    };
    newPlanString ? (newPlan = JSON.parse(newPlanString)) : null;
    this.upgradedPlanAndTerm.next(newPlan);
  }

  private getMonthsToBeRebated(userProfile: AppUserProfile): number {
    let expireDate = userProfile.accountDetails.paidUpUntil as Date;
    const dayDiff = expireDate.getDate() - this.today.getDate();
    const monthDiff = expireDate.getMonth() - this.today.getMonth();
    const yearDiff = expireDate.getFullYear() - this.today.getFullYear();
    let dayFactor = 0;
    dayDiff < 0 ? (dayFactor = -1) : (dayFactor = 0);
    return dayFactor + monthDiff + yearDiff * 12;
  }

  private getRebateAmount(
    previousPlan: UserPlan,
    previousPlanTerm: PlanTerm,
    monthsToRebate: number
  ): number {
    let plan = {} as PricingStructure;
    previousPlan === this.userPlan.BASIC
      ? (plan = this.planPricing.basic)
      : (plan = this.planPricing.premium);
    return previousPlanTerm === this.planTerm.MONTHLY
      ? (plan.monthly * monthsToRebate) / 1
      : previousPlanTerm === this.planTerm.SIX_MONTHS
      ? (plan.sixMotnths * monthsToRebate) / 6
      : (plan.twelveMonths * monthsToRebate) / 12;
  }
}
