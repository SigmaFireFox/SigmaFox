import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatesResultsScreen } from './estimates-results.screen';

describe('EstimatesResultsScreen', () => {
  let component: EstimatesResultsScreen;
  let fixture: ComponentFixture<EstimatesResultsScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstimatesResultsScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatesResultsScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
