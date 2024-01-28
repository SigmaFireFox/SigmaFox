import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  async canActivate(): Promise<
    Observable<boolean> | Promise<boolean> | boolean
  > {
    return await this.authService.isAuthenticated();
  }
}
