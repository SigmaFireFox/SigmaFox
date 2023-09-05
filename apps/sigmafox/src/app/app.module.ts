// Angular primary inports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

// Angualar material imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

// Components - Pages
import { HomePage } from './pages/home/home.page';
import { ProjectsPage } from './pages/projects/projects.page';
import { AboutUsPage } from './pages/about-us/about-us.page';
import { ContactUsPage } from './pages/contact-us/contact-us.page';

// Components - Screens
import { PlainTextScreen } from './screens/plain-text/plain-text.screen';
import { CarouselScreen } from './screens/carousel/carousel.screen';

// Components - Components
import { CarouselComponent } from './components/carousel/carousel.component';
import { FormScreen } from './screens/form/form.screen';
import { FormComponent } from './components/form/form.component';
import { FormValidationWarningModal } from './modals/form-validation-warning/form-validation-warning.modal';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    ProjectsPage,
    CarouselComponent,
    AboutUsPage,
    ContactUsPage,
    PlainTextScreen,
    CarouselScreen,
    FormScreen,
    FormComponent,
    FormValidationWarningModal,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
