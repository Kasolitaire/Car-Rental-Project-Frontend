import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicle';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-vehicle-inventory',
  templateUrl: './manage-vehicle-inventory.component.html',
  styleUrls: ['./manage-vehicle-inventory.component.css']
})
export class ManageVehicleInventoryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.createUpdateForm();
    this.getVehicles();
  }

  showForm!: boolean;
  vehicles$!: Observable<Vehicle[]>;
  vehicleUpdateForm!: FormGroup;

  private serverURL: string = environment.serverURL;

  vehicleUpdateDetails: Vehicle= {
    vehicleId: 0,
    vehicleTypeId: 0,
    kilometers: 0,
    carPhotograph: true,
    operational: true,
    available: true,
    serialNumber: "string"
  }

  getVehicles(){
    const response$ = this.httpClient.get<Vehicle[]>(`${this.serverURL}Admin/VehicleInventory`);
    this.vehicles$ = response$;
  }

  async deleteVehicle(vehicle: Vehicle){
    if(confirm('Are you sure you wanna delete this vehicle?')){
     const response$ = this.httpClient.delete(`${this.serverURL}Admin/DeleteVehicle,${vehicle.vehicleId}`);
     await firstValueFrom(response$);
     this.getVehicles();
    }
  }

  defaultDetails(vehicle: Vehicle){
    this.vehicleUpdateDetails = vehicle
    this.createUpdateForm();
    this.showForm = true;
  }

  createUpdateForm(){
    this.vehicleUpdateForm = this.formBuilder.group({
      vehicleId: this.vehicleUpdateDetails.vehicleId,
      vehicleTypeId: this.vehicleUpdateDetails.vehicleTypeId,
      kilometers: this.vehicleUpdateDetails.kilometers,
      carPhotograph: this.vehicleUpdateDetails.carPhotograph,
      operational: this.vehicleUpdateDetails.operational,
      available: this.vehicleUpdateDetails.available,
      serialNumber: this.vehicleUpdateDetails.serialNumber
    })
  }

  async updateVehicle(){
    this.vehicleUpdateDetails = this.vehicleUpdateForm.value;
    try {
      const response$ = this.httpClient.put(`${this.serverURL}Admin/UpdateVehicle`, this.vehicleUpdateDetails);
      await firstValueFrom(response$);
    }
    catch (error) {
      alert((error as HttpErrorResponse).error);
    }
    this.getVehicles();
  }

  async createNewVehicle(){
    if (confirm('Confirm to create vehicle')) {
      try {
        this.vehicleUpdateDetails = this.vehicleUpdateForm.value;
        const response$ = this.httpClient.post(`${this.serverURL}Admin/PostNewVehicle`, this.vehicleUpdateDetails);
        await firstValueFrom(response$);
      }
      catch (error) {
        alert((error as HttpErrorResponse).error);
      }
      finally{
        this.getVehicles()
      }
    }
  }

  showFormOnClick(){
    this.showForm = true;
  }
}


