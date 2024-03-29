import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';

import { NavbarComponent } from './components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { CalendarPage } from './pages/calendar/calendar.page';
import { ClientsPage } from './pages/clients/clients.page';
import { AppointmentModal } from './modals/appointment-details/appointment-detail.modal';
import { PaymentsModal } from './modals/payments/payments.modal';
import { MenuComponent } from './components/menu/menu.component';
import { FinancialDocListScreen } from './screens/financial-doc-list/financial-doc-list.screen';
import { FinancialDocViewScreen } from './screens/financial-doc-view/financial-doc-view.screen';
import { WarningsModal } from './modals/warnings/warnings.component';
import { GenerateInvoiceModal } from './modals/generate-invoice/generate-invoice.modal';
import { GenerateStatementModal } from './modals/generate-statement/generate-statement.modal';
import { ProcessResultsScreen } from './screens/process-results/process-results.screen';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { GeneralItemsListScreen } from './screens/general-items-list/general-items-list.screen';
import { GeneralScreenHeaderComponent } from './components/general-screen-header/general-screen-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import {
  ClientDetailsModal,
  ErrorModal,
  RegisterModal,
  SignInModal,
  SuccessModal,
} from '@sigmafox/modals';
import { LandingPage } from './pages/landing/landing.page';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StandardButton } from 'libs/components/buttons/src';
import { RegisterPage } from './pages/register/register.page';
import { EntryCallToActionSection } from './pages/landing/page-sections/entry-c2a-section/entry-c2a.section';
import { FeaturesSection } from './pages/landing/page-sections/features-section/features.section';
import { ClientTestimonialsSection } from './pages/landing/page-sections/client-testimonials-section/client-testimonials.section';
import { WhatsNewSection } from './pages/landing/page-sections/whats-new-section/whats-new.section';
import { LandingScreen } from '@sigmafox/screens';
import { WidgetAccordionContainer } from '@sigmafox/widgets';
import { FinancePageModule } from './pages/finances/finances.module';

@NgModule({
  declarations: [
    // Pages
    DashboardPage,
    CalendarPage,
    ClientsPage,
    LandingPage,
    SignInPage,
    RegisterPage,

    EntryCallToActionSection,
    FeaturesSection,
    ClientTestimonialsSection,
    WhatsNewSection,

    // Modals
    WarningsModal,
    AppointmentModal,

    // Components
    AppComponent,
    NavbarComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,

    StandardButton,
    LandingScreen,
    WidgetAccordionContainer,
    FinancePageModule,

    // Lib modals
    SignInModal,
    RegisterModal,
    ErrorModal,
    SuccessModal,
    ClientDetailsModal,
    GenerateInvoiceModal,
    PaymentsModal,
    GenerateStatementModal,

    // App interal standalone components
    MenuComponent,
    GeneralScreenHeaderComponent,
    FinancialDocListScreen,
    FinancialDocViewScreen,
    GeneralItemsListScreen,
    ProcessResultsScreen,
  ],
})
export class AppModule {}
