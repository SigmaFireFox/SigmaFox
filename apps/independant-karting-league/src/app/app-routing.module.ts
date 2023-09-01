import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuPage } from './pages/main-menu/main-menu.page';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', canActivate: [AuthGuardService], component: MainMenuPage },
  { path: 'sign-in', component: SignInPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
