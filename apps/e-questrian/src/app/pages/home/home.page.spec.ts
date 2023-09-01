import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { MenuPageConfig } from 'src/app/interfaces/common-page-configs.interface';
import { GeneralScreenHeaderComponent } from 'src/app/components/general-screen-header/general-screen-header.component';
import {
  OptionAction,
  OptionStyling,
} from 'src/app/interfaces/menu-options.interface';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let authSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      providers: [AuthenticationService],
      declarations: [HomePage, MenuComponent, GeneralScreenHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should set the config for the screen', () => {
      // Assemble
      const exectConfig = {
        header: 'e-Questrian',
        subHeader: '',
        menu: [
          {
            display: 'Calendar',
            styling: OptionStyling.Primary,
            path: '/calendar',
          },
          {
            display: 'Finances',
            styling: OptionStyling.Primary,
            path: '/finances',
          },
          {
            display: 'Clients',
            styling: OptionStyling.Primary,
            path: '/clients',
          },
          {
            display: 'Log out',
            styling: OptionStyling.Secondary,
            path: '/signin',
            action: OptionAction.Log_Out,
          },
        ],
      } as MenuPageConfig;

      // Act
      component.ngOnInit();

      // Assert
      expect(component.config).toEqual(exectConfig);
    });
  });

  describe('onActionSelected', () => {
    describe('Given action is Log_Out', () => {
      it('should call authService UserSignOut', () => {
        // Assemble
        authSpy = spyOn(
          TestBed.inject(AuthenticationService),
          'UserSignOut'
        ).and.callThrough();

        // Act
        component.onActionSelected(OptionAction.Log_Out);

        // Assert
        expect(authSpy).toHaveBeenCalled();
      });
    });
  });
});
