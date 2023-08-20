import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSelectScreen } from './product-select.screen';

describe('ProductSelectComponent', () => {
  let component: ProductSelectScreen;
  let fixture: ComponentFixture<ProductSelectScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductSelectScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSelectScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
