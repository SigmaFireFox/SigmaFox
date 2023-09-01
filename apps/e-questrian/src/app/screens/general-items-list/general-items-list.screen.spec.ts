import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralScreenHeaderComponent } from 'src/app/components/general-screen-header/general-screen-header.component';
import { GeneralItemsListPageConfig } from 'src/app/interfaces/common-page-configs.interface';
import { GeneralItemsListScreen } from './general-items-list.screen';

describe('GeneralItemsListScreen', () => {
  let component: GeneralItemsListScreen;
  let fixture: ComponentFixture<GeneralItemsListScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralItemsListScreen, GeneralScreenHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralItemsListScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const mockConfig = {
    header: 'A header',
    subHeader: 'A subheader',
    columns: [
      { content: 'Header 1', widthFactor: 1 },
      { content: 'Header 2', widthFactor: 2 },
    ],
    items: {
      1: [{ content: 'Content 1-1' }, { content: 'Content 1-2' }],
      2: [{ content: 'Content 2-1' }, { content: 'Content 2-2' }],
    },
  } as GeneralItemsListPageConfig;

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

    it('should set the column widths', () => {
      // Assemble
      component.config = mockConfig;
      const expectedListConfig = {
        columns: [
          Object({ content: 'Header 1', widthFactor: 1, widthPerc: '33%' }),
          Object({ content: 'Header 2', widthFactor: 2, widthPerc: '67%' }),
        ],
        items: Object({
          1: [
            Object({ content: 'Content 1-1', widthPerc: '33%' }),
            Object({ content: 'Content 1-2', widthPerc: '67%' }),
          ],
          2: [
            Object({ content: 'Content 2-1', widthPerc: '33%' }),
            Object({ content: 'Content 2-2', widthPerc: '67%' }),
          ],
        }),
      } as GeneralItemsListPageConfig;

      // Act
      component.ngOnInit();

      // Assert
      expect(component.listConfig).toEqual(expectedListConfig);
    });
  });
});
