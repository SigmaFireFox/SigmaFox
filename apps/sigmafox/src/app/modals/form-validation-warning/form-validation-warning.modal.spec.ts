import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormValidationWarningModal } from './form-validation-warning.modal';

describe('FormValidationWarningComponent', () => {
  let component: FormValidationWarningModal;
  let fixture: ComponentFixture<FormValidationWarningModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormValidationWarningModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormValidationWarningModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
