import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { LandingPage } from './landing/landing-page.component';
import { StandardButton } from '@sigmafox/buttons';
import { ToDosPage } from './ToDosPage/to-dos-page.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [AppComponent, LandingPage, ToDosPage],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    StandardButton,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
