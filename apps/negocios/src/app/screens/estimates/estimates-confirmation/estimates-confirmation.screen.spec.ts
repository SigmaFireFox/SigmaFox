import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatesConfirmationScreen } from './estimates-confirmation.screen';

describe('EstimatesConfirmationComponent', () => {
  let component: EstimatesConfirmationScreen;
  let fixture: ComponentFixture<EstimatesConfirmationScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstimatesConfirmationScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatesConfirmationScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
