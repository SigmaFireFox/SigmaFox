import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  GenerateStatementModal,
  GenerateStatementParameters,
} from './generate-statement.modal';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientDetail, Clients } from 'src/app/interfaces/clients.interface';
import { ClientsService } from 'src/app/services/clients/clients.service';
import {
  DateRangeSelector,
  DateRangeOption,
} from 'src/app/services/date/date.service';

describe('GenerateInvoiceModal', () => {
  let component: GenerateStatementModal;
  let fixture: ComponentFixture<GenerateStatementModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSelectModule, ReactiveFormsModule],
      providers: [ClientsService],
      declarations: [GenerateStatementModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateStatementModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const mockClients = {
    1: { displayName: 'Bob Hope' } as ClientDetail,
  } as Clients;
  const mockDateRangeOptions = [
    {
      display: 'This month',
      value: {
        selector: DateRangeSelector.THIS_MONTH,
        startDate: new Date(2022, 1, 11),
        endDate: new Date(2022, 20, 11),
      },
    },
  ] as DateRangeOption[];

  it('should set the clients list', () => {
    // Assemble
    spyOnProperty(component, 'clients', 'get').and.returnValue(mockClients);
    const expectedClients = mockClients;

    // Assert
    expect(component.clients).toEqual(expectedClients);
  });

  it('should call the date range options', () => {
    // Assemble
    spyOnProperty(component, 'dateRangeOptions', 'get').and.returnValue(
      mockDateRangeOptions
    );
    const expectedDateRangeOptions = mockDateRangeOptions;

    // Assert
    expect(component.dateRangeOptions).toEqual(expectedDateRangeOptions);
  });

  describe('onSubmitClick()', () => {
    describe('given isGenerate is true', () => {
      it('should emit generateStatementParameters with the correct parameters', () => {
        // Assemble
        component.isGenerate = true;
        component.selectedClient = mockClients[1];
        component.startDate = mockDateRangeOptions[0].value.startDate;
        component.endDate = mockDateRangeOptions[0].value.endDate;
        const emitSpy = spyOn(component.generateStatementParameters, 'emit');
        const expectedParms = {
          client: mockClients[1],
          startDate: mockDateRangeOptions[0].value.startDate,
          endDate: mockDateRangeOptions[0].value.endDate,
        } as GenerateStatementParameters;

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

  describe('onGenerateStatementClick()', () => {
    it('should set isGenerate to true', () => {
      // Assemble
      component.isGenerate = false;

      // Act
      component.onGenerateStatementClick();

      // Assert
      expect(component.isGenerate).toBeTrue();
    });
  });

  describe('onClientSelected()', () => {
    it('should set selectedClient to the value of the client field', () => {
      // Assemble
      component.generateStatementParametersForm.controls['client'].setValue(
        mockClients[1]
      );

      // Act
      component.onClientSelected();

      // Assert
      expect(component.selectedClient).toEqual(mockClients[1]);
    });
  });

  describe('onDateRangeSelected()', () => {
    const selectedDateRange = mockDateRangeOptions[0].value;

    beforeEach(() => {
      // Assemble
      component.generateStatementParametersForm.controls['dateRange'].setValue(
        selectedDateRange
      );

      // Act
      component.onDateRangeSelected();
    });

    it('should set selectedDateRange to the value of the dateRange field', () => {
      // Assert
      expect(component.selectedDateRange).toEqual(selectedDateRange);
    });

    it('should set startDate to the value of the selectedDateRange start date', () => {
      // Assert
      expect(component.startDate).toEqual(selectedDateRange.startDate);
    });

    it('should set endDate to the value of the selectedDateRange end date', () => {
      // Assert
      expect(component.endDate).toEqual(selectedDateRange.endDate);
    });

    it('should set startDate field value startDate', () => {
      // Assert
      expect(
        component.generateStatementParametersForm.controls['startDate'].value
      ).toEqual(selectedDateRange.startDate);
    });

    it('should set endDate field value endDate', () => {
      // Assert
      expect(
        component.generateStatementParametersForm.controls['endDate'].value
      ).toEqual(selectedDateRange.endDate);
    });

    describe('onStartDateChange()', () => {
      it('should set startDate to the value of the selectedDateRange start date', () => {
        // Act
        component.onStartDateChange();

        // Assert
        expect(component.startDate).toEqual(selectedDateRange.startDate);
      });
    });
    describe('onEndDateChange()', () => {
      it('should set endDate to the value of the selectedDateRange end date', () => {
        // Act
        component.onEndDateChange();

        // Assert
        expect(component.endDate).toEqual(selectedDateRange.endDate);
      });
    });
  });
});
