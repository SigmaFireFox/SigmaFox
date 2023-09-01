import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ClientDetail, Clients } from 'src/app/interfaces/clients.interface';
import { ClientsService } from 'src/app/services/clients/clients.service';

@Component({
  selector: 'app-client-details-modal',
  templateUrl: './client-details.modal.html',
  styleUrls: ['./client-details.modal.scss'],
})
export class ClientDetailsModal implements OnInit {
  @Input() currentClient = {} as ClientDetail;
  @Output() closed = new EventEmitter<void>();
  @Output() newClient = new EventEmitter<ClientDetail>();
  @Output() editedClient = new EventEmitter<ClientDetail>();
  @Output() removeClient = new EventEmitter<void>();

  isNewClient: boolean | undefined;
  isRemoveClient = false;
  isDisplayNameEditable = false;
  isSaveAndNew = false;
  clientForm = new UntypedFormGroup({
    displayName: new UntypedFormControl('New Client'),
    firstName: new UntypedFormControl(''),
    lastName: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    telephoneNumber: new UntypedFormControl(''),
  });
  times: string[] = [];
  displayTime = '';

  get clients() {
    return this.clientService.clients;
  }

  constructor(private clientService: ClientsService) {}

  ngOnInit(): void {
    this.setIsNewClient();
    this.setForm();
  }

  // Main call to actions callbacks
  onSubmitClick() {
    if (this.isRemoveClient) {
      this.removeClient.emit();
      return;
    }

    this.isNewClient
      ? this.newClient.emit(this.clientForm.value as ClientDetail)
      : this.editedClient.emit(this.clientForm.value as ClientDetail);

    this.isSaveAndNew ? this.ngOnInit() : this.closed.emit();
  }

  onRemoveClientClick() {
    this.isRemoveClient = true;
  }

  onCloseClick() {
    this.closed.emit();
  }

  onSaveClick(saveAndNew: boolean) {
    this.isSaveAndNew = saveAndNew;
  }

  updateDisplayName() {
    if (
      this.clientForm.controls['firstName'].value != '' ||
      this.clientForm.controls['lastName'].value != ''
    ) {
      this.clientForm.controls['displayName'].setValue(
        this.clientForm.controls['firstName'].value +
          ' ' +
          this.clientForm.controls['lastName'].value
      );
      this.isDisplayNameEditable = true;
      return;
    }
    this.clientForm.controls['displayName'].setValue('New client');
    this.isDisplayNameEditable = false;
  }

  private setIsNewClient() {
    this.isNewClient = Object.keys(this.currentClient).length === 0;
  }

  private setForm() {
    this.isNewClient
      ? this.setFormForNewClient()
      : this.setFormForExistingClient();
  }

  private setFormForNewClient() {
    this.clientForm = new UntypedFormGroup({
      displayName: new UntypedFormControl('New Client'),
      firstName: new UntypedFormControl(''),
      lastName: new UntypedFormControl(''),
      email: new UntypedFormControl(''),
      telephoneNumber: new UntypedFormControl(''),
    });
  }

  private setFormForExistingClient() {
    this.clientForm = new UntypedFormGroup({
      displayName: new UntypedFormControl(this.currentClient.displayName),
      firstName: new UntypedFormControl(this.currentClient.firstName),
      lastName: new UntypedFormControl(this.currentClient.lastName),
      email: new UntypedFormControl(this.currentClient.email),
      telephoneNumber: new UntypedFormControl(
        this.currentClient.telephoneNumber
      ),
    });
    this.isDisplayNameEditable = this.currentClient.displayName != '';
  }
}
