import { Route } from '@angular/router';
import { AppRoutePaths } from './models/routing.enum';
import { LandingPage } from './pages/landing/landing-page.component';

export const appRoutes: Route[] = [
  {
    path: AppRoutePaths.LandingPage,
    component: LandingPage,
  },
];
