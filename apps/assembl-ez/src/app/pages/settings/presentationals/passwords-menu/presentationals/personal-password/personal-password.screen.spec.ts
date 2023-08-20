import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalPasswordScreen } from './personal-password.screen';

describe('ChangePersonalPasswordComponent', () => {
  let component: PersonalPasswordScreen;
  let fixture: ComponentFixture<PersonalPasswordScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalPasswordScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalPasswordScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
