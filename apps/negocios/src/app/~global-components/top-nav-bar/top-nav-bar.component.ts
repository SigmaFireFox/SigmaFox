import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss'],
})
export class TopNavBarComponent implements OnInit {
  title = 'negocio';
  userName: string | undefined;

  constructor(private router: Router, private auth: AuthService) {}

  async ngOnInit() {
    this.auth.$_isLoggedIn.subscribe(async (isLoggedIn) => {
      if (isLoggedIn) {
        const user = await this.auth.getUserProfile();
        this.userName = user.firstName;
      }
    });
  }

  onProfileClick() {
    this.auth.isLoggedIn
      ? this.router.navigateByUrl('/dashboard')
      : this.router.navigateByUrl('/sign-in');
  }

  onLogoClick() {
    this.router.navigateByUrl('/');
  }
}
