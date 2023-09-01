import { Component } from '@angular/core';
import { InvoicingService } from './services/invoicing.service';
import { UserProfileService } from './services/user-profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private userProfileService: UserProfileService) {}
  title = 'mydaygoal';
}
