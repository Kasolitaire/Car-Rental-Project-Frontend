import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { BrowseComponent } from './components/browse/browse.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'browse', component: BrowseComponent},
  {path: 'about', component: AboutComponent, canActivate: [AuthGuard]}, //This should be replaced with a different component at some point
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', pathMatch: 'full', redirectTo: 'browse'} // the default path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
