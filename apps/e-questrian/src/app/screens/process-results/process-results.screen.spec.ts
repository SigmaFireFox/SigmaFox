import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProcessResultsPageConfig } from 'src/app/interfaces/common-page-configs.interface';
import { ProcessResultsScreen } from './process-results.screen';

describe('ProcessResultsScreen', () => {
  let component: ProcessResultsScreen;
  let fixture: ComponentFixture<ProcessResultsScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProcessResultsScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessResultsScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const mockConfig = {
    header: 'A header',
    subHeader: 'A subheader',
  } as ProcessResultsPageConfig;

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
