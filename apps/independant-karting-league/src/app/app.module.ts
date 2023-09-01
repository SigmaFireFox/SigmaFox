import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainMenuPage } from './pages/main-menu/main-menu.page';
import { MatIconModule } from '@angular/material/icon';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { SignInScreen } from './pages/sign-in/presentationals/sign-in/sign-in.screen';
import { RegisterScreen } from './pages/sign-in/presentationals/register/register.screen';
import { ForgotPasswordScreen } from './pages/sign-in/presentationals/forgot-password/forgot-password.screen';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NotificationsModal } from './modals/notifications/notifications.modal';
import { WarningsModal } from './modals/warnings/warnings.modal';

export const firebaseConfig = {
  apiKey: 'AIzaSyCooL1IsNUtNqlXgLaB1rk8NLJeaIWalDs',
  authDomain: 'independent-karting-league.firebaseapp.com',
  projectId: 'independent-karting-league',
  storageBucket: 'independent-karting-league.appspot.com',
  messagingSenderId: '960304197994',
  appId: '1:960304197994:web:383ba206597dc8a369b513',
  measurementId: 'G-SNMPB97D44',
};
@NgModule({
  declarations: [
    AppComponent,
    SignInPage,
    SignInScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    MainMenuPage,
    PageHeaderComponent,
    MenuComponent,
    PageHeaderComponent,
    FormComponent,
    LoadingSpinnerComponent,
    NotificationsModal,
    WarningsModal,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
