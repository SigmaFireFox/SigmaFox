import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  WarningsModal,
  WarningSubjectType,
  WarningType,
} from './warnings.component';

describe('WarningsModal', () => {
  let component: WarningsModal;
  let fixture: ComponentFixture<WarningsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarningsModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit()', () => {
    describe('setHeader()', () => {
      it('given WarningType is EDIT_SAVE, sjould set header to "Changes made"', () => {
        // Assemble
        component.warning = WarningType.EDIT_SAVE;

        // Act
        component.ngOnInit();

        // Assert
        expect(component.header).toBe('Changes made');
      });

      it('given WarningType is EDIT_CANCEL, sjould set header to "Changes made"', () => {
        // Assemble
        component.warning = WarningType.EDIT_CANCEL;

        // Act
        component.ngOnInit();

        // Assert
        expect(component.header).toBe('Changes made');
      });

      it('given WarningType is TIME_EXCESSIVE, sjould set header to "Long meeting duration"', () => {
        // Assemble
        component.warning = WarningType.TIME_EXCESSIVE;

        // Act
        component.ngOnInit();

        // Assert
        expect(component.header).toBe('Long meeting duration');
      });
    });

    describe('setBody()', () => {
      beforeEach(() => {
        component.subject = WarningSubjectType.APPOINTMENT;
      });

      it('given WarningType is EDIT_SAVE, should set bpdy accordingly', () => {
        // Assemble
        component.warning = WarningType.EDIT_SAVE;
        const expectedBody =
          'Changes have been made to the appointment. Are you sure you want to save these changes?';

        // Act
        component.ngOnInit();

        // Assert
        expect(component.body).toBe(expectedBody);
      });

      it('given WarningType is EDIT_CANCEL, should set bpdy accordingly', () => {
        // Assemble
        component.warning = WarningType.EDIT_CANCEL;
        const expectedBody =
          'Changes have been made to the appointment. Are you sure you want to cancel these changes?';

        // Act
        component.ngOnInit();

        // Assert
        expect(component.body).toBe(expectedBody);
      });

      it('given WarningType is TIME_EXCESSIVE, should set bpdy accordingly', () => {
        // Assemble
        component.warning = WarningType.TIME_EXCESSIVE;
        const expectedBody =
          'We notices the duration for this appointment is longer than 2 hours. Are you sure this is correct?';

        // Act
        component.ngOnInit();

        // Assert
        expect(component.body).toBe(expectedBody);
      });
    });

    describe('setButtons()', () => {
      beforeEach(() => {
        component.subject = WarningSubjectType.APPOINTMENT;
      });

      it('given WarningType is EDIT_SAVE, should set bpdy accordingly', () => {
        // Assemble
        component.warning = WarningType.EDIT_SAVE;
        const expectedProceedText = 'Yes - save appointment';
        const expectedCancelText = 'No - do not save';

        // Act
        component.ngOnInit();

        // Assert
        expect(component.proceedButtonText).toBe(expectedProceedText);
        expect(component.cancelButtonText).toBe(expectedCancelText);
      });

      it('given WarningType is EDIT_CANCEL, should set bpdy accordingly', () => {
        // Assemble
        component.warning = WarningType.EDIT_CANCEL;
        const expectedProceedText = 'Yes - cancel changes';
        const expectedCancelText = 'No - keep changes';

        // Act
        component.ngOnInit();

        // Assert
        expect(component.proceedButtonText).toBe(expectedProceedText);
        expect(component.cancelButtonText).toBe(expectedCancelText);
      });

      it('given WarningType is TIME_EXCESSIVE, should set bpdy accordingly', () => {
        // Assemble
        component.warning = WarningType.TIME_EXCESSIVE;
        const expectedProceedText = 'Yes - that is correct';
        const expectedCancelText = 'No - let me change that';

        // Act
        component.ngOnInit();

        // Assert
        expect(component.proceedButtonText).toBe(expectedProceedText);
        expect(component.cancelButtonText).toBe(expectedCancelText);
      });
    });
  });
});
