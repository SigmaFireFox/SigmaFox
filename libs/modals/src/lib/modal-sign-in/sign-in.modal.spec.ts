import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInModal } from './sign-in.modal';

describe('ModalsComponent', () => {
  let component: SignInModal;
  let fixture: ComponentFixture<SignInModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInModal],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
