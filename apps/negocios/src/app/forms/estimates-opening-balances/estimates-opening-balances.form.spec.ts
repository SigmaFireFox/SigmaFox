import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatesOpeningBalancesForm } from './estimates-opening-balances.form';

describe('EstimatesOpeningBalancesComponent', () => {
  let component: EstimatesOpeningBalancesForm;
  let fixture: ComponentFixture<EstimatesOpeningBalancesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstimatesOpeningBalancesForm],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatesOpeningBalancesForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
