import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMeasurementsScreen } from './product-measurements.screen';

describe('ProductMeasurementsComponent', () => {
  let component: ProductMeasurementsScreen;
  let fixture: ComponentFixture<ProductMeasurementsScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductMeasurementsScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMeasurementsScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
