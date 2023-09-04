import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateResultsRegressionComponent } from './estimate-results-regression.component';

describe('EstimateResultsRegressionComponent', () => {
  let component: EstimateResultsRegressionComponent;
  let fixture: ComponentFixture<EstimateResultsRegressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimateResultsRegressionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateResultsRegressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
