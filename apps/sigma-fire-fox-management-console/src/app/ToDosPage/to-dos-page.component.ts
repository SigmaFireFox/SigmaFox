/* eslint-disable @angular-eslint/component-class-suffix */
import { Component } from '@angular/core';
import {
  CdkDragDrop,
  // CdkDrag,
  // CdkDropList,
  // CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'sigmafox-to-dos-page',
  templateUrl: './to-dos-page.component.html',
  styleUrls: ['./to-dos-page.component.scss'],
})
export class ToDosPage {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
