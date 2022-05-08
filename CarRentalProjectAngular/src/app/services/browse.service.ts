import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/vehicle';
import { VehicleType } from '../models/vehicle-type';

@Injectable({
  providedIn: 'root'
})
export class BrowseService {

  constructor(private httpClient :HttpClient) { }

  private serverURL: string = environment.serverURL;
  private vehicleSubject$: BehaviorSubject<Vehicle[]> = new BehaviorSubject<Vehicle[]>([])
  private vehicleTypeSubject$: BehaviorSubject<VehicleType[]> = new BehaviorSubject<VehicleType[]>([]);

  async loadAllAvailableVehicles(){ // gets all the available vehicles via api
    try {
      const availableVehicles$: Observable<Vehicle[]> = this.httpClient.get<Vehicle[]>(this.serverURL + 'Vehicle/GetAvailableVehicles');
      const availableVehiclesList: Vehicle[] = await firstValueFrom(availableVehicles$);
      this.vehicleSubject$.next(availableVehiclesList);
    }
    catch (error) {
      console.log((error as HttpErrorResponse).status);
    }
  }

  async loadAllAvailableVehicleTypes(){ // gets all the available vehicle types that have available vehicles
    try {
      const availableVehicleTypes$: Observable<VehicleType[]> = this.httpClient.get<VehicleType[]>(this.serverURL + 'Vehicle/GetAllAvailableVehicleTypes');
      const availableVehicleTypeList: VehicleType[] = await firstValueFrom(availableVehicleTypes$);
      this.vehicleTypeSubject$.next(availableVehicleTypeList);
    }
    catch (error) {
      console.log((error as HttpErrorResponse).status);
    }
  }

  getAvailableVehiclesAsObservable(){
    return this.vehicleSubject$.asObservable();
  }

  getAvailableVehicleTypesAsObservable(){
    return this.vehicleTypeSubject$.asObservable()
  }

}
