import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPage } from './pages/landing-page/landing.page';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { LoginPage } from './pages/login/login.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { TextInputComponent } from './widgets/text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormHeaderComponent } from './widgets/form-header/form-header.component';
import { ButtonComponent } from './widgets/button/button.component';
import { DynamicFormComponent } from './shared/dynamic-form/dynamic-form.component';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { environment } from '../enviroments/enviroments';

@NgModule({
  declarations: [
    AppComponent,
    LandingPage,
    LoginPage,
    LoginFormComponent,
    TextInputComponent,
    FormHeaderComponent,
    ButtonComponent,
    DynamicFormComponent,
    DashboardPage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
