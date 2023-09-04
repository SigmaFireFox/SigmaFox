import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatesFinancialHistoryForm } from './estimates-financial-history.form';

describe('EstimatesFinancialHistoryForm', () => {
  let component: EstimatesFinancialHistoryForm;
  let fixture: ComponentFixture<EstimatesFinancialHistoryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstimatesFinancialHistoryForm],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatesFinancialHistoryForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
