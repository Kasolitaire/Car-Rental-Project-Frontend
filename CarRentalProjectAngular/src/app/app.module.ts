import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowseComponent } from './components/browse/browse.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { BrowsePipe } from './pipes/browse.pipe';
import { OrderComponent } from './components/order/order.component';
import { UserOrderComponent } from './components/user-order/user-order.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { PreviouslySelectedPipe } from './pipes/previously-selected.pipe';
import { ManageUsersComponent } from './components/admin-components/manage-users/manage-users.component';
import { ManageOrdersComponent } from './components/admin-components/manage-orders/manage-orders.component';
import { ManageVehicleTypesComponent } from './components/admin-components/manage-vehicle-types/manage-vehicle-types.component';
import { ManageVehicleInventoryComponent } from './components/admin-components/manage-vehicle-inventory/manage-vehicle-inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    BrowseComponent,
    AboutComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    BrowsePipe,
    OrderComponent,
    UserOrderComponent,
    EmployeeComponent,
    VehicleComponent,
    PreviouslySelectedPipe,
    ManageUsersComponent,
    ManageOrdersComponent,
    ManageVehicleTypesComponent,
    ManageVehicleInventoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
