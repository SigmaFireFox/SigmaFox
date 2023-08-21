import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentFormScreen } from './agent-form.screen';

describe('NewAgentScreen', () => {
  let component: AgentFormScreen;
  let fixture: ComponentFixture<AgentFormScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentFormScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentFormScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
