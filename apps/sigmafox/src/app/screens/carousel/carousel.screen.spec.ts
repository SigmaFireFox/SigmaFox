import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselScreen } from './carousel.screen';

describe('CarouselScreen', () => {
  let component: CarouselScreen;
  let fixture: ComponentFixture<CarouselScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
