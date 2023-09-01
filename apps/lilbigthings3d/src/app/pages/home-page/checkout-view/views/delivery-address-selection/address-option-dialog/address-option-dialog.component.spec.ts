import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressOptionDialogComponent } from './address-option-dialog.component';

describe('AddressOptionDialogComponent', () => {
  let component: AddressOptionDialogComponent;
  let fixture: ComponentFixture<AddressOptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressOptionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressOptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
