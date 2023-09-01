import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOptionDialogComponent } from './order-option-dialog.component';

describe('AddressOptionDialogComponent', () => {
  let component: OrderOptionDialogComponent;
  let fixture: ComponentFixture<OrderOptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderOptionDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderOptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
