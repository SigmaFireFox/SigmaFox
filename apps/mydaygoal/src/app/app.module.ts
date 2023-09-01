// Standard Angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// App pages
import { LandingPage } from './pages/landing/landing.page';
import { UserGoalsPage } from './pages/user-goals/user-goals.page';

// App components
import { NavbarComponent } from './components/navbar/navbar.component';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Angular Firestore modules
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// Other external libraries
import { AdsenseModule } from 'ng2-adsense';
import { SigninComponent } from './components/signin/signin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserNotificationComponent } from './components/user-notification/user-notification.component';
import { UserProfilePage } from './pages/user-profile/user-profile.page';
import { MenuComponent } from './components/navbar/menu/menu.component';
import { UserProfileUpdateComponent } from './components/user-profile-update/user-profile-update.component';
import { UpgradePlanComponent } from './components/upgrade-plan/upgrade-plan.component';
import { NewGoalSuggestionComponent } from './components/new-goal-suggestion/new-goal-suggestion.component';
import { PendingChangesGuard } from './pending-changes-guard.guard';
import { PaymentResultPage } from './pages/payment-result/payment-result.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPage,
    NavbarComponent,
    SigninComponent,
    UserNotificationComponent,
    UserGoalsPage,
    UserProfilePage,
    MenuComponent,
    UserProfileUpdateComponent,
    UpgradePlanComponent,
    NewGoalSuggestionComponent,
    PaymentResultPage,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-8827034772780693',
      adSlot: 4471556412,
    }),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
  ],
  providers: [PendingChangesGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
