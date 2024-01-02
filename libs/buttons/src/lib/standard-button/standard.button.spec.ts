import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StandardButton } from './standard.button';

describe('ModalsComponent', () => {
  let component: StandardButton;
  let fixture: ComponentFixture<StandardButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardButton],
    }).compileComponents();

    fixture = TestBed.createComponent(StandardButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
