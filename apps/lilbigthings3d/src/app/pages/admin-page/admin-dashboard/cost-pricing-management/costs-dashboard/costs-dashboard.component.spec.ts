import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostsDashboardComponent } from './costs-dashboard.component';

describe('CostPricingManagementComponent', () => {
  let component: CostsDashboardComponent;
  let fixture: ComponentFixture<CostsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CostsDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CostsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
