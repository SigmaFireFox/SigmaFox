import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPricingScheduleComponent } from './material-pricing-schedule.component';

describe('MaterialPricingScheduleComponent', () => {
  let component: MaterialPricingScheduleComponent;
  let fixture: ComponentFixture<MaterialPricingScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialPricingScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialPricingScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
