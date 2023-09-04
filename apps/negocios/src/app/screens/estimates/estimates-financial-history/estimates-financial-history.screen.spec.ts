import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatesFinancialHistoryScreen } from './estimates-financial-history.screen';

describe('EstimatesFinancialHistoryComponent', () => {
  let component: EstimatesFinancialHistoryScreen;
  let fixture: ComponentFixture<EstimatesFinancialHistoryScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstimatesFinancialHistoryScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatesFinancialHistoryScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
