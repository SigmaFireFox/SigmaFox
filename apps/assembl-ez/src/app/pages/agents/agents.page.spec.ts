import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsPage } from './agents.page';

describe('AgentsComponent', () => {
  let component: AgentsPage;
  let fixture: ComponentFixture<AgentsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentsPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
