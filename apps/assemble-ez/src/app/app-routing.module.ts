import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentsPage } from './pages/agents/agents.page';
import { LeadsPage } from './pages/leads/leads.page';
import { MainPage } from './pages/main/main.page';
import { ComponentsPage } from './pages/products/presentationals/components/components.screen';
import { ProductsPage } from './pages/products/products.page';
import { QuotesPage } from './pages/quotes/quotes.page';
import { SettingsPage } from './pages/settings/settings.page';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'sign-in', component: SignInPage },
  { path: '', canActivate: [AuthGuardService], component: MainPage },
  { path: 'leads', canActivate: [AuthGuardService], component: LeadsPage },
  { path: 'quotes', canActivate: [AuthGuardService], component: QuotesPage },
  {
    path: 'products',
    canActivate: [AuthGuardService],
    component: ProductsPage,
  },
  {
    path: 'agents',
    canActivate: [AuthGuardService],
    component: AgentsPage,
  },
  {
    path: 'settings',
    canActivate: [AuthGuardService],
    component: SettingsPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
