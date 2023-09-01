// Gen Library imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material Library imports
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

// Required for Firebase
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { AngularFirestore } from '@angular/fire/firestore';

// Component imports
import { AppComponent } from './app.component';
import { TopNavBarComponent } from './page-components/top-nav-bar/top-nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { SideNavComponent } from './page-components/side-nav/side-nav.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SidePanelMenuComponent } from './page-components/side-panel-menu/side-panel-menu.component';
import { DataPullComponent } from './pages/data-pull/data-pull.component';
import { DataImportComponent } from './pages/data-import/data-import.component';
import { SportsDataComponent } from './pages/sports-data/sports-data.component';
import { WorkspaceComponent } from './page-components/workspace/workspace.component';
import { WorkspaceNavComponent } from './page-components/workspace-nav/workspace-nav.component';
import { DataAnalyticsComponent } from './pages/data-analytics/data-analytics.component';
import { SelectorTableComponent } from './pages/data-import/selector-table/selector-table.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavBarComponent,
    SideNavComponent,
    HomePageComponent,
    SidePanelMenuComponent,
    DataPullComponent,
    DataImportComponent,
    SportsDataComponent,
    WorkspaceComponent,
    WorkspaceNavComponent,
    DataAnalyticsComponent,
    SelectorTableComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatSidenavModule,
    MatExpansionModule,
    MatButtonToggleModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
