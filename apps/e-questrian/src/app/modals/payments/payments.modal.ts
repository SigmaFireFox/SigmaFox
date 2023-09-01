/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Clients } from '../../interfaces/clients.interface';
import { PaymentDetails } from '../../interfaces/payments.interface';
import { ClientsService } from '../../services/clients/clients.service';

/* eslint-disable @angular-eslint/component-selector */
@Component({
  selector: 'app-payments-modal',
  templateUrl: './payments.modal.html',
  styleUrls: ['./payments.modal.scss'],
})
export class PaymentsModal implements OnInit {
  @Input() currentPayment = {} as PaymentDetails;
  @Output() closed = new EventEmitter<void>();
  @Output() newPayment = new EventEmitter<PaymentDetails>();
  @Output() editedPayment = new EventEmitter<PaymentDetails>();
  @Output() voidPayment = new EventEmitter<void>();

  paymentForm = new UntypedFormGroup({
    date: new UntypedFormControl(new Date().setHours(0, 0, 0, 0)),
    client: new UntypedFormControl(''),
    paymentType: new UntypedFormControl(''),
    amount: new UntypedFormControl(''),
  });

  isNewPayment = true;
  isVoidPayment = false;
  isSaveAndNew = false;

  get clients(): Clients {
    return this.clientService.clients;
  }

  constructor(private clientService: ClientsService) {}

  ngOnInit(): void {
    this.setIsNewPayment();
    this.setForm();
  }

  onSubmitClick() {
    this.parseKeysToInt();

    if (this.isVoidPayment) {
      this.voidPayment.emit();
      return;
    }

    this.isNewPayment
      ? this.newPayment.emit(this.paymentForm.value as PaymentDetails)
      : this.editedPayment.emit(this.paymentForm.value as PaymentDetails);

    this.isSaveAndNew ? this.ngOnInit() : this.closed.emit();
  }

  onSaveClick(saveAndNew: boolean) {
    this.isSaveAndNew = saveAndNew;
  }

  onCloseClick() {
    this.closed.emit();
  }

  onCancelAppointmentClick() {
    this.isVoidPayment = true;
  }

  compareClients(clientDetails: any, displayName: string) {
    return clientDetails.value.displayName == displayName;
  }

  private setIsNewPayment() {
    this.isNewPayment = Object.keys(this.currentPayment)?.length === 0;
  }

  private setForm() {
    if (this.isNewPayment) return;

    this.paymentForm = new UntypedFormGroup({
      client: new UntypedFormControl(
        this.clients[this.currentPayment.client].displayName
      ),
      amount: new UntypedFormControl(this.currentPayment.amount),
      paymentType: new UntypedFormControl(this.currentPayment.paymentType),
      date: new UntypedFormControl(this.currentPayment.date),
    });
  }

  private parseKeysToInt() {
    this.paymentForm.controls['client'].setValue(
      parseInt(this.paymentForm.controls['client'].value.key)
    );
    this.paymentForm.controls['amount'].setValue(
      parseInt(this.paymentForm.controls['amount'].value)
    );
  }
}
