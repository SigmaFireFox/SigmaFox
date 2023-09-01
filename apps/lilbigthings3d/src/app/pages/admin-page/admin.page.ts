import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPageComponent implements OnInit {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    (await this.authService.userID)
      ? this.router.navigate(['admin/dashboard'])
      : this.router.navigate(['admin/login']);
  }
}
