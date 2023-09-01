import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentResponse } from '../pages/payment-result/payment-result.component';

export interface PeachRequest {
  entityId: string;
  amount: string;
  currency: string;
  paymentType: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentsPeachService {
  url: string = '';
  paymentData = {} as PeachRequest;
  headers = {} as Object;
  httpOptions = {} as Object;

  constructor(private http: HttpClient) {}

  async postCheckout(): Promise<any> {
    this.setCheckoutData();
    return this.http
      .post(this.url, this.paymentData, this.httpOptions)
      .toPromise();
  }

  async getPaymentStatus(id: string): Promise<PaymentResponse> {
    this.setPaymemtStatusRequestData(id);
    return this.http
      .get(this.url, this.httpOptions)
      .toPromise() as unknown as PaymentResponse;
  }

  private setCheckoutData(): void {
    this.url = '/api/v1/checkouts';

    this.paymentData = {
      entityId: '8ac7a4c77e761278017e778ce143023a',
      amount: '92.00',
      currency: 'ZAR',
      paymentType: 'DB',
    };

    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Content-Type', Object.keys(this.paymentData).length.toString())
      .set(
        'Authorization',
        'Bearer OGFjN2E0Y2E3ZTc2MWI3NzAxN2U3NzhjZDZlNDA5MGJ8MkJSRmZGV0VaRw=='
      )
      .set('Access-Control-Allow-Origin', '*');

    this.httpOptions = {
      headers: this.headers as HttpHeaders,
      params: this.paymentData as unknown as HttpParams,
    } as Object;
  }

  private setPaymemtStatusRequestData(resourcePath: string) {
    this.url =
      'api/' + resourcePath + '?entityId=8ac7a4c77e761278017e778ce143023a';

    this.headers = new HttpHeaders()
      .set(
        'Authorization',
        'Bearer OGFjN2E0Y2E3ZTc2MWI3NzAxN2U3NzhjZDZlNDA5MGJ8MkJSRmZGV0VaRw=='
      )
      .set('Access-Control-Allow-Origin', '*');

    this.httpOptions = {
      headers: this.headers as HttpHeaders,
    } as Object;
  }
}
