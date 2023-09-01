import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { GeneralScreenHeaderComponent } from 'src/app/components/general-screen-header/general-screen-header.component';
import { OptionAction } from 'src/app/interfaces/menu-options.interface';
import { CalendarPage } from 'src/app/pages/calendar/calendar.page';
import { AuthGuardService } from 'src/app/services/auth-gaurd/auth-guard.service';
import { MenuComponent } from './menu.component';

describe('MenuScreen', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let routerSpy: jasmine.Spy;
  let viewStateSelectedSpy: jasmine.Spy;
  let actionSelectedSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'calendar', component: CalendarPage },
        ]),
      ],
      declarations: [MenuComponent, GeneralScreenHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    routerSpy = spyOn(
      TestBed.inject(Router),
      'navigateByUrl'
    ).and.callThrough();
    viewStateSelectedSpy = spyOn(
      component.viewStateSelected,
      'emit'
    ).and.callThrough();
    actionSelectedSpy = spyOn(
      component.actionSelected,
      'emit'
    ).and.callThrough();
  });

  describe('onMenuOptionClicked()', () => {
    describe('given there is an action provided', () => {
      it('should emit actionSelected', () => {
        // Act
        component.onMenuOptionClicked(OptionAction.Log_Out, undefined, 1);

        // Assert
        expect(actionSelectedSpy).toHaveBeenCalledOnceWith(OptionAction.Log_Out);
      });

      describe('given there is a path provided', () => {
        it('should navigate to that path', () => {
          // Assemble
          // routerSpy.and.callThrough();
          // viewStateSelectedSpy.and.callThrough();

          // Act
          component.onMenuOptionClicked(undefined, 'calendar', undefined);

          // Assert
          expect(routerSpy).toHaveBeenCalledOnceWith('calendar');
          expect(viewStateSelectedSpy).not.toHaveBeenCalled();
        });
      });

      describe('given there is NO path provided', () => {
        describe('given there is a viewstate provided', () => {
          it('should emit viewStateSelected', () => {
            // Assemble
            // routerSpy.and.callThrough();
            // viewStateSelectedSpy.and.callThrough();

            // Act
            component.onMenuOptionClicked(undefined, undefined, 1);

            // Assert
            expect(routerSpy).not.toHaveBeenCalled();
            expect(viewStateSelectedSpy).toHaveBeenCalledOnceWith(1);
          });
        });

        describe('given there is NO viewstate provided', () => {
          it('should not navigate nor emit', () => {
            // Assemble
            // routerSpy.and.callThrough();
            // viewStateSelectedSpy.and.callThrough();

            // Act
            component.onMenuOptionClicked(undefined, undefined, undefined);

            // Assert
            expect(routerSpy).not.toHaveBeenCalled();
            expect(viewStateSelectedSpy).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe('given there is NO action provided', () => {
      describe('given there is a path provided', () => {
        it('should navigate to that path', () => {
          // Assemble
          // routerSpy.and.callThrough();
          // viewStateSelectedSpy.and.callThrough();

          // Act
          component.onMenuOptionClicked(undefined, 'calendar', undefined);

          // Assert
          expect(routerSpy).toHaveBeenCalledOnceWith('calendar');
          expect(viewStateSelectedSpy).not.toHaveBeenCalled();
        });
      });

      describe('given there is NO path provided', () => {
        describe('given there is a viewstate provided', () => {
          it('should emit viewStateSelected', () => {
            // Assemble
            // routerSpy.and.callThrough();
            // viewStateSelectedSpy.and.callThrough();

            // Act
            component.onMenuOptionClicked(undefined, undefined, 1);

            // Assert
            expect(routerSpy).not.toHaveBeenCalled();
            expect(viewStateSelectedSpy).toHaveBeenCalledOnceWith(1);
          });
        });

        describe('given there is NO viewstate provided', () => {
          it('should not navigate nor emit', () => {
            // Assemble
            // routerSpy.and.callThrough();
            // viewStateSelectedSpy.and.callThrough();

            // Act
            component.onMenuOptionClicked(undefined, undefined, undefined);

            // Assert
            expect(routerSpy).not.toHaveBeenCalled();
            expect(viewStateSelectedSpy).not.toHaveBeenCalled();
          });
        });
      });
    });
  });
});
