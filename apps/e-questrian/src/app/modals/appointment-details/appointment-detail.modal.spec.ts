import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AppointmentModal, TimeOption } from './appointment-detail.modal';
import {
  AppointmentDetail,
  AppointmentType,
} from 'src/app/interfaces/appointments.interface';
import { ClientDetail } from 'src/app/interfaces/clients.interface';
import { WarningType } from '../warnings/warnings.component';
import { Time } from '@angular/common';

describe('NewAppointmentModal', () => {
  let component: AppointmentModal;
  let fixture: ComponentFixture<AppointmentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        ReactiveFormsModule,
      ],
      declarations: [AppointmentModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const mockAppointmentWithoutSubject = {
    type: AppointmentType.Lesson,
    client: { displayName: 'Bob Hope' },
    startTime: { hours: 10, minutes: 0 },
    duration: { hours: 1, minutes: 0 },
    date: new Date(2022, 1, 10),
  } as AppointmentDetail;
  const mockAppointmentWithSubject = {
    ...mockAppointmentWithoutSubject,
    subject: 'A current appointment',
  } as AppointmentDetail;
  const mockClient = { displayName: 'Bob Hope' } as ClientDetail;

  describe('ngOnInit()', () => {
    describe('given this is a new appointment', () => {
      beforeEach(() => {
        // Assemble
        component.currentAppointment = {} as AppointmentDetail;
        component.date = new Date(2022, 10, 11).getTime();
        component.proposedStartTime = { hours: 8, minutes: 0 };

        // Act
        component.ngOnInit();
      });

      const expectFormValues = {
        type: 0,
        subject: 'New appointment',
        date: new Date(2022, 10, 11),
        startTime: { hours: 8, minutes: 0 },
        duration: { hours: 0, minutes: 30 },
        client: '',
      };

      it('should set isNewAppointment to true', () => {
        // Assert
        expect(component.isNewAppointment).toBeTrue();
      });

      it('should set the header to "New appointment"', () => {
        // Assert
        expect(component.modalHeader).toBe('New appointment');
      });

      it('should set form as required', () => {
        // Assert
        expect(component.appointmentForm.value).toEqual(expectFormValues);
      });

      it('should set isEditable to true', () => {
        // Assert
        expect(component.isEditable).toBeTrue();
      });

      it('should set current appointment number to 0', () => {
        // Assert
        expect(component.currentAppointment.invoice).toBe(0);
      });
    });

    describe('given this is an existing appointment', () => {
      beforeEach(() => {
        // Assemble
        component.currentAppointment = mockAppointmentWithSubject;
        component.date = new Date(2022, 10, 11).getTime();
        component.proposedStartTime = { hours: 8, minutes: 0 };

        // Act
        component.ngOnInit();
      });

      const expectFormValues = {
        type: AppointmentType.Lesson,
        subject: 'A current appointment',
        date: new Date(2022, 10, 11),
        startTime: { hours: 10, minutes: 0 },
        duration: { hours: 1, minutes: 0 },
        client: 'Bob Hope',
      };

      it('should set isNewAppointment to false ', () => {
        // Assert
        expect(component.isNewAppointment).toBeFalse();
      });

      describe('given the current appointment has a subject', () => {
        it(`should set the header to that current appointment's subject`, () => {
          // Assert
          expect(component.modalHeader).toBe('A current appointment');
        });

        describe('given the current appointment has NO subject', () => {
          it(`should set the header to 'Edit appointment`, () => {
            // Assemble
            component.currentAppointment = mockAppointmentWithoutSubject;

            // Act
            component.ngOnInit();

            // Assert
            expect(component.modalHeader).toBe('Edit appointment');
          });
        });

        it('should set form as required', () => {
          // Assert
          expect(component.appointmentForm.value).toEqual(expectFormValues);
        });

        it('should set isEditable to false', () => {
          // Assert
          expect(component.isEditable).toBeFalse();
        });
      });
    });
  });

  describe('onSubmitClick()', () => {
    describe('given isRemoveAppointment is true', () => {
      beforeEach(() => {
        component.isRemoveAppointment = true;
      });

      it('should emit cancelAppointment', () => {
        // Assemble
        const emitSpy = spyOn(component.cancelAppointment, 'emit');

        // Act
        component.onSubmitClick();

        // Assert
        expect(emitSpy).toHaveBeenCalled();
      });
    });

    describe('given isRemoveAppointment is false', () => {
      beforeEach(() => {
        component.isRemoveAppointment = false;
      });

      describe('given isNewAppointment is true', () => {
        beforeEach(() => {
          component.isNewAppointment = true;
          component.selectedCient = mockClient;
        });

        it('should set client field value to the selected client', () => {
          // Assemble
          const expectValue = mockClient;

          // Act
          component.onSubmitClick();

          // Assert
          expect(component.appointmentForm.controls['client'].value).toEqual(
            expectValue
          );
        });

        it('should emit newAppointment with the formValue', () => {
          // Assemble
          const emitSpy = spyOn(component.newAppointment, 'emit');
          component.appointmentForm.setValue(mockAppointmentWithSubject);
          let expectValue = mockAppointmentWithSubject;

          // Act
          component.onSubmitClick();

          // Assert
          expect(emitSpy).toHaveBeenCalledOnceWith(expectValue);
        });

        // this.newAppointment.emit(this.appointmentForm.value as AppointmentDetail);
      });

      describe('given isNewAppointment is false', () => {
        beforeEach(() => {
          component.isNewAppointment = false;

          // Act
          component.onSubmitClick();
        });

        it('should set warningType to EDIT_SAVE', () => {
          // Assert
          expect(component.warningType).toBe(WarningType.EDIT_SAVE);
        });

        it('should set isWarning to true', () => {
          // Assert
          expect(component.isWarning).toBeTrue();
        });
      });
    });
  });

  describe('onEditAppointmentClick()', () => {
    beforeEach(() => {
      // Act
      component.onEditAppointmentClick();
    });

    it('should set isSavable to false', () => {
      // Assert
      expect(component.isSavable).toBeFalse();
    });

    it('should set isEditable to true', () => {
      // Assert
      expect(component.isEditable).toBeTrue();
    });
  });

  describe('onCancelAppointmentClick()', () => {
    beforeEach(() => {
      // Act
      component.onCancelAppointmentClick();
    });

    it('should set isRemoveAppointment to true', () => {
      // Assert
      expect(component.isRemoveAppointment).toBeTrue();
    });
  });

  describe('onCloseClick()', () => {
    it('should emit closed', () => {
      // Assemble
      const emitSpy = spyOn(component.closed, 'emit');

      // Act
      component.onCloseClick();

      // Assert
      expect(emitSpy).toHaveBeenCalled();
    });
  });

  describe('onCancelEditsClick()', () => {
    describe('given isNewAppointment is true', () => {
      it('should emit closed', () => {
        // Assemble
        component.isNewAppointment = true;
        const emitSpy = spyOn(component.closed, 'emit');

        // Act
        component.onCancelEditsClick();

        // Assert
        expect(emitSpy).toHaveBeenCalled();
      });
    });
    describe('given isNewAppointment is false', () => {
      beforeEach(() => {
        component.isNewAppointment = false;
      });

      describe('given isSavable is true', () => {
        beforeEach(() => {
          component.isSavable = true;
          component.onCancelEditsClick();
        });

        it('should set warningType to EDIT_CANCEL', () => {
          // Assert
          expect(component.warningType).toBe(WarningType.EDIT_CANCEL);
        });

        it('should set isWarning to true', () => {
          // Assert
          expect(component.isWarning).toBeTrue();
        });
      });

      describe('given isSavable is false', () => {
        it('should set isEditable to false', () => {
          // Assemble
          component.isSavable = false;

          // Act
          component.onCancelEditsClick();

          // Assert
          expect(component.isEditable).toBeFalse();
        });
      });
    });
  });

  describe('onHeaderEditClick()', () => {
    beforeEach(() => {
      // Act
      component.onHeaderEditClick();
    });
    it('should set isHeaderEditable to true ()', () => {
      // Assert
      expect(component.isHeaderEditable).toBeTrue();
    });
  });

  describe('onHeaderEditSubmitClick()', () => {
    beforeEach(() => {
      // Assemble
      component.appointmentForm.controls['subject'].setValue(
        'A provided subject'
      );
      // Act
      component.onHeaderEditSubmitClick();
    });

    it('should set modalHeader the value of the subject field ()', () => {
      // Assert
      expect(component.modalHeader).toBe('A provided subject');
    });

    it('should set isHeaderEditable to false ()', () => {
      // Assert
      expect(component.isHeaderEditable).toBeFalse();
    });
  });

  describe('onHeaderEditCancelClick()', () => {
    beforeEach(() => {
      // Act
      component.onHeaderEditCancelClick();
    });
    it('should set isHeaderEditable to false ()', () => {
      // Assert
      expect(component.isHeaderEditable).toBeFalse();
    });
  });

  describe('compareTimes()', () => {
    it('given items match, should return true', () => {
      // Assemble
      const item1 = { hours: 8, minutes: 0 } as Time;
      const item2 = { hours: 8, minutes: 0 } as Time;

      // Act/Assert
      expect(component.compareTimes(item1, item2)).toBeTrue();
    });

    it('given items DONT match, should return false', () => {
      // Assemble
      const item1 = { hours: 8, minutes: 0 } as Time;
      const item2 = { hours: 9, minutes: 0 } as Time;

      // Act/Assert
      expect(component.compareTimes(item1, item2)).toBeFalse();
    });
  });

  describe('compareClients()', () => {
    it('given items match, should return true', () => {
      // Assemble
      const item1 = { displayName: 'Bob Hope' } as ClientDetail;
      const item2 = 'Bob Hope';

      // Act/Assert
      expect(component.compareClients(item1, item2)).toBeTrue();
    });

    it('given items DONT match, should return false', () => {
      // Assemble
      const item1 = { displayName: 'Bob Hope' } as ClientDetail;
      const item2 = 'Bill Hope';

      // Act/Assert
      expect(component.compareClients(item1, item2)).toBeFalse();
    });
  });

  describe('compareTypes()', () => {
    it('given items match, should return true', () => {
      // Assemble
      const item1 = 'Match';
      const item2 = 'Match';

      // Act/Assert
      expect(component.compareTypes(item1, item2)).toBeTrue();
    });

    it('given items DONT match, should return false', () => {
      // Assemble
      const item1 = 'Match';
      const item2 = 'Nope';

      // Act/Assert
      expect(component.compareTypes(item1, item2)).toBeFalse();
    });
  });

  describe('onChangesMade()', () => {
    beforeEach(() => {
      // Assemble
      component.currentAppointment = mockAppointmentWithSubject;
      component.appointmentForm.controls['subject'].setValue('Lesson with Bob');
    });

    describe('give the type field is AppointmentType.Lesson', () => {
      beforeEach(() => {
        // Assemble
        component.appointmentForm.controls['type'].setValue(
          AppointmentType.Lesson
        );
      });

      describe('given the client has changed and the client has a displayName', () => {
        beforeEach(() => {
          // Assemble
          component.appointmentForm.controls['client'].setValue({
            displayName: 'Bill Hope',
          } as ClientDetail);

          // Act
          component.onChangesMade();
        });

        it('should set selectedCient to the clientDetail value', () => {
          // Assert
          expect(component.selectedCient).toEqual({
            displayName: 'Bill Hope',
          } as ClientDetail);
        });

        it('should set client field value to the client displayName', () => {
          // Assert
          expect(component.appointmentForm.controls['client'].value).toBe(
            'Bill Hope'
          );

          // Act
          component.onChangesMade();
        });
      });

      describe('given the client has NOT changed AND/OR the client DOES NOT have a displayName', () => {
        beforeEach(() => {
          component.appointmentForm.controls['client'].setValue(
            mockAppointmentWithSubject
          );
        });

        it('should NOT set selectedCient to the clientDetail value', () => {
          // Assert
          expect(component.selectedCient).toEqual(undefined);
        });

        it('should NOT set client field value to the client displayName', () => {
          // Assert
          expect(component.appointmentForm.controls['client'].value).toEqual(
            mockAppointmentWithSubject
          );
        });
      });
      it('should set showClientField to true', () => {
        // Act
        component.onChangesMade();

        // Assert
        expect(component.showClientField).toBeTrue();
      });
    });

    describe('give the type field is AppointmentType.Other', () => {
      beforeEach(() => {
        // Assemble
        component.appointmentForm.controls['type'].setValue(
          AppointmentType.Other
        );

        // Act
        component.onChangesMade();
      });

      it('should set selectedCient to empty object', () => {
        // Assert
        expect(component.selectedCient).toEqual({} as ClientDetail);
      });

      it('should set client field value to empty string', () => {
        // Assert
        expect(component.appointmentForm.controls['client'].value).toEqual('');
      });

      it('should set showClientField to false', () => {
        // Assert
        expect(component.showClientField).toBeFalse();
      });
    });

    it('should set modalHeader the value of the subject field ()', () => {
      // Act
      component.onChangesMade();

      // Assert
      expect(component.modalHeader).toBe('Lesson with Bob');
    });

    it('should set isHeaderEditable to false ()', () => {
      // Act
      component.onChangesMade();

      // Assert
      expect(component.isHeaderEditable).toBeFalse();
    });

    describe('should set the Preffered Subject', () => {
      beforeEach(() => {
        component.appointmentForm.controls['type'].setValue(
          AppointmentType.Lesson
        );
        component.selectedCient = {
          firstName: 'Bill',
        } as ClientDetail;
      });

      describe('given the subject matches the previously prefered subject', () => {
        beforeEach(() => {
          component.preferredSubject = 'Lesson with Bob';
        });

        it('should update the prefered subject and modalHeader accordingly', () => {
          // Act
          component.onChangesMade();
          const expectedSubject = 'Lesson with Bill';

          // Assert
          expect(component.preferredSubject).toBe(expectedSubject);
          expect(component.modalHeader).toBe(expectedSubject);
        });
      });
      describe('given the subject does not matches the previously prefered subject', () => {
        beforeEach(() => {
          component.preferredSubject = 'A random subject';
        });

        it('should update the prefered subject but not the modalHeader', () => {
          // Act
          component.onChangesMade();

          // Assert
          expect(component.preferredSubject).toBe('Lesson with Bill');
          expect(component.modalHeader).toBe('Lesson with Bob');
        });
      });
    });

    // this.setPreferredSubject();
    //   let isAutoUpdateSubject =
    //   this.appointmentForm.controls['subject'].value === this.preferredSubject;

    // this.preferredSubject = this.getPreferredSubject();

    // if (isAutoUpdateSubject) {
    //   this.appointmentForm.controls['subject'].setValue(this.preferredSubject);
    //   this.modalHeader = this.preferredSubject;
    // }

    // if (this.isChangesMade()) {
    //   this.isSavable = this.isFormValid();
    //   this.cd.detectChanges();
    // }
  });
});
