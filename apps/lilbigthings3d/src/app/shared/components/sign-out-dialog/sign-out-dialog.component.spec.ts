import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignOutDialogComponent } from './sign-out-dialog.component';

describe('DeleteAddressDialogComponent', () => {
  let component: SignOutDialogComponent;
  let fixture: ComponentFixture<SignOutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignOutDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignOutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
