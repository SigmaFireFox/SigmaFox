import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TwoStateIconButton } from './two-state-icon.button';

describe('ModalsComponent', () => {
  let component: TwoStateIconButton;
  let fixture: ComponentFixture<TwoStateIconButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoStateIconButton],
    }).compileComponents();

    fixture = TestBed.createComponent(TwoStateIconButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
