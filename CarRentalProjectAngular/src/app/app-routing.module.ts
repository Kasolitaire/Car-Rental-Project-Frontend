import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AdminComponent } from './components/admin/admin.component';
import { BrowseComponent } from './components/browse/browse.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { RegisterComponent } from './components/register/register.component';
import { UserOrderComponent } from './components/user-order/user-order.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { EmployeeGuard } from './guards/employee.guard';

const children: Routes = [
  
]
const routes: Routes = [
  {path: 'browse', component: BrowseComponent},
  {path: 'about', component: AboutComponent}, //This should be put in order
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: children},
  {path: 'order', component: OrderComponent},
  {path: 'userOrders', component: UserOrderComponent, canActivate: [AuthGuard]},
  {path: 'employee', component: EmployeeComponent, canActivate: [EmployeeGuard]},
  {path: '', pathMatch: 'full', redirectTo: 'browse'} // default path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
