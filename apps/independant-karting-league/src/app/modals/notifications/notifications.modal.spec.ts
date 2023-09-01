import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsModal } from './notifications.modal';

describe('NotificationsModal', () => {
  let component: NotificationsModal;
  let fixture: ComponentFixture<NotificationsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationsModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
