import { Component, HostListener } from '@angular/core';
import { AuthenticationService } from './services/authentication-service.service';
import { LoadingService } from './services/loading.service';
import { AppInitialisationService } from './services/app-initialisation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'assembl-ez';
  isLoading = false;
  loadingExplainer = '';

  constructor(
    private authService: AuthenticationService,
    private loadingService: LoadingService,
    private appInitialisationService: AppInitialisationService
  ) {}

  async ngOnInit() {
    this.intialiseSubscriptions();
    this.loadingService.setLoading('Calling Profile');
    if (await this.authService.isAuthenticated()) {
      this.appInitialisationService.intialise();
    }
    this.loadingService.cancelLoading();
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
