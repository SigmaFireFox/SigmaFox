import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatesOpeningBalancesScreen } from './estimates-opening-balances.screen';

describe('EstimatesOpeningBalancesComponent', () => {
  let component: EstimatesOpeningBalancesScreen;
  let fixture: ComponentFixture<EstimatesOpeningBalancesScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstimatesOpeningBalancesScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatesOpeningBalancesScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
