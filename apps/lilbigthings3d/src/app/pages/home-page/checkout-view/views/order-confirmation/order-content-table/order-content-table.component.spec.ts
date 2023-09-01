import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderContentTableComponent } from './order-content-table.component';

describe('OrderContentTableComponent', () => {
  let component: OrderContentTableComponent;
  let fixture: ComponentFixture<OrderContentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderContentTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderContentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
