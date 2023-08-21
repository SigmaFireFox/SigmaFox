import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPage } from './pages/main/main.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ComponentsPage } from './pages/products/presentationals/components/components.screen';
import { QuotesPage } from './pages/quotes/quotes.page';
import { MenuComponent } from './components/menu/menu.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ExpansionTableComponent } from './components/expansion-table/expansion-table.component';
import { ListComponent } from './components/list/list.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProductsPage } from './pages/products/products.page';
import { LeadsPage } from './pages/leads/leads.page';
import { ProductSelectScreen } from './pages/quotes/presentationals/product-select/product-select.screen';
import { ProductMeasurementsScreen } from './pages/quotes/presentationals/product-measurements/product-measurements.screen';
import { QuoteParametersScreen } from './pages/quotes/presentationals/quote-parameters/quote-parameters.screen';
import { QuoteResultsScreen } from './pages/quotes/presentationals/quote-results/quote-results.screen';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { HttpClientModule } from '@angular/common/http';
import { AgentsPage } from './pages/agents/agents.page';
import { SignInScreen } from './pages/sign-in/presentationals/sign-in/sign-in.screen';
import { RegisterFlow } from './pages/sign-in/presentationals/register/register.flow';
import { LeadFormScreen } from './pages/leads/presentationals/lead-form/lead-form.screen';
import { LeadMenuScreen } from './pages/leads/presentationals/lead-menu/lead-menu.screen';
import { ViewLeadsScreen } from './pages/leads/presentationals/view-leads/view-leads.screen';
import { WarningsModal } from './modals/warning/warning.modal';
import { ForgotPasswordScreen } from './pages/sign-in/presentationals/forgot-password/forgot-password.screen';
import { NotificationsModal } from './modals/notifications/notifications.modal';
import { MatIconModule } from '@angular/material/icon';
import { ViewLeadDetailScreen } from './pages/leads/presentationals/view-lead-detail/view-lead-detail.screen';
import { BasicDetailsComponent } from './pages/sign-in/presentationals/register/presentationals/basic-details/basic-details.screen';
import { BusinessDetailsScreen } from './pages/sign-in/presentationals/register/presentationals/business-details/business-details.screen';
import { ContactDetailsScreen } from './pages/sign-in/presentationals/register/presentationals/contact-details/contact-details.screen';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AgentFormScreen } from './pages/agents/presentationals/agent-form/agent-form.screen';
import { ViewAgentDetailScreen } from './pages/agents/presentationals/view-agent-detail/view-agent-detail.screen';
import { ViewAgentsScreen } from './pages/agents/presentationals/view-agents/view-agents.screen';
import { DetailPresentationComponent } from './components/detail-presentation/detail-presentation.component';
import { SettingsPage } from './pages/settings/settings.page';
import { SettingsMenuScreen } from './pages/settings/presentationals/settings-menu/settings-menu.screen';
import { ViewProfileScreen } from './pages/settings/presentationals/view-profile/view-profile.screen';
import { PasswordsMenuScreen } from './pages/settings/presentationals/passwords-menu/passwords-menu.screen';
import { PersonalPasswordScreen } from './pages/settings/presentationals/passwords-menu/presentationals/personal-password/personal-password.screen';
import { AgentPasswordScreen } from './pages/settings/presentationals/passwords-menu/presentationals/agent-password/agent-password.screen';
import { FeatureFlagsScreen } from './pages/settings/presentationals/feature-flags/feature-flags.screen';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavbarComponent } from './components/navbar/navbar.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyBFMwDB68eP6eixiHx5k6HxbnCnWf1HVQg',
  authDomain: 'assembl-ez.firebaseapp.com',
  projectId: 'assembl-ez',
  storageBucket: 'assembl-ez.appspot.com',
  messagingSenderId: '784618520751',
  appId: '1:784618520751:web:db23f981d1a70b867f145a',
  measurementId: 'G-51G0C91VTB',
};

@NgModule({
  declarations: [
    AppComponent,
    MainPage,
    ComponentsPage,
    QuotesPage,
    MenuComponent,
    PageHeaderComponent,
    FormComponent,
    ExpansionTableComponent,
    ListComponent,
    ProductsPage,
    LeadsPage,
    ProductSelectScreen,
    ProductMeasurementsScreen,
    QuoteParametersScreen,
    QuoteResultsScreen,
    SignInPage,
    AgentsPage,
    SignInScreen,
    RegisterFlow,
    LeadFormScreen,
    LeadMenuScreen,
    ViewLeadsScreen,
    WarningsModal,
    ForgotPasswordScreen,
    NotificationsModal,
    ViewLeadDetailScreen,
    BasicDetailsComponent,
    BusinessDetailsScreen,
    ContactDetailsScreen,
    LoadingSpinnerComponent,
    AgentFormScreen,
    ViewAgentDetailScreen,
    ViewAgentsScreen,
    DetailPresentationComponent,
    SettingsPage,
    SettingsMenuScreen,
    ViewProfileScreen,
    PasswordsMenuScreen,
    PersonalPasswordScreen,
    AgentPasswordScreen,
    PersonalPasswordScreen,
    FeatureFlagsScreen,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    HttpClientModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
