import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGoalSuggestionComponent } from './new-goal-suggestion.component';

describe('NewGoalSuggestionComponent', () => {
  let component: NewGoalSuggestionComponent;
  let fixture: ComponentFixture<NewGoalSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGoalSuggestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGoalSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
