import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { BrowseComponent } from './components/browse/browse.component';

const routes: Routes = [
  {path: 'browse', component: BrowseComponent},
  {path: 'about', component: AboutComponent},
  {path: '', pathMatch: 'full', redirectTo: 'browse'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
