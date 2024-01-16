import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarPage } from './pages/calendar/calendar.page';
import { ClientsPage } from './pages/clients/clients.page';
import { FinancesPage } from './pages/finances/finances.page';
import { HomePage } from './pages/home/home.page';
import { LandingPage } from './pages/landing/landing.page';
import { RegisterPage } from './pages/register/register.page';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { AuthGuardService } from './services/auth-gaurd/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
  },
  {
    path: 'signin',
    component: SignInPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    component: HomePage,
  },
  {
    path: 'calendar',
    canActivate: [AuthGuardService],
    component: CalendarPage,
  },
  {
    path: 'finances',
    canActivate: [AuthGuardService],
    component: FinancesPage,
  },
  {
    path: 'clients',
    canActivate: [AuthGuardService],
    component: ClientsPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
