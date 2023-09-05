import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Ferric Tech';

  constructor(private router: Router) {}

  onLogoclick() {
    this.router.navigate(['']);
  }
}
