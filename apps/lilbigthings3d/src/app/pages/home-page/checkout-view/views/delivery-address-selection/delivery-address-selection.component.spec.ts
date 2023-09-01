import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAddressSelectionComponent } from './delivery-address-selection.component';

describe('DeliveryAddressSelectionComponent', () => {
  let component: DeliveryAddressSelectionComponent;
  let fixture: ComponentFixture<DeliveryAddressSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryAddressSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryAddressSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
