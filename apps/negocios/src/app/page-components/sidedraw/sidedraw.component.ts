/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { EstimatesworkspaceComponent } from '../../workspaces/estimatesworkspace/estimatesworkspace.component';

@Component({
  selector: 'app-sidedraw',
  templateUrl: './sidedraw.component.html',
  styleUrls: ['./sidedraw.component.css'],
})
export class SidedrawComponent {
  isShown = true;
  workspaceComponent = EstimatesworkspaceComponent;
}
