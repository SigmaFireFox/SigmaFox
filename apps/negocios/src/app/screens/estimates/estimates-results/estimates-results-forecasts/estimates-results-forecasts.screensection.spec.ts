import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatesResultsForecastsScreenSection } from './estimates-results-forecasts.screensection';

describe('EstimatesResultsForecastsScreenSection', () => {
  let component: EstimatesResultsForecastsScreenSection;
  let fixture: ComponentFixture<EstimatesResultsForecastsScreenSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstimatesResultsForecastsScreenSection],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatesResultsForecastsScreenSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
