import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInScreen } from './sign-in.screen';

describe('SignInComponent', () => {
  let component: SignInScreen;
  let fixture: ComponentFixture<SignInScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
