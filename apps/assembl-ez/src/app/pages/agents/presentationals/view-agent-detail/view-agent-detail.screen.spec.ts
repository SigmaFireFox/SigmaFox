import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgentDetailScreen } from './view-agent-detail.screen';

describe('ViewAgentDetailScreen', () => {
  let component: ViewAgentDetailScreen;
  let fixture: ComponentFixture<ViewAgentDetailScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAgentDetailScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAgentDetailScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
