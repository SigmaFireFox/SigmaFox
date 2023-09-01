import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { PaymentType } from 'src/app/enums/payments.enum';
import { ClientDetail, Clients } from 'src/app/interfaces/clients.interface';
import { PaymentDetails } from 'src/app/interfaces/payments.interface';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { PaymentsModal } from './payments.modal';

describe('PaymentsModal', () => {
  let component: PaymentsModal;
  let fixture: ComponentFixture<PaymentsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
      ],
      declarations: [PaymentsModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const mockClients = {
    0: {} as ClientDetail,
    1: { displayName: 'Bob Hope' } as ClientDetail,
  } as Clients;
  const mockPayment = {
    date: new Date(2022, 10, 11),
    client: 1,
    paymentType: PaymentType.EFT,
    amount: 100,
    voided: false,
  } as PaymentDetails;

  describe('ngOnInit()', () => {
    describe('given this is a new payment', () => {
      beforeEach(() => {
        // Assemble
        component.currentPayment = {} as PaymentDetails;

        // Act
        component.ngOnInit();
      });

      const expectFormValues = {
        date: new Date().setHours(0, 0, 0, 0),
        client: '',
        paymentType: '',
        amount: '',
      };

      it('should set isNewClient to true', () => {
        // Assert
        expect(component.isNewPayment).toBeTrue();
      });

      it('should set form as required', () => {
        // Assert
        expect(component.paymentForm.value).toEqual(expectFormValues);
      });
    });

    describe('given this is an existing payment', () => {
      beforeEach(() => {
        // Assemble
        component.currentPayment = mockPayment;
        spyOnProperty(
          TestBed.inject(ClientsService),
          'clients'
        ).and.returnValue(mockClients);

        // Act
        component.ngOnInit();
      });

      const expectFormValues = {
        date: new Date(2022, 10, 11),
        client: 'Bob Hope',
        paymentType: PaymentType.EFT,
        amount: 100,
      };

      it('should set isNewClient to false', () => {
        // Assert
        expect(component.isVoidPayment).toBeFalse();
      });

      it('should set form as required', () => {
        // Assert
        expect(component.paymentForm.value).toEqual(expectFormValues);
      });
    });
  });

  describe('onSubmitClick()', () => {
    describe('given isVoidPayment is true', () => {
      it('should emit voidPayment', () => {
        // Assemble
        component.isVoidPayment = true;
        let emitSpy = spyOn(component.voidPayment, 'emit');

        // Act
        component.onSubmitClick();

        // Asset
        expect(emitSpy).toHaveBeenCalled();
      });
    });

    describe('given isVoidPayment is false', () => {
      it('should NOT emit voidPayment', () => {
        // Assemble
        component.isVoidPayment = false;
        let emitSpy = spyOn(component.voidPayment, 'emit');

        // Act
        component.onSubmitClick();

        // Asset
        expect(emitSpy).not.toHaveBeenCalled();
      });

      describe('given isNewPayment is true', () => {
        it('should emit newPayment', () => {
          // Assemble
          component.isVoidPayment = false;
          component.isNewPayment = true;
          let emitSpy = spyOn(component.newPayment, 'emit');

          // Act
          component.onSubmitClick();

          // Asset
          expect(emitSpy).toHaveBeenCalled();
        });
      });

      describe('given isNewPayment is false', () => {
        it('should NOT emit newPayment', () => {
          // Assemble
          component.isVoidPayment = false;
          component.isNewPayment = false;
          let emitSpy = spyOn(component.newPayment, 'emit');

          // Act
          component.onSubmitClick();

          // Asset
          expect(emitSpy).not.toHaveBeenCalled();
        });
      });

      describe('given isSaveAndNew is true', () => {
        it('should NOT emit closed', () => {
          // Assemble
          component.isVoidPayment = false;
          component.isNewPayment = false;
          component.isSaveAndNew = true;
          let emitSpy = spyOn(component.closed, 'emit');

          // Act
          component.onSubmitClick();

          // Asset
          expect(emitSpy).not.toHaveBeenCalled();
        });
      });

      describe('given isSaveAndNew is false', () => {
        it('should emit closed', () => {
          // Assemble
          component.isVoidPayment = false;
          component.isNewPayment = false;
          component.isSaveAndNew = false;
          let emitSpy = spyOn(component.closed, 'emit');

          // Act
          component.onSubmitClick();

          // Asset
          expect(emitSpy).toHaveBeenCalled();
        });
      });
    });
  });
});
