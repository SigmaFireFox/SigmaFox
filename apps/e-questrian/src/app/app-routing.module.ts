import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutePaths } from './models/routing.enum';
import { CalendarPage } from './pages/calendar/calendar.page';
import { ClientsPage } from './pages/clients/clients.page';
import { FinancesPage } from './pages/finances/finances.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { LandingPage } from './pages/landing/landing.page';
import { RegisterPage } from './pages/register/register.page';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { AuthGuardService } from './services/auth-gaurd/auth-guard.service';

export const routes: Routes = [
  {
    path: AppRoutePaths.LandingPage,
    component: LandingPage,
  },
  {
    path: AppRoutePaths.SignIn,
    component: SignInPage,
  },
  {
    path: AppRoutePaths.Register,
    component: RegisterPage,
  },
  {
    path: AppRoutePaths.Dashboard,
    canActivate: [AuthGuardService],
    component: DashboardPage,
  },
  {
    path: AppRoutePaths.Calendar,
    canActivate: [AuthGuardService],
    component: CalendarPage,
  },
  {
    path: AppRoutePaths.Finances,
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./pages/finances/finances.module').then(
        (m) => m.FinancePageModule
      ),
  },
  {
    path: AppRoutePaths.Clients,
    canActivate: [AuthGuardService],
    component: ClientsPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
