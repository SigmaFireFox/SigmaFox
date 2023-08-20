import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPasswordScreen } from './agent-password.screen';

describe('AgentDefaultPasswordComponent', () => {
  let component: AgentPasswordScreen;
  let fixture: ComponentFixture<AgentPasswordScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentPasswordScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentPasswordScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
