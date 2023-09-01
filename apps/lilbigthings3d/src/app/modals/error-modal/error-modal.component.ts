import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ErrorHandlingService,
  ErrorState,
} from 'src/app/services/error-handling/error-handling.service';

export interface ErrorModalContent {
  title: string;
  subtitle?: string;
  message: string;
  options: ErrorOption[];
}

export interface ErrorOption {
  description: string;
  action: OptionAction;
}

export interface OptionAction {
  type: OptionActionType;
  followUpError?: ErrorState;
  newRoute?: string;
}

export enum OptionActionType {
  Close,
  EmitError,
  Navigate,
}

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
})
export class ErrorModalComponent implements OnInit {
  isDisplaying = false;
  currentError: ErrorModalContent | undefined;
  constructor(
    private readonly errorService: ErrorHandlingService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.errorService.errorModalContent.subscribe((content) => {
      this.currentError = content;
      this.isDisplaying = Object.keys(this.currentError).length > 0;
    });
  }

  onButtonClicked(action: OptionAction): void {
    switch (action.type) {
      case OptionActionType.Close:
        this.isDisplaying = false;
        break;
      case OptionActionType.EmitError:
        this.isDisplaying = false;
        this.errorService.handleDefinedError(
          ErrorState.RegistrationAsUserRequiredFirst
        );
        break;
      case OptionActionType.Navigate:
        this.isDisplaying = false;
        action.newRoute
          ? this.router.navigateByUrl(action.newRoute)
          : this.router.navigateByUrl('');
    }
  }
}
