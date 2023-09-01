import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { EstimatesComponent } from './pages/estimates/estimates.component';
import { CommingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { ValuationsDesktopComponent } from './pages/valuations-desktop/valuations-desktop.component';
import { ValuationsFullComponent } from './pages/valuations-full/valuations-full.component';
import { ValuationsDeltaComponent } from './pages/valuations-delta/valuations-delta.component';
import { TestComponent } from './pages/test/test.component';
import { SidedrawComponent } from './page-components/sidedraw/sidedraw.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EstimatesworkspaceComponent } from './workspaces/estimatesworkspace/estimatesworkspace.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EstimatesComponent,
    CommingSoonComponent,
    ValuationsDesktopComponent,
    ValuationsFullComponent,
    ValuationsDeltaComponent,
    TestComponent,
    SidedrawComponent,
    EstimatesworkspaceComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
