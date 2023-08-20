import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFlow } from './register.flow';

describe('RegisterComponent', () => {
  let component: RegisterFlow;
  let fixture: ComponentFixture<RegisterFlow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterFlow],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFlow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
