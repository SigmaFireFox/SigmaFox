import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppInitialisationService } from './services/app-initialisation.service';
import { AuthenticationService } from './services/authentication.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'independent-karting-league';
  isLoading = false;
  loadingExplainer = '';

  constructor(
    private authService: AuthenticationService,
    private loadingService: LoadingService,
    private appInitialisationService: AppInitialisationService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.intialiseSubscriptions();
    this.loadingService.setLoading('Calling Profile');
    if (await this.authService.isAuthenticated()) {
      this.appInitialisationService.intialise();
    }
    this.loadingService.cancelLoading();
  }

  onTitleClick() {
    this.router.navigate(['']);
  }

  private intialiseSubscriptions() {
    // Loading service
    this.loadingService._isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.loadingService._loadingexplainer$.subscribe((loadingexplainer) => {
      this.loadingExplainer = loadingexplainer;
    });
  }
}
