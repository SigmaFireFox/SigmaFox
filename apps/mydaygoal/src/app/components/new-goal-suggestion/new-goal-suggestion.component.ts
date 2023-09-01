/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GoalsService } from '../../services/goals.service';

@Component({
  selector: 'app-new-goal-suggestion',
  templateUrl: './new-goal-suggestion.component.html',
  styleUrls: ['./new-goal-suggestion.component.scss'],
})
export class NewGoalSuggestionComponent {
  @Output() newGoalSuggestionClosed = new EventEmitter<void>();

  suggestionForm: FormGroup = new FormGroup({
    newGoal: new FormControl('', [Validators.required]),
  });

  userMessage = '';
  displayUserMessage = false;

  constructor(private goalService: GoalsService) {}

  onSumitAndNewClick() {
    this.addGoal();
    this.suggestionForm.get('newGoal')?.reset();
  }

  onSumitAndCloseClick() {
    this.addGoal();
    this.newGoalSuggestionClosed.emit();
  }

  onCancelClicked() {
    this.newGoalSuggestionClosed.emit();
  }

  private addGoal() {
    if (this.findInvalidControls().length > 0) {
      this.userMessage =
        'You need to complete the suggestion before you can submit it';
      this.displayUserMessage = true;
    } else {
      this.goalService.addNewGoal(this.suggestionForm.get('newGoal')?.value);
    }
  }

  private findInvalidControls(): string[] {
    const invalid = [];
    const controls = this.suggestionForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
}
