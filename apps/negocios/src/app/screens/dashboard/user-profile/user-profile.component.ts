import { Component } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service';
import { AppUser } from 'app/services/authentication/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  user: AppUser | undefined;
  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.user = (await this.authService.getUserProfile()) as AppUser;
  }
}
