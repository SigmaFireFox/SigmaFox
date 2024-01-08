import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarPage } from './calendar.page';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AppointmentDetail,
  Appointments,
  AppointmentType,
} from 'src/app/interfaces/appointments.interface';
import { CalendarBlock } from 'src/app/interfaces/calander.interface';
import { Time } from '@angular/common';
import { AppointmentsService } from 'src/app/services/appointments/appointments.service';
import { GeneralScreenHeaderComponent } from 'src/app/components/general-screen-header/general-screen-header.component';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { DateAndTimeService } from 'src/app/services/date-time/date-time.service';

describe('CalendarPage', () => {
  let component: CalendarPage;
  let fixture: ComponentFixture<CalendarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, ReactiveFormsModule],
      declarations: [CalendarPage, GeneralScreenHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should set todays date', () => {
      // Assemble
      const today = new Date().setHours(0, 0, 0, 0);

      // Act
      component.ngOnInit();

      // Assert
      expect(component.date).toBe(today);
    });

    it('should call getAppointmentData and set appointments', () => {
      // Assemble
      const expectedAppointments = {
        1: { subject: 'An appointment' } as AppointmentDetail,
        2: { subject: 'Another appointment' } as AppointmentDetail,
      } as Appointments;
      let appointmentSpy = spyOnProperty(
        TestBed.inject(AppointmentsService),
        'appointments',
        'get'
      ).and.returnValue(expectedAppointments);

      // Act
      component.ngOnInit();

      // Assert
      expect(appointmentSpy).toHaveBeenCalled();
      expect(component.appointments).toEqual(expectedAppointments);
    });

    it('should call setCalendar and set calenderBlocks', () => {
      // Assemble
      const expectedBlocks = [
        {
          time: { hours: 10, minutes: 0 },
          appointments: [10, 11],
        } as CalendarBlock,
      ];

      let calendarBlockSpy = spyOn(
        TestBed.inject(CalendarService),
        'setCalendar'
      ).and.returnValue(expectedBlocks);

      // Act
      component.ngOnInit();

      // Assert
      expect(calendarBlockSpy).toHaveBeenCalled();
      expect(component.calenderBlocks).toEqual(expectedBlocks);
    });
  });

  describe('changeDate', () => {
    it('should call changeDate and set date', () => {
      // Assemble
      const expectedDate = new Date(1, 21, 2002).setHours(0, 0, 0, 0);
      let dateSpy = spyOn(
        TestBed.inject(DateAndTimeService),
        'changeDate'
      ).and.returnValue(expectedDate);

      // Act
      component.changeDay(0);

      // Assert
      expect(dateSpy).toHaveBeenCalled();
      expect(component.date).toEqual(expectedDate);
    });

    it('should call getAppointmentData and set appointments', () => {
      // Assemble
      const expectedAppointments = {
        1: { subject: 'An appointment' } as AppointmentDetail,
        2: { subject: 'Another appointment' } as AppointmentDetail,
      } as Appointments;
      let appointmentSpy = spyOnProperty(
        TestBed.inject(AppointmentsService),
        'appointments',
        'get'
      ).and.returnValue(expectedAppointments);

      // Act
      component.changeDay(0);

      // Assert
      expect(appointmentSpy).toHaveBeenCalled();
      expect(component.appointments).toEqual(expectedAppointments);
    });

    it('should call setCalendar and set calenderBlocks', () => {
      // Assemble
      const expectedBlocks = [
        {
          time: { hours: 10, minutes: 0 },
          appointments: [10, 11],
        } as CalendarBlock,
      ];

      let calendarBlockSpy = spyOn(
        TestBed.inject(CalendarService),
        'setCalendar'
      ).and.returnValue(expectedBlocks);

      // Act
      component.changeDay(0);

      // Assert
      expect(calendarBlockSpy).toHaveBeenCalled();
      expect(component.calenderBlocks).toEqual(expectedBlocks);
    });
  });

  describe('calendarBlockClicked', () => {
    const selectedBlockTime = { hours: 8, minutes: 0 };

    describe('given appointmentEditActive is false', () => {
      it('should set currentAppointmentID to 0', () => {
        // Act
        component.calendarBlockClicked(selectedBlockTime);

        // Assert
        expect(component.currentAppointmentID).toBe(0);
      });

      it('should set proposedStartTime to the selected blocks start time', () => {
        // Act
        component.calendarBlockClicked(selectedBlockTime);

        // Assert
        expect(component.proposedStartTime).toBe(selectedBlockTime);
      });

      it('should set displayNewAppointmentForm to true', () => {
        // Act
        component.calendarBlockClicked(selectedBlockTime);

        // Assert
        expect(component.displayAppointmentForm).toBe(true);
      });
    });

    describe('given appointmentEditActive is true', () => {
      it('should NOT set proposedStartTime to the selected blocks start time', () => {
        // Act
        component.ngOnInit();
        component.appointmentClicked(0); // get appointmentEditActive true
        component.calendarBlockClicked(selectedBlockTime);

        // Assert
        expect(component.proposedStartTime).toEqual({} as Time);
      });
    });
  });

  describe('appointmentClicked', () => {
    const mockID = 72;

    it('should set appointmentEditActive to true', () => {
      // Act
      component.appointmentClicked(mockID);

      // Assert
      expect(component.appointmentEditActive).toBe(true);
    });

    it('should set currentAppointmentID to the provided ID', () => {
      //
      // Act
      component.appointmentClicked(mockID);

      // Assert
      expect(component.currentAppointmentID).toBe(mockID);
    });

    it('should set displayNewAppointmentForm to true', () => {
      // Act
      component.appointmentClicked(mockID);

      // Assert
      expect(component.displayAppointmentForm).toBe(true);
    });
  });

  describe('appointmentDetailModalClosed', () => {
    it('should set appointmentEditActive to false', () => {
      // Act
      component.appointmentDetailModalClosed();

      // Assert
      expect(component.appointmentEditActive).toBe(false);
    });

    it('should set displayNewAppointmentForm to false', () => {
      // Act
      component.appointmentDetailModalClosed();

      // Assert
      expect(component.displayAppointmentForm).toBe(false);
    });
  });

  describe('appointmentCreated', () => {
    const mockAppointment = {
      type: AppointmentType.Other,
      subject: 'An appointment',
      date: new Date(),
      startTime: { hours: 8, minutes: 0 },
      duration: { hours: 8, minutes: 30 },
      invoice: 0,
      cancelled: false,
    } as AppointmentDetail;

    it('should call newAppointment with the appoinment detailed received', () => {
      // Assemble
      let appointmentSpy = spyOn(
        TestBed.inject(AppointmentsService),
        'newAppointment'
      );

      // Act
      component.appointmentCreated(mockAppointment);

      // Assert
      expect(appointmentSpy).toHaveBeenCalledOnceWith(mockAppointment);
    });

    it('should call getAppointmentData and set appointments', () => {
      // Assemble
      const expectedAppointments = {
        1: { subject: 'An appointment' } as AppointmentDetail,
        2: { subject: 'Another appointment' } as AppointmentDetail,
      } as Appointments;
      let appointmentSpy = spyOnProperty(
        TestBed.inject(AppointmentsService),
        'appointments',
        'get'
      ).and.returnValue(expectedAppointments);

      // Act
      component.appointmentCreated(mockAppointment);

      // Assert
      expect(appointmentSpy).toHaveBeenCalled();
      expect(component.appointments).toEqual(expectedAppointments);
    });

    it('should call setCalendar and set calenderBlocks', () => {
      // Assemble
      const expectedBlocks = [
        {
          time: { hours: 10, minutes: 0 },
          appointments: [10, 11],
        } as CalendarBlock,
      ];

      let calendarBlockSpy = spyOn(
        TestBed.inject(CalendarService),
        'setCalendar'
      ).and.returnValue(expectedBlocks);

      // Act
      component.appointmentCreated(mockAppointment);

      // Assert
      expect(calendarBlockSpy).toHaveBeenCalled();
      expect(component.calenderBlocks).toEqual(expectedBlocks);
    });

    it('should set displayNewAppointmentForm to false', () => {
      // Act
      component.appointmentCreated(mockAppointment);

      // Assert
      expect(component.displayAppointmentForm).toBe(false);
    });
  });

  describe('appointmentEdited', () => {
    const mockAppointment = {
      type: AppointmentType.Other,
      subject: 'An appointment',
      date: new Date(),
      startTime: { hours: 8, minutes: 0 },
      duration: { hours: 8, minutes: 30 },
      invoice: 0,
      cancelled: false,
    } as AppointmentDetail;

    it('should call editAppointment with the appoinment detailed received', () => {
      // Assemble
      const mockAppointmentID = 72;
      let appointmentSpy = spyOn(
        TestBed.inject(AppointmentsService),
        'editAppointment'
      );

      // Act
      component.appointmentClicked(mockAppointmentID);
      component.appointmentEdited(mockAppointment);

      // Assert
      expect(appointmentSpy).toHaveBeenCalledOnceWith(
        mockAppointmentID,
        mockAppointment
      );
    });

    it('should call getAppointmentData and set appointments', () => {
      // Assemble
      const expectedAppointments = {
        1: { subject: 'An appointment' } as AppointmentDetail,
        2: { subject: 'Another appointment' } as AppointmentDetail,
      } as Appointments;
      let appointmentSpy = spyOnProperty(
        TestBed.inject(AppointmentsService),
        'appointments',
        'get'
      ).and.returnValue(expectedAppointments);

      // Act
      component.appointmentEdited(mockAppointment);

      // Assert
      expect(appointmentSpy).toHaveBeenCalled();
      expect(component.appointments).toEqual(expectedAppointments);
    });

    it('should call setCalendar and set calenderBlocks', () => {
      // Assemble
      const expectedBlocks = [
        {
          time: { hours: 10, minutes: 0 },
          appointments: [10, 11],
        } as CalendarBlock,
      ];

      let calendarBlockSpy = spyOn(
        TestBed.inject(CalendarService),
        'setCalendar'
      ).and.returnValue(expectedBlocks);

      // Act
      component.appointmentEdited(mockAppointment);

      // Assert
      expect(calendarBlockSpy).toHaveBeenCalled();
      expect(component.calenderBlocks).toEqual(expectedBlocks);
    });

    it('should set appointmentEditActive to false', () => {
      // Act
      component.appointmentCreated(mockAppointment);

      // Assert
      expect(component.appointmentEditActive).toBe(false);
    });
  });

  describe('appointmentCanceled', () => {
    it('should call cancelAppointment with the currentAppointmentID', () => {
      // Assemble
      const mockAppointmentID = 72;
      let appointmentSpy = spyOn(
        TestBed.inject(AppointmentsService),
        'cancelAppointment'
      );

      // Act
      component.appointmentClicked(mockAppointmentID);
      component.appointmentCanceled();

      // Assert
      expect(appointmentSpy).toHaveBeenCalledOnceWith(mockAppointmentID);
    });

    it('should call getAppointmentData and set appointments', () => {
      // Assemble
      const expectedAppointments = {
        1: { subject: 'An appointment' } as AppointmentDetail,
        2: { subject: 'Another appointment' } as AppointmentDetail,
      } as Appointments;
      let appointmentSpy = spyOnProperty(
        TestBed.inject(AppointmentsService),
        'appointments',
        'get'
      ).and.returnValue(expectedAppointments);

      // Act
      component.appointmentCanceled();

      // Assert
      expect(appointmentSpy).toHaveBeenCalled();
      expect(component.appointments).toEqual(expectedAppointments);
    });

    it('should call setCalendar and set calenderBlocks', () => {
      // Assemble
      const expectedBlocks = [
        {
          time: { hours: 10, minutes: 0 },
          appointments: [10, 11],
        } as CalendarBlock,
      ];

      let calendarBlockSpy = spyOn(
        TestBed.inject(CalendarService),
        'setCalendar'
      ).and.returnValue(expectedBlocks);

      // Act
      component.appointmentCanceled();

      // Assert
      expect(calendarBlockSpy).toHaveBeenCalled();
      expect(component.calenderBlocks).toEqual(expectedBlocks);
    });

    it('should set appointmentEditActive to false', () => {
      // Act
      component.appointmentCanceled();

      // Assert
      expect(component.appointmentEditActive).toBe(false);
    });

    it('should set displayAppointmentForm to false', () => {
      // Act
      component.appointmentCanceled();

      // Assert
      expect(component.displayAppointmentForm).toBe(false);
    });
  });
});
