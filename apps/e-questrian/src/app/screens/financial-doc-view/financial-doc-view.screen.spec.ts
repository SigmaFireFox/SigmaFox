import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralScreenHeaderComponent } from 'src/app/components/general-screen-header/general-screen-header.component';
import { DocView } from 'src/app/interfaces/common-page-configs.interface';
import { FinancialDocViewScreen } from './financial-doc-view.screen';

describe('DocViewScreen', () => {
  let component: FinancialDocViewScreen;
  let fixture: ComponentFixture<FinancialDocViewScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialDocViewScreen, GeneralScreenHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialDocViewScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const mockConfig = {
    header: 'A header',
    subHeader: 'A subheader',
  } as DocView;

  describe('ngOnInit()', () => {
    it('should set the general config', () => {
      // Assemble
      component.config = mockConfig;
      const expectedGeneralConfig = {
        header: 'A header',
        subHeader: 'A subheader',
      };

      // Act
      component.ngOnInit();

      // Assert
      expect(component.generalConfig).toEqual(expectedGeneralConfig);
    });
  });
});
