import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/authentication/auth.guard';
import { HomePage } from './pages/home/home.page';
import { SignInPage } from './pages/sign-in-page/sign-in.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { ValuationsPage } from './pages/valuations/valuations.page';
import { EstimatesPage } from './pages/estimates/estimates.page';

const routes: Routes = [
  { path: '', component: HomePage, pathMatch: 'full' },
  { path: 'sign-in', component: SignInPage },
  {
    path: 'dashboard',
    component: DashboardPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'valuations',
    component: ValuationsPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'estimates',
    component: EstimatesPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
