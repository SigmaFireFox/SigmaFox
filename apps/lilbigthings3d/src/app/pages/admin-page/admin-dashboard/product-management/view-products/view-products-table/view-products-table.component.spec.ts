import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductsTableComponent } from './view-products-table.component';

describe('ViewProductsTableComponent', () => {
  let component: ViewProductsTableComponent;
  let fixture: ComponentFixture<ViewProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
