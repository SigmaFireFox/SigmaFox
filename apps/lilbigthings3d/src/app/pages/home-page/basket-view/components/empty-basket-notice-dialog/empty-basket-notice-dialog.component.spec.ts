import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyBasketNoticeDialogComponent } from './empty-basket-notice-dialog.component';

describe('EmptyBasketNoticeDialogComponent', () => {
  let component: EmptyBasketNoticeDialogComponent;
  let fixture: ComponentFixture<EmptyBasketNoticeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyBasketNoticeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyBasketNoticeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
