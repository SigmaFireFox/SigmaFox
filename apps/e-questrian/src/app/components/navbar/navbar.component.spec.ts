import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatIconModule],
      providers: [{ provide: Router, useValue: mockRouter }],
      declarations: [NavbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit()', () => {
    describe('given the screen with is less then 450px', () => {
      beforeEach(() => {
        spyOnProperty(component, 'innerWidth', 'get').and.returnValue(300);
      });

      it('should set isMobileView to true', () => {
        // Act
        component.ngOnInit();

        // Assert
        expect(component.isMobileView).toBeTrue();
      });

      it('should set displayMenu to false', () => {
        // Act
        component.ngOnInit();

        // Assert
        expect(component.displayMenu).toBeFalse();
      });
    });

    describe('given the screen with is equal 450px', () => {
      beforeEach(() => {
        spyOnProperty(component, 'innerWidth', 'get').and.returnValue(450);
      });

      it('should set isMobileView to true', () => {
        // Act
        component.ngOnInit();

        // Assert
        expect(component.isMobileView).toBeTrue();
      });

      it('should set displayMenu to false', () => {
        // Act
        component.ngOnInit();

        // Assert
        expect(component.displayMenu).toBeFalse();
      });
    });

    describe('given the screen with is more then 450px', () => {
      beforeEach(() => {
        spyOnProperty(component, 'innerWidth', 'get').and.returnValue(600);
      });

      it('should set isMobileView to false', () => {
        // Act
        component.ngOnInit();

        // Assert
        expect(component.isMobileView).toBeFalse();
      });

      it('should set displayMenu to true', () => {
        // Act
        component.ngOnInit();

        // Assert
        expect(component.displayMenu).toBeTrue();
      });
    });
  });

  describe('onLogoClick()', () => {
    it('should navigate to home', () => {
      // Act
      component.onLogoClick();

      // Assert
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    });
  });

  describe('onMenuIconClick()', () => {
    it('should toggle displayMenu', () => {
      // Assemble
      component.displayMenu = false;

      // Act
      component.onMenuIconClick();

      // Assert
      expect(component.displayMenu).toBeTrue();

      // Act
      component.onMenuIconClick();

      // Assert
      expect(component.displayMenu).toBeFalse();
    });
  });

  describe('onMenuOptionClicked()', () => {
    it('given isMobileView is true, should set displayMenu to false', () => {
      // Assemble
      component.isMobileView = true;

      // Act
      component.onMenuOptionClicked('new_page');

      // Assert
      expect(component.displayMenu).toBeFalse();
    });

    it('given isMobileView is false, should navigate to the path provided', () => {
      // Assemble
      component.isMobileView = false;

      // Act
      component.onMenuOptionClicked('/new_page');

      // Assert
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/new_page']);
    });
  });
});
