import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FinancesPage } from './finances.page';
import { FinancePageViewState as ViewState } from 'src/app/enums/viewstates.enum';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import {
  PaymentDetails,
  Payments,
} from 'src/app/interfaces/payments.interface';
import { PaymentType } from 'src/app/enums/payments.enum';
import {
  DocID,
  FinancialDocItem,
  FinancialDocType,
} from 'src/app/interfaces/common-page-configs.interface';
import {
  ClientRange,
  DateRange,
  GenerateInvoiceParameters,
  InvoiceRange,
} from 'src/app/modals/generate-invoice/generate-invoice.modal';
import { NoInvoiceGeneratedResultsPageConfig } from 'src/app/configs/finance-page.configs';
import { GenerateStatementParameters } from 'src/app/modals/generate-statement/generate-statement.modal';
import { GeneralScreenHeaderComponent } from 'src/app/components/general-screen-header/general-screen-header.component';
import { ClientNotificationService } from 'src/app/services/client-notification/client-notification.service';
import {
  GenerateInvoiceResult,
  InvoicesService,
} from 'src/app/services/invoices/invoices.service';
import { PaymentsService } from 'src/app/services/payments/payments.service';
import { StatementsService } from 'src/app/services/statements/statements.service';

describe('FinancesPage', () => {
  let component: FinancesPage;
  let fixture: ComponentFixture<FinancesPage>;

  let mockPayment = {
    date: new Date(),
    client: 3,
    paymentType: PaymentType.CASH,
    amount: 150,
    voided: false,
  } as PaymentDetails;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [FinancesPage, MenuComponent, GeneralScreenHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('onMenuOptionClicked', () => {
    it('should switch the ViewState to the selected ViewState', () => {
      // Act
      component.onMenuOptionClicked(ViewState.MAIN);

      // Assert
      expect(component.currentViewState).toBe(ViewState.MAIN);

      // Act
      component.onMenuOptionClicked(ViewState.INVOICES);

      // Assert
      expect(component.currentViewState).toBe(ViewState.INVOICES);
    });
  });

  describe('onInvoiceClicked', () => {
    const mockInvoiceID = 1;
    const mockDocID = {
      docType: FinancialDocType.INVOICE,
      docNum: mockInvoiceID,
    } as DocID;

    it(`should switch the ViewState to ViewState.INVOICE_DETAIL`, () => {
      // Act
      component.onInvoiceClicked(mockDocID);

      // Assert
      expect(component.currentViewState).toBe(ViewState.INVOICE_DETAIL);
    });

    it(`should call getInvoiceDocForDisplay with the invoice ID`, () => {
      // Assemble
      let getInvoiceSpy = spyOn(
        TestBed.inject(InvoicesService),
        'setInvoiceDocForDisplay'
      );

      // Act
      component.onInvoiceClicked(mockDocID);

      // Assert
      expect(getInvoiceSpy).toHaveBeenCalledOnceWith(mockInvoiceID);
    });
  });

  describe('onPaymentClicked', () => {
    const mockPaymentID = 2;
    const mockDocID = {
      docType: FinancialDocType.PAYMENT,
      docNum: mockPaymentID,
    } as DocID;
    const expectedCurrentPayment = mockPayment;
    const mockPayments = {
      1: {} as PaymentDetails,
      2: expectedCurrentPayment,
    } as Payments;

    it(`should call getPaymentData`, () => {
      // Assemble
      let getPaymentDataSpy = spyOnProperty(
        TestBed.inject(PaymentsService),
        'payments',
        'get'
      );

      // Act
      component.onPaymentClicked(mockDocID);

      // Assert
      expect(getPaymentDataSpy).toHaveBeenCalled();
    });

    it(`should set currentPayment based the currentPaymentID provided`, () => {
      // Assemble
      spyOnProperty(
        TestBed.inject(PaymentsService),
        'payments',
        'get'
      ).and.returnValue(mockPayments);

      // Act
      component.onPaymentClicked(mockDocID);

      // Assert
      expect(component.currentPayment).toEqual(expectedCurrentPayment);
    });

    it(`should witch the ViewState to ViewState.PAYMENT_DETAIL`, () => {
      // Act
      component.onPaymentClicked(mockDocID);

      // Assert
      expect(component.currentViewState).toBe(ViewState.PAYMENT_DETAIL);
    });
  });

  describe('onStatementClicked', () => {
    describe('given document clicked is an invoice', () => {
      const mockInvoiceID = 1;
      const mockDocID = {
        docType: FinancialDocType.INVOICE,
        docNum: mockInvoiceID,
      } as DocID;

      it(`should witch the ViewState to ViewState.INVOICE_DETAIL`, () => {
        // Act
        component.onStatementClicked(mockDocID);

        // Assert
        expect(component.currentViewState).toBe(ViewState.INVOICE_DETAIL);
      });

      it(`should call getInvoiceDocForDisplay with the invoice ID`, () => {
        // Assemble
        let getInvoiceSpy = spyOn(
          TestBed.inject(InvoicesService),
          'setInvoiceDocForDisplay'
        );

        // Act
        component.onStatementClicked(mockDocID);

        // Assert
        expect(getInvoiceSpy).toHaveBeenCalledOnceWith(mockInvoiceID);
      });
    });

    describe('given document clicked is an payment', () => {
      const mockPaymentID = 2;
      const mockDocID = {
        docType: FinancialDocType.PAYMENT,
        docNum: mockPaymentID,
      } as DocID;
      const expectedCurrentPayment = {
        date: new Date(),
        client: 3,
        paymentType: PaymentType.CASH,
        amount: 150,
        voided: false,
      } as PaymentDetails;
      const mockPayments = {
        1: {} as PaymentDetails,
        2: expectedCurrentPayment,
      } as Payments;

      it(`should call getPaymentData`, () => {
        // Assemble
        let getPaymentDataSpy = spyOnProperty(
          TestBed.inject(PaymentsService),
          'payments',
          'get'
        );

        // Act
        component.onPaymentClicked(mockDocID);

        // Assert
        expect(getPaymentDataSpy).toHaveBeenCalled();
      });

      it(`should set currentPayment based the currentPaymentID provided`, () => {
        // Assemble
        spyOnProperty(
          TestBed.inject(PaymentsService),
          'payments',
          'get'
        ).and.returnValue(mockPayments);

        // Act
        component.onPaymentClicked(mockDocID);

        // Assert
        expect(component.currentPayment).toEqual(expectedCurrentPayment);
      });

      it(`should witch the ViewState to ViewState.PAYMENT_DETAIL`, () => {
        // Act
        component.onStatementClicked(mockDocID);

        // Assert
        expect(component.currentViewState).toBe(ViewState.PAYMENT_DETAIL);
      });
    });
  });

  describe('paymentCreated', () => {
    it(`should call setInvoiceDataForDisplay with the payment`, () => {
      // Assemble
      let addPaymentSpy = spyOn(TestBed.inject(PaymentsService), 'addPayment');

      // Act
      component.paymentCreated(mockPayment);

      // Assert
      expect(addPaymentSpy).toHaveBeenCalledOnceWith(mockPayment);
    });

    it(`should call sendPaymentReceipt with the payment`, fakeAsync(() => {
      let sendPaymentReceiptSpy = spyOn(
        TestBed.inject(ClientNotificationService),
        'sendPaymentReceipt'
      );

      // Act
      component.paymentCreated(mockPayment);
      tick();

      // Assert
      expect(sendPaymentReceiptSpy).toHaveBeenCalledOnceWith(mockPayment);
    }));
  });

  describe('paymentEdited', () => {
    it(`should call editPayment with the payment received as not voided`, () => {
      // Assemble
      component['currentPaymentID'] = 1;
      mockPayment = {
        date: new Date(),
        client: 3,
        paymentType: PaymentType.CASH,
        amount: 150,
      } as unknown as PaymentDetails;

      const expectedPayment = {
        date: new Date(),
        client: 3,
        paymentType: PaymentType.CASH,
        amount: 150,
        voided: false,
      } as unknown as PaymentDetails;

      let editPaymentSpy = spyOn(
        TestBed.inject(PaymentsService),
        'editPayment'
      );

      // Act
      component.paymentEdited(mockPayment);

      // Assert
      expect(editPaymentSpy).toHaveBeenCalledOnceWith(1, expectedPayment);
    });
  });

  describe('paymentVoided', () => {
    it(`should call voidPayment with the currentPaymentID`, () => {
      // Assemble
      component['currentPaymentID'] = 1;
      let voidPaymentSpy = spyOn(
        TestBed.inject(PaymentsService),
        'voidPayment'
      );

      // Act
      component.paymentVoided();

      // Assert
      expect(voidPaymentSpy).toHaveBeenCalledOnceWith(1);
    });

    it(`should witch the ViewState to ViewState.VIEW_PAYMENTS`, () => {
      // Act
      component.paymentVoided();

      // Assert
      expect(component.currentViewState).toBe(ViewState.VIEW_PAYMENTS);
    });

    it(`should set currentPaymentID to 0`, () => {
      // Act
      component.paymentVoided();

      // Assert
      expect(component['currentPaymentID']).toBe(0);
    });

    it(`should call setPaymentDocForDisplay`, () => {
      // Assemble
      let setPaymentListSpy = spyOn(
        TestBed.inject(PaymentsService),
        'setPaymentDocForDisplay'
      );

      // Act
      component.paymentVoided();

      // Assert
      expect(setPaymentListSpy).toHaveBeenCalled();
    });

    it(`should paymentListPageConfig.items to the response from setPaymentDocForDisplay`, () => {
      // Assemble
      const mockFinancialDocItem = {
        number: 1,
        date: new Date(),
        detail: 'Some detail',
        amount: 200,
        docType: FinancialDocType.PAYMENT,
      };
      const mockSetPaymentDocForDisplayResponse = [mockFinancialDocItem];

      spyOn(
        TestBed.inject(PaymentsService),
        'setPaymentDocForDisplay'
      ).and.returnValue(mockSetPaymentDocForDisplayResponse);

      // Act
      component.paymentVoided();

      // Assert
      expect(component.paymentListPageConfig.items).toBe(
        mockSetPaymentDocForDisplayResponse
      );
    });
  });

  describe('generateInvoices', () => {
    // Assemble
    const mockClientDetail = {
      displayName: '',
      firstName: '',
      lastName: '',
      email: '',
      telephoneNumber: '',
    };
    const mockParms = {
      invoiceRange: InvoiceRange.ALL,
      dateRange: DateRange.ALL,
      clientRange: ClientRange.ALL,
      date: new Date(),
      clients: [mockClientDetail],
    } as GenerateInvoiceParameters;

    it(`should call generateInvoices with the params provided`, () => {
      // Assemble
      let generateInvoicesSpy = spyOn(
        TestBed.inject(InvoicesService),
        'generateInvoices'
      );

      // Act
      component.generateInvoices(mockParms);

      // Assert
      expect(generateInvoicesSpy).toHaveBeenCalledOnceWith(mockParms);
    });

    describe('given there are invoices generated', () => {
      it(`should call setInvoiceGenerationResultsForDisplay with the results of the invoice generation`, () => {
        // Assemble
        const mockGenerateInvoiceResult = {
          numberOfInvoices: 2,
          clients: [1, 2],
          startDate: new Date(),
          endDate: new Date(),
          totalValue: 300,
          largestValue: 200,
          averageValue: 150,
        } as GenerateInvoiceResult;

        spyOn(
          TestBed.inject(InvoicesService),
          'generateInvoices'
        ).and.returnValue(mockGenerateInvoiceResult);

        let resultsSpy = spyOn(
          TestBed.inject(InvoicesService),
          'setInvoiceGenerationResultsForDisplay'
        );

        // Act
        component.generateInvoices(mockParms);

        // Assert
        expect(resultsSpy).toHaveBeenCalledOnceWith(mockGenerateInvoiceResult);
      });
    });

    describe('given there are NO invoices generated', () => {
      // Assemble
      const mockGenerateInvoiceResult = {
        numberOfInvoices: 0,
      } as GenerateInvoiceResult;

      it(`should NOT call setInvoiceGenerationResultsForDisplay`, () => {
        spyOn(
          TestBed.inject(InvoicesService),
          'generateInvoices'
        ).and.returnValue(mockGenerateInvoiceResult);

        let resultsSpy = spyOn(
          TestBed.inject(InvoicesService),
          'setInvoiceGenerationResultsForDisplay'
        );

        // Act
        component.generateInvoices(mockParms);

        // Assert
        expect(resultsSpy).not.toHaveBeenCalled();
      });

      it(`should set generateInvoiceResultsPageConfig to NoInvoiceGeneratedResultsPageConfig`, () => {
        // Assemble
        spyOn(
          TestBed.inject(InvoicesService),
          'generateInvoices'
        ).and.returnValue(mockGenerateInvoiceResult);

        spyOn(
          TestBed.inject(InvoicesService),
          'setInvoiceGenerationResultsForDisplay'
        );

        // Act
        component.generateInvoices(mockParms);

        // Assert
        expect(component.generateInvoiceResultsPageConfig).toEqual(
          NoInvoiceGeneratedResultsPageConfig
        );
      });
    });

    it(`should switch the ViewState to ViewState.GENERATE_INVOICES_RESULTS`, () => {
      // Act
      component.generateInvoices(mockParms);

      // Assert
      expect(component.currentViewState).toBe(
        ViewState.GENERATE_INVOICES_RESULTS
      );
    });

    describe('switchViewState', () => {
      it(`should switch the ViewState to the received ViewState`, () => {
        // Act
        component.switchViewState(ViewState.MAIN);

        // Assert
        expect(component.currentViewState).toBe(ViewState.MAIN);

        // Act
        component.switchViewState(ViewState.INVOICE_DETAIL);

        // Assert
        expect(component.currentViewState).toBe(ViewState.INVOICE_DETAIL);
      });

      describe('given received ViewState is ViewState.VIEW_INVOICES', () => {
        it(`should call setInvoiceDataForDisplay`, () => {
          // Assemble
          let getInvoiceDataSpy = spyOn(
            TestBed.inject(InvoicesService),
            'setInvoiceDataForDisplay'
          );

          // Act
          component.switchViewState(ViewState.VIEW_INVOICES);

          // Assert
          expect(getInvoiceDataSpy).toHaveBeenCalled();
        });
      });

      describe('given received ViewState is ViewState.INVOICE_DETAIL', () => {
        it(`should call getInvoiceDocForDisplay with the invoice ID`, () => {
          // Assemble
          component['currentInvoiceID'] = 1;
          let getInvoiceSpy = spyOn(
            TestBed.inject(InvoicesService),
            'setInvoiceDocForDisplay'
          );

          // Act
          component.switchViewState(ViewState.INVOICE_DETAIL);

          // Assert
          expect(getInvoiceSpy).toHaveBeenCalledOnceWith(1);
        });
      });

      describe('given received ViewState is ViewState.VIEW_PAYMENTS', () => {
        it(`should set currentPaymentID to 0`, () => {
          // Act
          component.switchViewState(ViewState.VIEW_PAYMENTS);

          // Assert
          expect(component['currentPaymentID']).toBe(0);
        });

        it(`should call setPaymentDocForDisplay`, () => {
          // Assemble
          let setPaymentListSpy = spyOn(
            TestBed.inject(PaymentsService),
            'setPaymentDocForDisplay'
          );

          // Act
          component.switchViewState(ViewState.VIEW_PAYMENTS);

          // Assert
          expect(setPaymentListSpy).toHaveBeenCalled();
        });

        it(`should paymentListPageConfig.items to the response from setPaymentDocForDisplay`, () => {
          // Assemble
          const mockFinancialDocItem = {
            number: 1,
            date: new Date(),
            detail: 'Some detail',
            amount: 200,
            docType: FinancialDocType.PAYMENT,
          };
          const mockSetPaymentDocForDisplayResponse = [mockFinancialDocItem];

          spyOn(
            TestBed.inject(PaymentsService),
            'setPaymentDocForDisplay'
          ).and.returnValue(mockSetPaymentDocForDisplayResponse);

          // Act
          component.switchViewState(ViewState.VIEW_PAYMENTS);

          // Assert
          expect(component.paymentListPageConfig.items).toBe(
            mockSetPaymentDocForDisplayResponse
          );
        });
      });

      describe('given received ViewState is ViewState.PAYMENTS', () => {
        it(`should set currentPaymentID to 0`, () => {
          // Act
          component.switchViewState(ViewState.PAYMENTS);

          // Assert
          expect(component['currentPaymentID']).toBe(0);
        });
      });
    });
  });

  describe('generateStatement', () => {
    // Assemble
    const mockClientDetail = {
      displayName: '',
      firstName: '',
      lastName: '',
      email: '',
      telephoneNumber: '',
    };
    const mockParms = {
      client: mockClientDetail,
      startDate: new Date(),
      endDate: new Date(),
    } as GenerateStatementParameters;

    it(`should call generateStatement with the params provided`, () => {
      // Assemble
      let generateInvoicesSpy = spyOn(
        TestBed.inject(StatementsService),
        'generateStatement'
      );

      // Act
      component.generateStatement(mockParms);

      // Assert
      expect(generateInvoicesSpy).toHaveBeenCalledOnceWith(mockParms);
    });

    it(`should set statementPageConfig.items with the results of the invoice generation`, () => {
      // Assemble
      const mockFinancialDocItem = {
        number: 1,
        date: new Date(),
        detail: 'Some detail',
        amount: 200,
        docType: FinancialDocType.INVOICE,
      } as FinancialDocItem;

      const mockGenerateStatementResult = [
        mockFinancialDocItem,
      ] as FinancialDocItem[];

      spyOn(
        TestBed.inject(StatementsService),
        'generateStatement'
      ).and.returnValue(mockGenerateStatementResult);

      // Act
      component.generateStatement(mockParms);

      // Assert
      expect(component.statementPageConfig.items).toBe(
        mockGenerateStatementResult
      );
    });

    it(`should switch the ViewState to ViewState.VIEW_STATEMENT`, () => {
      // Act
      component.generateStatement(mockParms);

      // Assert
      expect(component.currentViewState).toBe(ViewState.VIEW_STATEMENT);
    });

    describe('switchViewState', () => {
      it(`should switch the ViewState to the received ViewState`, () => {
        // Act
        component.switchViewState(ViewState.MAIN);

        // Assert
        expect(component.currentViewState).toBe(ViewState.MAIN);

        // Act
        component.switchViewState(ViewState.INVOICE_DETAIL);

        // Assert
        expect(component.currentViewState).toBe(ViewState.INVOICE_DETAIL);
      });

      describe('given received ViewState is ViewState.VIEW_INVOICES', () => {
        it(`should call setInvoiceDataForDisplay`, () => {
          // Assemble
          let getInvoiceDataSpy = spyOn(
            TestBed.inject(InvoicesService),
            'setInvoiceDataForDisplay'
          );

          // Act
          component.switchViewState(ViewState.VIEW_INVOICES);

          // Assert
          expect(getInvoiceDataSpy).toHaveBeenCalled();
        });
      });

      describe('given received ViewState is ViewState.INVOICE_DETAIL', () => {
        it(`should call getInvoiceDocForDisplay with the invoice ID`, () => {
          // Assemble
          component['currentInvoiceID'] = 1;
          let getInvoiceSpy = spyOn(
            TestBed.inject(InvoicesService),
            'setInvoiceDocForDisplay'
          );

          // Act
          component.switchViewState(ViewState.INVOICE_DETAIL);

          // Assert
          expect(getInvoiceSpy).toHaveBeenCalledOnceWith(1);
        });
      });

      describe('given received ViewState is ViewState.VIEW_PAYMENTS', () => {
        it(`should set currentPaymentID to 0`, () => {
          // Act
          component.switchViewState(ViewState.VIEW_PAYMENTS);

          // Assert
          expect(component['currentPaymentID']).toBe(0);
        });

        it(`should call setPaymentDocForDisplay`, () => {
          // Assemble
          let setPaymentListSpy = spyOn(
            TestBed.inject(PaymentsService),
            'setPaymentDocForDisplay'
          );

          // Act
          component.switchViewState(ViewState.VIEW_PAYMENTS);

          // Assert
          expect(setPaymentListSpy).toHaveBeenCalled();
        });

        it(`should paymentListPageConfig.items to the response from setPaymentDocForDisplay`, () => {
          // Assemble
          const mockFinancialDocItem = {
            number: 1,
            date: new Date(),
            detail: 'Some detail',
            amount: 200,
            docType: FinancialDocType.PAYMENT,
          };
          const mockSetPaymentDocForDisplayResponse = [mockFinancialDocItem];

          spyOn(
            TestBed.inject(PaymentsService),
            'setPaymentDocForDisplay'
          ).and.returnValue(mockSetPaymentDocForDisplayResponse);

          // Act
          component.switchViewState(ViewState.VIEW_PAYMENTS);

          // Assert
          expect(component.paymentListPageConfig.items).toBe(
            mockSetPaymentDocForDisplayResponse
          );
        });
      });

      describe('given received ViewState is ViewState.PAYMENTS', () => {
        it(`should set currentPaymentID to 0`, () => {
          // Act
          component.switchViewState(ViewState.PAYMENTS);

          // Assert
          expect(component['currentPaymentID']).toBe(0);
        });
      });
    });
  });
});
