import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordScreen } from './forgot-password.screen';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordScreen;
  let fixture: ComponentFixture<ForgotPasswordScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
