import { TestBed } from '@angular/core/testing';
import { Appointments } from 'src/app/interfaces/appointments.interface';
import { CreditNotes } from 'src/app/interfaces/credit-notes.interface';

import { CreditNotesService } from './credit-notes.service';

describe('CreditNotesService', () => {
  let service: CreditNotesService;
  let storageSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditNotesService);
    storageSpy = spyOn(localStorage, 'getItem');
  });

  const mockCreditNotesJSON = JSON.stringify({
    1: { date: new Date(2022, 10, 1).setHours(0, 0, 0, 0), appointment: 1 },
  });
  const mockAppointmentsJSON = JSON.stringify({
    1: {
      type: 1,
      subject: 'Lesson with Bob',
      date: new Date(2022, 10, 1),
      startTime: { hours: 8, minutes: 0 },
      duration: { hours: 0, minutes: 30 },
      client: {
        displayName: 'Bob Hope',
        firstName: 'Bob',
        lastName: 'Hope',
        email: 'bob@hope.co.za',
        telephoneNumber: '072 462 4685',
      },
      invoice: 1,
      cancelled: false,
    },
    2: {
      type: 1,
      subject: 'Lesson with Bill',
      date: new Date(2022, 10, 1),
      startTime: { hours: 8, minutes: 0 },
      duration: { hours: 0, minutes: 30 },
      client: {
        displayName: 'Bill Hope',
        firstName: 'Bill',
        lastName: 'Hope',
        email: 'bill@hope.co.za',
        telephoneNumber: '072 462 4685',
      },
      invoice: 1,
      cancelled: false,
    },
    3: {
      type: 1,
      subject: 'Lesson with Jill',
      date: new Date(2022, 10, 1),
      startTime: { hours: 8, minutes: 0 },
      duration: { hours: 0, minutes: 30 },
      client: {
        displayName: 'Jill Hope',
        firstName: 'Jill',
        lastName: 'Hope',
        email: 'jill@hope.co.za',
        telephoneNumber: '072 462 4685',
      },
      invoice: 1,
      cancelled: false,
    },
  });

  describe('generateCreditNote()', () => {
    beforeEach(() => {
      storageSpy.and.returnValues(mockCreditNotesJSON, mockAppointmentsJSON);
    });

    it('should call credit-notes and than appointments from local storage', () => {
      // Act
      service.generateCreditNote(2);

      // Assert
      expect(storageSpy).toHaveBeenCalledTimes(2);
      expect(storageSpy).toHaveBeenCalledWith('credit-notes');
      expect(storageSpy).toHaveBeenCalledWith('appointments');
    });

    it('should cancel the given appointment and update the credit notes and appointments', () => {
      // Assemble
      let expectedCreditNotes = JSON.parse(mockCreditNotesJSON) as CreditNotes;
      expectedCreditNotes['2'] = {
        date: new Date(new Date().setHours(0, 0, 0, 0)),
        appointment: 3,
      };

      let expectedAppointments = JSON.parse(
        mockAppointmentsJSON
      ) as Appointments;
      expectedAppointments['3'].creditNote = 2;
      expectedAppointments['3'].cancelled = true;

      // Act
      service.generateCreditNote(3);

      // Assert
      expect(service.creditNotes).toEqual(expectedCreditNotes);
      expect(service.appointments).toEqual(expectedAppointments);
    });
  });
});
