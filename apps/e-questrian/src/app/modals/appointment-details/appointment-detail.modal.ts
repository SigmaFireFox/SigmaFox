/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Time } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import {
  AppointmentDetail,
  AppointmentType,
} from '../../interfaces/appointments.interface';
import { ClientDetail, Clients } from '../../interfaces/clients.interface';
import { ClientsService } from '../../services/clients/clients.service';
import { DateAndTimeService } from '../../services/date-time/date-time.service';
import {
  WarningsModal,
  WarningType,
  WarningSubjectType,
} from '../warnings/warnings.component';

export interface TimeOption {
  display: string;
  value: Time;
}

@Component({
  selector: 'app-new-appointment-modal',
  templateUrl: './appointment-detail.modal.html',
  styleUrls: ['./appointment-detail.modal.scss'],
})
export class AppointmentModal implements OnInit {
  @Input() date: number = 0;
  @Input() proposedStartTime: Time = {} as Time;
  @Input() currentAppointment = {} as AppointmentDetail;
  @Output() closed = new EventEmitter<void>();
  @Output() newAppointment = new EventEmitter<AppointmentDetail>();
  @Output() editedAppointment = new EventEmitter<AppointmentDetail>();
  @Output() cancelAppointment = new EventEmitter<void>();

  @ViewChild(WarningsModal, { static: false }) warningsComponent:
    | WarningsModal
    | undefined;

  appointmentType = AppointmentType;
  warningType = WarningType.EDIT_SAVE;
  warningSubject = WarningSubjectType.APPOINTMENT;
  isEditable = false;
  isNewAppointment: boolean = true;
  isRemoveAppointment = false;
  isWarning = false;
  isSavable = false;
  isHeaderEditable = false;
  showClientField = false;
  modalHeader = '';
  appointmentForm = new UntypedFormGroup({
    type: new UntypedFormControl(''),
    subject: new UntypedFormControl(''),
    date: new UntypedFormControl(''),
    startTime: new UntypedFormControl(''),
    duration: new UntypedFormControl(''),
    client: new UntypedFormControl(''),
  });
  displayTime = '';
  selectedCient: ClientDetail | undefined;
  appointmentTypeEnumKeys: string[] | undefined;
  appointmentTypeEnumKeysNumbers: number[] = [];
  preferredSubject = '';
  startTimeOptions: TimeOption[] = [];
  durationTimeOptions: TimeOption[] = [];
  clients: Clients = {};

  constructor(
    private cd: ChangeDetectorRef,
    private dateTimeService: DateAndTimeService,
    private clientService: ClientsService
  ) {
    this.setEnumOptions();
  }

  ngOnInit(): void {
    this.setIsNewAppointment();
    this.setHeader();
    this.setForm();
    this.setOptions();
  }

  // Main call to actions callbacks
  onSubmitClick() {
    if (this.isRemoveAppointment) {
      this.cancelAppointment.emit();
      return;
    }

    if (this.isNewAppointment) {
      this.prepAndSaveNewAppointment();
      return;
    }

    this.warningType = WarningType.EDIT_SAVE;
    this.isWarning = true;
  }

  onEditAppointmentClick() {
    this.isSavable = false;
    this.isEditable = true;
  }

  onCancelAppointmentClick() {
    this.isRemoveAppointment = true;
  }

  onCloseClick() {
    this.closed.emit();
  }

  onCancelEditsClick() {
    if (this.isNewAppointment) {
      this.closed.emit();
      return;
    }

    if (this.isSavable) {
      this.warningType = WarningType.EDIT_CANCEL;
      this.isWarning = true;
      return;
    }

    this.isEditable = false;
  }

  // Minor actions callbacks
  onHeaderEditClick() {
    this.isHeaderEditable = true;
  }

  onHeaderEditSubmitClick() {
    this.modalHeader = this.appointmentForm.controls['subject'].value;
    this.isHeaderEditable = false;
  }

  onHeaderEditCancelClick() {
    this.isHeaderEditable = false;
  }

  // State management functions
  compareTimes(o1: Time, o2: Time) {
    return o1?.hours == o2?.hours && o1.minutes == o2.minutes;
  }

  compareClients(client: ClientDetail, displayName: string) {
    return client.displayName == displayName;
  }

  compareTypes(first: any, second: any) {
    return first == second;
  }

  onChangesMade() {
    // Address client
    switch (this.appointmentForm.controls['type'].value) {
      case AppointmentType.Lesson: {
        const clientDetail = this.appointmentForm.controls['client']
          .value as ClientDetail;
        if (this.isClientChanged(clientDetail) && clientDetail.displayName) {
          this.selectedCient = clientDetail;
          this.appointmentForm.controls['client'].setValue(
            clientDetail.displayName
          );
        }
        break;
      }
      case AppointmentType.Other: {
        this.appointmentForm.controls['client'].setValue('');
        this.selectedCient = {} as ClientDetail;
      }
    }
    this.showClientField =
      this.appointmentForm.controls['type'].value === AppointmentType.Lesson;

    // Address header
    this.onHeaderEditSubmitClick();
    this.setPreferredSubject();

    // Address form state
    if (this.isChangesMade()) {
      this.isSavable = this.isFormValid();
      this.cd.detectChanges();
    }
  }

  // Functions related to Warnings
  warningProceed(proceed: boolean) {
    this.isWarning = false;
    this.isEditable = false;

    if (!proceed) return;
    switch (this.warningType) {
      case WarningType.EDIT_SAVE: {
        this.prepAndSaveEditedAppointment();
        return;
      }
      case WarningType.EDIT_CANCEL: {
        this.setForm();
        return;
      }
    }
  }

  // Private functions related to initialisation of the component
  private setEnumOptions() {
    this.appointmentTypeEnumKeys = Object.keys(this.appointmentType).filter(
      (k) => !isNaN(Number(k))
    );
    this.appointmentTypeEnumKeys.forEach((n) => {
      this.appointmentTypeEnumKeysNumbers.push(parseInt(n));
    });
  }

  private setIsNewAppointment() {
    this.isNewAppointment = Object.keys(this.currentAppointment).length === 0;
  }

  private setHeader() {
    if (this.currentAppointment.subject) {
      this.modalHeader = this.currentAppointment.subject;
      return;
    }

    this.modalHeader = this.isNewAppointment
      ? 'New appointment'
      : 'Edit appointment';
  }

  private setForm() {
    this.isNewAppointment ? this.setFormForNew() : this.setFormForEdit();
    this.preferredSubject = this.isNewAppointment
      ? 'New appointment'
      : this.getPreferredSubject();
    this.showClientField =
      this.appointmentForm.controls['type'].value === AppointmentType.Lesson;
  }

  private setOptions(): void {
    this.startTimeOptions = this.dateTimeService.appointmentStartTimeOptions;
    this.durationTimeOptions = this.dateTimeService.appointmentDurationOptions;
    this.clients = this.clientService.clients;
  }

  private setFormForNew() {
    this.isEditable = true;
    this.currentAppointment.invoice = 0;
    this.appointmentForm = new UntypedFormGroup({
      type: new UntypedFormControl(0),
      subject: new UntypedFormControl('New appointment'),
      date: new UntypedFormControl(new Date(this.date)),
      startTime: new UntypedFormControl({
        hours: this.proposedStartTime?.hours,
        minutes: this.proposedStartTime.minutes,
      } as Time),
      duration: new UntypedFormControl({ hours: 0, minutes: 30 }),
      client: new UntypedFormControl(''),
    });
  }

  private setFormForEdit() {
    this.isEditable = false;
    this.selectedCient = this.currentAppointment.client;
    this.appointmentForm = new UntypedFormGroup({
      type: new UntypedFormControl(this.currentAppointment.type || 0),
      subject: new UntypedFormControl(this.currentAppointment.subject || ''),
      date: new UntypedFormControl(new Date(this.date) || ''),
      startTime: new UntypedFormControl(this.currentAppointment.startTime),
      duration: new UntypedFormControl(this.currentAppointment.duration || ''),
      client: new UntypedFormControl(this.selectedCient?.displayName || ''),
    });
  }

  private prepAndSaveNewAppointment() {
    this.appointmentForm.controls['client'].setValue(this.selectedCient);
    this.newAppointment.emit(this.appointmentForm.value as AppointmentDetail);
  }

  private prepAndSaveEditedAppointment() {
    this.appointmentForm.controls['client'].setValue(this.selectedCient);
    const newAppointmentDetails = this.appointmentForm
      .value as AppointmentDetail;
    newAppointmentDetails.invoice = this.currentAppointment.invoice;
    this.editedAppointment.emit(newAppointmentDetails);
    this.appointmentForm.controls['client'].setValue(
      this.selectedCient?.displayName
    );
  }

  // Private functions for checking status of the form
  private isChangesMade(): boolean {
    const listOnControlsToCheck = [
      'subject',
      'date',
      'startTime',
      'duration',
      'client',
    ];

    let isChanged = false;
    listOnControlsToCheck.forEach((key) => {
      let currentValue = this.appointmentForm.controls[key].value;
      let previousValue =
        this.currentAppointment[key as keyof AppointmentDetail];

      if (key === 'date') {
        currentValue = new Date(currentValue);
        currentValue.setHours(0, 0, 0, 0);
        currentValue = currentValue.getTime();
        previousValue = new Date(previousValue as Date);
        previousValue.setHours(0, 0, 0, 0);
        previousValue = previousValue.getTime();
      }

      if (JSON.stringify(currentValue) !== JSON.stringify(previousValue)) {
        isChanged = true;
      }
    });
    return isChanged;
  }

  private isFormValid(): boolean {
    if (!this.appointmentForm.controls['type'].value) {
      return false;
    }
    if (this.appointmentForm.controls['type'].value === 1) {
      if (!this.appointmentForm.controls['client'].value) {
        return false;
      }
    }
    if (!this.appointmentForm.controls['date'].value) {
      return false;
    }
    if (!this.appointmentForm.controls['subject'].value) {
      return false;
    }
    return true;
  }

  private isClientChanged(clientDetail: ClientDetail) {
    const previousValue = this.currentAppointment.client?.displayName
      ? this.currentAppointment.client.displayName
      : this.currentAppointment.client;

    const currentValue = clientDetail.displayName
      ? clientDetail.displayName
      : clientDetail;

    return currentValue != previousValue;
  }

  // Functions related to the auto completion of the appointment subject
  private setPreferredSubject() {
    const isAutoUpdateSubject =
      this.appointmentForm.controls['subject'].value === this.preferredSubject;

    this.preferredSubject = this.getPreferredSubject();

    if (isAutoUpdateSubject) {
      this.appointmentForm.controls['subject'].setValue(this.preferredSubject);
      this.modalHeader = this.preferredSubject;
    }
  }

  private getPreferredSubject(): string {
    let preferredSubject = '';
    switch (this.appointmentForm.controls['type'].value) {
      case AppointmentType.Lesson: {
        preferredSubject = 'Lesson';
        if (this.selectedCient?.firstName) {
          preferredSubject =
            preferredSubject + ' with ' + this.selectedCient.firstName;
        }
        break;
      }
      case AppointmentType.Other: {
        preferredSubject = 'Appointment';
        break;
      }
    }
    return preferredSubject;
  }
}
