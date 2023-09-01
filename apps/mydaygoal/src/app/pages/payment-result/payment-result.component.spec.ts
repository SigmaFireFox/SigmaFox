import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentResultPage } from './payment-result.component';

describe('PaymentResultComponent', () => {
  let component: PaymentResultPage;
  let fixture: ComponentFixture<PaymentResultPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentResultPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
