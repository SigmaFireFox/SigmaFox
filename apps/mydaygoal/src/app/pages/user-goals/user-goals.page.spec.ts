import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGoalsPage } from './user-goals.page';

describe('UserGoalsPage', () => {
  let component: UserGoalsPage;
  let fixture: ComponentFixture<UserGoalsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserGoalsPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGoalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
