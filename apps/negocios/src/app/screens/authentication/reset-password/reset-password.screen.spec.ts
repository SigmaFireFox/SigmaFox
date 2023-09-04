import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordScreen } from './reset-password.screen';

describe('ForgotPasswordComponent', () => {
  let component: ResetPasswordScreen;
  let fixture: ComponentFixture<ResetPasswordScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetPasswordScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
