import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Button, ButtonAction } from '../interfaces/widgets.interface';

@Injectable({
  providedIn: 'root',
})
export class WidgetCallBacksService {
  private formSubmit = new BehaviorSubject<boolean>(false);
  formSubmitted = this.formSubmit.asObservable();

  private closeClicked = new BehaviorSubject<boolean>(false);
  _closeClicked = this.closeClicked.asObservable();

  constructor(private router: Router) {}

  actionButton(button: Button) {
    switch (button.action) {
      case ButtonAction.NAVIGATE: {
        button.internalUrl
          ? this.router.navigate([button.url])
          : window.open(button.url, '_blank');
        return;
      }
      case ButtonAction.SUMBIT: {
        this.formSubmit.next(true);
        return;
      }
      case ButtonAction.CLOSE: {
        this.closeClicked.next(true);
        return;
      }
    }
  }
}
