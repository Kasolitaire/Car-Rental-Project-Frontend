import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { VehicleType } from 'src/app/models/vehicle-type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-vehicle-types',
  templateUrl: './manage-vehicle-types.component.html',
  styleUrls: ['./manage-vehicle-types.component.css']
})
export class ManageVehicleTypesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.createUpdateForm();
    this.getVehiclesTypes();

  }

  showForm!: boolean;
  vehicleTypes$!: Observable<VehicleType[]>;
  vehicleTypeUpdateForm!: FormGroup;

  private serverURL: string = environment.serverURL;

  private vehicleTypeUpdateDetails: VehicleType = {
    vehicleTypeId: 0,
    brandName: "",
    model: "",
    costPerDay: 0,
    costPerDayDelayed: 0,
    dateManufactured: "",
    gear: ""
  }

  createUpdateForm(){
    this.vehicleTypeUpdateForm = this.formBuilder.group({
      vehicleTypeId: this.vehicleTypeUpdateDetails.vehicleTypeId,
      brandName: this.vehicleTypeUpdateDetails.brandName,
      model: this.vehicleTypeUpdateDetails.model,
      costPerDay: this.vehicleTypeUpdateDetails.costPerDay,
      costPerDayDelayed: this.vehicleTypeUpdateDetails.costPerDayDelayed,
      dateManufactured: this.vehicleTypeUpdateDetails.dateManufactured,
      gear: this.vehicleTypeUpdateDetails.gear
    })
  }

  getVehiclesTypes(){
    const response$ = this.httpClient.get<VehicleType[]>(`${this.serverURL}Admin/VehicleType`);
    this.vehicleTypes$ = response$;
  }

  async deleteVehicleType(vehicleType: VehicleType){
    if(confirm('Are you sure you wanna delete this vehicle type?')){
     const response$ = this.httpClient.delete(`${this.serverURL}Admin/DeleteVehicleType,${vehicleType.vehicleTypeId}`);
     await firstValueFrom(response$);
     this.getVehiclesTypes();
    }
  }

  defaultDetails(vehicleType: VehicleType){
    this.vehicleTypeUpdateDetails = vehicleType;
    this.createUpdateForm();
    this.showForm = true;
  }

  async updateVehicleType(){
    this.vehicleTypeUpdateDetails = this.vehicleTypeUpdateForm.value;
    try {
      const response$ = this.httpClient.put(`${this.serverURL}Admin/UpdateVehicleType`, this.vehicleTypeUpdateDetails);
      await firstValueFrom(response$);
    }
    catch (error) {
      alert((error as HttpErrorResponse).error);
    }
    finally{
      this.getVehiclesTypes();
    }
  }

  async createNewVehicleType(){
    if (confirm('Confirm to create vehicle type')) {
      try {
        this.vehicleTypeUpdateDetails = this.vehicleTypeUpdateForm.value;
        const response$ = this.httpClient.post(`${this.serverURL}Admin/PostNewVehicleType`, this.vehicleTypeUpdateDetails);
        await firstValueFrom(response$);
      }
      catch (error) {
        alert((error as HttpErrorResponse).error);
      }
      finally{
        this.getVehiclesTypes();
      }
    }
  }

  showFormOnClick(){
    this.showForm = true;
  }
}

