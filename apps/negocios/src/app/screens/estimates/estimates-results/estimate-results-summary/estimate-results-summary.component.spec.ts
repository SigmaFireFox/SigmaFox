import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateResultsSummaryComponent } from './estimate-results-summary.component';

describe('EstimateResultsSummaryComponent', () => {
  let component: EstimateResultsSummaryComponent;
  let fixture: ComponentFixture<EstimateResultsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimateResultsSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateResultsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
