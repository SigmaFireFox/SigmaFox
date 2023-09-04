import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterChart } from './scatter.chart';

describe('ScatterChart', () => {
  let component: ScatterChart;
  let fixture: ComponentFixture<ScatterChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScatterChart],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
