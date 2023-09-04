import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { UserProfileComponent } from './screens/dashboard/user-profile/user-profile.component';
import { SignInComponent } from './screens/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './screens/authentication/sign-up/sign-up.component';
import { ResetPasswordScreen } from './screens/authentication/reset-password/reset-password.screen';
import { VerifyEmailComponent } from './screens/authentication/verify-email/verify-email.component';
import { AuthService } from './services/authentication/auth.service';
import { HomePage } from './pages/home/home.page';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInPage as SignInPage } from './pages/sign-in-page/sign-in.page';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { ValuationsListComponent } from './screens/dashboard/valuations-list/valuations-list.component';
import { NewValuationNameFloatComponent } from './screens/dashboard/new-valuation-name-float/new-valuation-name-float.component';
import { ValuationsPage } from './pages/valuations/valuations.page';
import { BasicDetailsViewScreen } from './screens/valuations/basic-details/basic-details-view/basic-details-view.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BasicDetailsFormComponent } from './screens/valuations/basic-details/basic-details-form/basic-details-form.component';
import { BasicDetailsComponent } from './screens/valuations/basic-details/basic-details.component';
import { FinancialHistoryComponent } from './screens/valuations/financial-history/financial-history.component';
import { FinancialHistoryViewComponent } from './screens/valuations/financial-history/financial-history-view/financial-history-view.component';
import { FinancialHistoryFormComponent } from './screens/valuations/financial-history/financial-history-form/financial-history-form.component';
import { KeysPipe } from './screens/valuations/financial-history/financial-history-form/financial-history-form.component';
import { UserNotificationsComponent } from './~global-components/user-notifications/user-notifications.component';
import { SidebarComponent } from './~global-components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EstimatesPage } from './pages/estimates/estimates.page';
import { EstimatesIntroductionScreen } from './screens/estimates/estimates-introduction/estimates-introduction.screen';
import { EstimatesLegalScreen } from './screens/estimates/estimates-legal/estimates-legal.screen';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EstimatesBasicsScreen } from './screens/estimates/estimates-basics/estimates-basics.screen';
import { EstimatesFinancialHistoryScreen } from './screens/estimates/estimates-financial-history/estimates-financial-history.screen';
import { TwoDigitDecimaNumberDirective } from './~global-directives/two-digit-decima-number-directive.directive';
import { MatExpansionModule } from '@angular/material/expansion';
import { EstimatesOpeningBalancesScreen } from './screens/estimates/estimates-opening-balances/estimates-opening-balances.screen';
import { EstimatesOpeningBalancesForm } from './forms/estimates-opening-balances/estimates-opening-balances.form';
import { TopNavBarComponent } from './~global-components/top-nav-bar/top-nav-bar.component';
import { EstimatesConfirmationScreen } from './screens/estimates/estimates-confirmation/estimates-confirmation.screen';
import { EstimatesResultsScreen } from './screens/estimates/estimates-results/estimates-results.screen';
import { EstimatesFinancialHistoryForm } from './forms/estimates-financial-history/estimates-financial-history.form';
import { GoogleChartsModule } from 'angular-google-charts';
import { FrequencyChart } from './charts/frequency/frequency.chart';
import { EstimatesResultsForecastsScreenSection } from './screens/estimates/estimates-results/estimates-results-forecasts/estimates-results-forecasts.screensection';
import { EstimateResultsComparativesScreenSection } from './screens/estimates/estimates-results/estimate-results-comparatives/estimate-results-comparatives.screensection';
import { EstimateResultsSummaryComponent } from './screens/estimates/estimates-results/estimate-results-summary/estimate-results-summary.component';
import { HttpClientModule } from '@angular/common/http';
import { ScatterChart } from './charts/scatter/scatter.chart';
import { EstimateResultsRegressionComponent } from './screens/estimates/estimates-results/estimate-results-regression/estimate-results-regression.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    SignInComponent,
    SignUpComponent,
    ResetPasswordScreen,
    VerifyEmailComponent,
    HomePage,
    SignInPage,
    DashboardPage,
    ValuationsListComponent,
    NewValuationNameFloatComponent,
    ValuationsPage,
    BasicDetailsViewScreen,
    BasicDetailsFormComponent,
    BasicDetailsComponent,
    FinancialHistoryComponent,
    FinancialHistoryViewComponent,
    FinancialHistoryFormComponent,
    KeysPipe,
    UserNotificationsComponent,
    SidebarComponent,
    EstimatesPage,
    EstimatesIntroductionScreen,
    EstimatesLegalScreen,
    EstimatesBasicsScreen,
    EstimatesFinancialHistoryScreen,
    TwoDigitDecimaNumberDirective,
    EstimatesOpeningBalancesScreen,
    EstimatesOpeningBalancesForm,
    TopNavBarComponent,
    EstimatesConfirmationScreen,
    EstimatesResultsScreen,
    EstimatesFinancialHistoryForm,
    FrequencyChart,
    EstimatesResultsForecastsScreenSection,
    EstimateResultsComparativesScreenSection,
    EstimateResultsSummaryComponent,
    ScatterChart,
    EstimateResultsRegressionComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatExpansionModule,
    GoogleChartsModule,
    HttpClientModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
