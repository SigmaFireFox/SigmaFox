import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatesLegalScreen } from './estimates-legal.screen';

describe('EstimatesLegalScreen', () => {
  let component: EstimatesLegalScreen;
  let fixture: ComponentFixture<EstimatesLegalScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstimatesLegalScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatesLegalScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
