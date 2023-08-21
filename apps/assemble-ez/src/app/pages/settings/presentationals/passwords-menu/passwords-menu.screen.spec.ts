import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordsMenuScreen } from './passwords-menu.screen';

describe('PasswordsMenuComponent', () => {
  let component: PasswordsMenuScreen;
  let fixture: ComponentFixture<PasswordsMenuScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordsMenuScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordsMenuScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
