import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterScreen } from './register.screen';

describe('RegisterComponent', () => {
  let component: RegisterScreen;
  let fixture: ComponentFixture<RegisterScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
