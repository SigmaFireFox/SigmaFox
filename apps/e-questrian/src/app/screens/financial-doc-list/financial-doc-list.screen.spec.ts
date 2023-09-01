import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralScreenHeaderComponent } from 'src/app/components/general-screen-header/general-screen-header.component';
import {
  FinancialDocItem,
  FinancialDocListPageConfig,
  FinancialDocType,
} from 'src/app/interfaces/common-page-configs.interface';
import { FinancialDocListScreen } from './financial-doc-list.screen';

describe('FinancialDocListScreen', () => {
  let component: FinancialDocListScreen;
  let fixture: ComponentFixture<FinancialDocListScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FinancialDocListScreen, GeneralScreenHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialDocListScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit()', () => {
    it('should set the page config', () => {
      // Assemble
      const mockConfig = { header: 'A header', subHeader: 'A sub header' };
      component.config = mockConfig as FinancialDocListPageConfig;
      const expectedConfig = mockConfig;

      // Act
      component.ngOnInit();

      // Assert
      expect(component.generalConfig).toEqual(expectedConfig);
    });
  });

  describe('onItemClicked()', () => {
    it('should emit the item clicked', () => {
      // Assemble
      const mockItem = {
        docType: FinancialDocType.INVOICE,
        number: 1,
      } as FinancialDocItem;
      const emitSpy = spyOn(component.itemClicked, 'emit');

      // Act
      component.onItemClicked(mockItem);

      // Expect
      expect(emitSpy).toHaveBeenCalledWith({
        docType: 2,
        docNum: 1,
      });
    });
  });
});
