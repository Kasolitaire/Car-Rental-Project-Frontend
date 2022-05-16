import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ManageOrdersComponent } from './components/admin-components/manage-orders/manage-orders.component';
import { ManageUsersComponent } from './components/admin-components/manage-users/manage-users.component';
import { ManageVehicleInventoryComponent } from './components/admin-components/manage-vehicle-inventory/manage-vehicle-inventory.component';
import { ManageVehicleTypesComponent } from './components/admin-components/manage-vehicle-types/manage-vehicle-types.component';
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
import { LoggedInGuard } from './guards/logged-in.guard';
import { OrderGuard } from './guards/order.guard';

const children: Routes = [
  {path: 'manageUsers', component: ManageUsersComponent},
  {path: 'manageOrders', component: ManageOrdersComponent},
  {path: 'manageVehicleInventory', component: ManageVehicleInventoryComponent},
  {path: 'manageVehicleTypes', component: ManageVehicleTypesComponent}
]
const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'browse'}, // default path
  {path: 'browse', component: BrowseComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoggedInGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard] , children: children}, // need to add guard again
  {path: 'order', component: OrderComponent, canActivate: [OrderGuard]},
  {path: 'userOrders', component: UserOrderComponent, canActivate: [AuthGuard]},
  {path: 'employee', component: EmployeeComponent, canActivate: [EmployeeGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
