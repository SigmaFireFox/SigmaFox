// Library imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components imports
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DataImportComponent } from './pages/data-import/data-import.component';
import { DataPullComponent } from './pages/data-pull/data-pull.component';
import { SportsDataComponent } from './pages/sports-data/sports-data.component';
import { DataAnalyticsComponent } from './pages/data-analytics/data-analytics.component';


const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'data-manager/data-importer', component: DataImportComponent },
  { path: 'data-manager/data-puller', component: DataPullComponent },
  { path: 'data-manager/data-analyser', component: DataAnalyticsComponent },
  { path: 'sports-data/:sport', component: SportsDataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
