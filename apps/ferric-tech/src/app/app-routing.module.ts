import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsPage } from './pages/about-us/about-us.page';
import { ContactUsPage } from './pages/contact-us/contact-us.page';
import { HomePage } from './pages/home/home.page';
import { ProjectsPage } from './pages/projects/projects.page';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'projects', component: ProjectsPage },
  { path: 'about', component: AboutUsPage },
  { path: 'contact', component: ContactUsPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
