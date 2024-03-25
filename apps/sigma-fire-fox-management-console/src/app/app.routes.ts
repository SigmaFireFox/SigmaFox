import { Route } from '@angular/router';
import { AppRoutePaths } from './models/routing.enum';
import { LandingPage } from './landing/landing-page.component';
import { ToDosPage } from './ToDosPage/to-dos-page.component';

export const appRoutes: Route[] = [
  {
    path: AppRoutePaths.LandingPage,
    component: LandingPage,
  },
  {
    path: AppRoutePaths.Todos,
    component: ToDosPage,
  },
];
