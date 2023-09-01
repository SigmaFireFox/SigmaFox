import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInDetails, SignInModal } from './sign-in.modal';

describe('SignInModal', () => {
  let component: SignInModal;
  let fixture: ComponentFixture<SignInModal>;
  let registerSpy: jasmine.Spy;
  let signinSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInModal],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
    registerSpy = spyOn(component.register, 'emit');
    signinSpy = spyOn(component.signin, 'emit');
    component.signInForm.setValue(mockSignInForm);
  });

  const mockSignInForm = {
    email: 'bob@hope.com',
    password: 'Pass123',
  } as SignInDetails;

  describe('onSubmitClick()', () => {
    const expectedSignInDetails = mockSignInForm;

    it('given isRegister is true, should emit register with signin details', () => {
      // Assemble
      component.isRegister = true;
      registerSpy.and.callThrough();

      // Act
      component.onSubmitClick();

      // Assert
      expect(registerSpy).toHaveBeenCalledWith(expectedSignInDetails);
    });

    it('given isRegister is true, should emit signin with signin details', () => {
      // Assemble
      component.isRegister = false;
      signinSpy.and.callThrough();

      // Act
      component.onSubmitClick();

      // Assert
      expect(signinSpy).toHaveBeenCalledWith(expectedSignInDetails);
    });
  });

  describe('onRegisterClick()', () => {
    it('should set isRegister to true', () => {
      // Assemble
      component.isRegister = false;

      // Act
      component.onRegisterClick();

      // Assert
      expect(component.isRegister).toBeTrue();
    });
  });
});
