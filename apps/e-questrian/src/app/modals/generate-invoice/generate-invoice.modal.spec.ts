import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ClientDetail, Clients } from 'src/app/interfaces/clients.interface';
import {
  ClientRange,
  DateRange,
  GenerateInvoiceModal,
  GenerateInvoiceParameters,
  InvoiceRange,
} from './generate-invoice.modal';

describe('GenerateInvoiceModal', () => {
  let component: GenerateInvoiceModal;
  let fixture: ComponentFixture<GenerateInvoiceModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatRadioModule, ReactiveFormsModule],
      declarations: [GenerateInvoiceModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateInvoiceModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const mockClients = {
    1: { displayName: 'Bob Hope' } as ClientDetail,
  } as Clients;

  it('should set the clients list', () => {
    // Assemble
    spyOnProperty(component, 'clients', 'get').and.returnValue(mockClients);
    const expectedClients = mockClients;

    // Assert
    expect(component.clients).toEqual(expectedClients);
  });

  describe('onSubmitClick()', () => {
    describe('given isGenerate is true', () => {
      it('should emit generateStatementParameters with the correct parameters', () => {
        // Assemble
        component.isGenerate = true;
        component.invoiceRange = InvoiceRange.ALL;
        component.dateRange = DateRange.ALL;
        component.clientRange = ClientRange.ALL;
        component.selectedDate = new Date(2022, 1, 10);
        component.selectedClients = [];

        const emitSpy = spyOn(component.generateInvoiceParameters, 'emit');
        const expectedParms = {
          invoiceRange: InvoiceRange.ALL,
          dateRange: DateRange.ALL,
          clientRange: ClientRange.ALL,
          date: new Date(2022, 1, 10),
          clients: [] as ClientDetail[],
        } as GenerateInvoiceParameters;

        // Act
        component.onSubmitClick();

        // Assert
        expect(emitSpy).toHaveBeenCalledWith(expectedParms);
      });
    });

    describe('given isGenerate is false', () => {
      it('should emit cancelled', () => {
        // Assemble
        component.isGenerate = false;
        const emitSpy = spyOn(component.cancelled, 'emit');

        // Act
        component.onSubmitClick();

        // Assert
        expect(emitSpy).toHaveBeenCalled();
      });
    });
  });

  describe('onGenerateInvoicesClick()', () => {
    it('should set isGenerate to true', () => {
      // Assemble
      component.isGenerate = false;

      // Act
      component.onGenerateInvoicesClick();

      // Assert
      expect(component.isGenerate).toBeTrue();
    });
  });
});
