import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { LandingPage } from './pages/landing/landing-page.component';
import { StandardButton } from '@sigmafox/buttons';
import { ToDosPage } from './pages/todos/to-dos-page.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, LandingPage, ToDosPage],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    StandardButton,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
