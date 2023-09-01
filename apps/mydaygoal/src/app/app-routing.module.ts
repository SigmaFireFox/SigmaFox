import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './pages/landing/landing.page';
import { PaymentResultPage } from './pages/payment-result/payment-result.component';
import { UserGoalsPage } from './pages/user-goals/user-goals.page';
import { UserProfilePage } from './pages/user-profile/user-profile.page';
import { PendingChangesGuard } from './pending-changes-guard.guard';

const routes: Routes = [
  { path: '', component: LandingPage },
  {
    path: 'user-goals',
    component: UserGoalsPage,
    canDeactivate: [PendingChangesGuard],
  },
  { path: 'user-profile', component: UserProfilePage },
  { path: 'payment-result', component: PaymentResultPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
