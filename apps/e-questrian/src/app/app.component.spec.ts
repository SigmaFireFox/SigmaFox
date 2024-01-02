import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomePage } from './pages/home/home.page';
import { TestDataService } from './services/test-data/test-data.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'home',
            component: HomePage,
          },
        ]),
      ],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    app = fixture.componentInstance;
  });

  describe('on Initialisation', () => {
    it(`should have as title 'e-questrian'`, () => {
      // Assert
      expect(app.title).toEqual('e-questrian');
    });

    it('should navigate home', () => {
      // Assemble
      const routerSpy: jasmine.Spy = spyOn(TestBed.inject(Router), 'navigate');

      // Act
      component.ngOnInit();

      // Assert
      expect(routerSpy).toHaveBeenCalledWith(['/home']);
    });

    it('should load test data', () => {
      // Assemble
      const testDataSpy: jasmine.Spy = spyOn(
        TestBed.inject(TestDataService),
        'loadTestDataToLocal'
      );

      // Act
      component.ngOnInit();

      // Assert
      expect(testDataSpy).toHaveBeenCalled();
    });
  });
});
