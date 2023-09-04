import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyChart } from './frequency.chart';

describe('FrequencyChart', () => {
  let component: FrequencyChart;
  let fixture: ComponentFixture<FrequencyChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrequencyChart],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequencyChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
