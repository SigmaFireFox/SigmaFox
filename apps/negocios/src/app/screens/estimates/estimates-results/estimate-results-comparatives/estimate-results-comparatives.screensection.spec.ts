import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateResultsComparativesScreenSection } from './estimate-results-comparatives.screensection';

describe('EstimateResultsComparativesScreenSection', () => {
  let component: EstimateResultsComparativesScreenSection;
  let fixture: ComponentFixture<EstimateResultsComparativesScreenSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstimateResultsComparativesScreenSection],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateResultsComparativesScreenSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
