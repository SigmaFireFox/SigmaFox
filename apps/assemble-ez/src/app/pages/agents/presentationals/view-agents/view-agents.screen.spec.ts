import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgentsScreen } from './view-agents.screen';

describe('ViewAgentsComponent', () => {
  let component: ViewAgentsScreen;
  let fixture: ComponentFixture<ViewAgentsScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAgentsScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAgentsScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
