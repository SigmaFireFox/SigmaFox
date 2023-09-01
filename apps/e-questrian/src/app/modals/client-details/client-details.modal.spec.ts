import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientDetail } from 'src/app/interfaces/clients.interface';

import { ClientDetailsModal } from './client-details.modal';

describe('ClientDetailsModal', () => {
  let component: ClientDetailsModal;
  let fixture: ComponentFixture<ClientDetailsModal>;
  let removeClientSpy: jasmine.Spy;
  let newClientSpy: jasmine.Spy;
  let editedClientSpy: jasmine.Spy;
  let closedSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ClientDetailsModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
    removeClientSpy = spyOn(component.removeClient, 'emit');
    newClientSpy = spyOn(component.newClient, 'emit');
    editedClientSpy = spyOn(component.editedClient, 'emit');
    closedSpy = spyOn(component.closed, 'emit');
  });

  let mockClientWithoutDisplayName = {
    firstName: 'Bob',
    lastName: 'Hope',
    email: 'bob@hope.com',
    telephoneNumber: '0721234567',
  } as ClientDetail;
  const mockClientWithDisplayName = {
    ...mockClientWithoutDisplayName,
    displayName: 'Cool Bob',
  } as ClientDetail;

  describe('ngOnInit()', () => {
    describe('given this is a new client', () => {
      beforeEach(() => {
        // Assemble
        component.currentClient = {} as ClientDetail;

        // Act
        component.ngOnInit();
      });

      const expectFormValues = {
        displayName: 'New Client',
        firstName: '',
        lastName: '',
        email: '',
        telephoneNumber: '',
      };

      it('should set isNewClient to true', () => {
        // Assert
        expect(component.isNewClient).toBeTrue();
      });

      it('should set form as required', () => {
        // Assert
        expect(component.clientForm.value).toEqual(expectFormValues);
      });
    });

    describe('given this is an existing client', () => {
      beforeEach(() => {
        // Assemble
        component.currentClient = mockClientWithDisplayName;

        // Act
        component.ngOnInit();
      });

      const expectFormValues = {
        displayName: 'Cool Bob',
        firstName: 'Bob',
        lastName: 'Hope',
        email: 'bob@hope.com',
        telephoneNumber: '0721234567',
      };

      it('should set isNewClient to false', () => {
        // Assert
        expect(component.isNewClient).toBeFalse();
      });

      it('should set form as required', () => {
        // Assert
        expect(component.clientForm.value).toEqual(expectFormValues);
      });

      it('given client has a display name, should set isDisplayNameEditable to true', () => {
        // Assert
        expect(component.isDisplayNameEditable).toBeTrue();
      });

      it('given client does NOT have a display name, should set isDisplayNameEditable to false', () => {
        // Assemble
        component.currentClient = mockClientWithoutDisplayName;
        component.currentClient.displayName = '';

        // Act
        component.ngOnInit();

        // Assert
        expect(component.isDisplayNameEditable).toBeFalse();
      });
    });
  });

  describe('onSubmitClick()', () => {
    describe('given isRemoveClient is true', () => {
      beforeEach(() => {
        // Assemble
        component.isRemoveClient = true;
      });
      it('should emit removeClient', () => {
        // Assemble
        removeClientSpy.and.callThrough();

        // Act
        component.onSubmitClick();

        // Assert
        expect(removeClientSpy).toHaveBeenCalled();
      });
    });

    describe('given isRemoveClient is false', () => {
      beforeEach(() => {
        // Assemble
        component.isRemoveClient = false;
      });

      describe('given isNewClient is true', () => {
        beforeEach(() => {
          // Assemble
          component.isNewClient = true;
        });
        it('should emit newClient', () => {
          // Assemble
          newClientSpy.and.callThrough();

          // Act
          component.onSubmitClick();

          // Assert
          expect(newClientSpy).toHaveBeenCalled();
        });
      });

      describe('given isNewClient is false', () => {
        beforeEach(() => {
          // Assemble
          component.isNewClient = false;
        });
        it('should emit editedClient', () => {
          // Assemble
          editedClientSpy.and.callThrough();

          // Act
          component.onSubmitClick();

          // Assert
          expect(editedClientSpy).toHaveBeenCalled();
        });
      });

      describe('given isSaveAndNew is true', () => {
        beforeEach(() => {
          // Assemble
          component.isSaveAndNew = true;
          component.currentClient = {} as ClientDetail;

          // Act
          component.onSubmitClick();
        });

        const expectFormValues = {
          displayName: 'New Client',
          firstName: '',
          lastName: '',
          email: '',
          telephoneNumber: '',
        };

        it('should set isNewClient to true', () => {
          // Assert
          expect(component.isNewClient).toBeTrue();
        });

        it('should set form as required', () => {
          // Assert
          expect(component.clientForm.value).toEqual(expectFormValues);
        });
      });

      describe('given isSaveAndNew is false', () => {
        beforeEach(() => {
          // Assemble
          component.isSaveAndNew = false;
        });
        it('should emit closed', () => {
          // Assemble
          closedSpy.and.callThrough();

          // Act
          component.onSubmitClick();

          // Assert
          expect(closedSpy).toHaveBeenCalled();
        });
      });
    });
  });
});
