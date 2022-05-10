import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable, ReplaySubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/vehicle';
import { VehicleType } from '../models/vehicle-type';

@Injectable({
  providedIn: 'root'
})
export class BrowseService {

  constructor(private httpClient :HttpClient) { }
  //Server URL from environment
  private serverURL: string = environment.serverURL;

  //Emits all available vehicles
  private availableVehiclesSubject$: BehaviorSubject<Vehicle[]> = new BehaviorSubject<Vehicle[]>([])
  //Emits all available vehicles types
  private availableVehicleTypesSubject$: BehaviorSubject<VehicleType[]> = new BehaviorSubject<VehicleType[]>([]);
  //Emits the selected vehicle
  private selectedVehicleTypeReplay$: ReplaySubject<VehicleType> = new ReplaySubject<VehicleType>(1);

  //Retrieves all the available vehicles from the server
  async loadAllAvailableVehicles(){
    try {
      const availableVehicles$: Observable<Vehicle[]> = this.httpClient.get<Vehicle[]>(this.serverURL + 'Vehicle/GetAvailableVehicles');
      const availableVehiclesList: Vehicle[] = await firstValueFrom(availableVehicles$);
      this.availableVehiclesSubject$.next(availableVehiclesList);
    }
    catch (error) {
      console.log((error as HttpErrorResponse).status);
    }
  }

   //Retrieves all the available vehicles types from the server
  async loadAllAvailableVehicleTypes(){
    try {
      const availableVehicleTypes$: Observable<VehicleType[]> = this.httpClient.get<VehicleType[]>(this.serverURL + 'Vehicle/GetAllAvailableVehicleTypes');
      const availableVehicleTypeList: VehicleType[] = await firstValueFrom(availableVehicleTypes$);
      this.availableVehicleTypesSubject$.next(availableVehicleTypeList);
    }
    catch (error) {
      console.log((error as HttpErrorResponse).status);
    }
  }

  emitSelectedVehicle(selectedVehicleType: VehicleType){
    this.selectedVehicleTypeReplay$.next(selectedVehicleType);
  }

  getSelectedVehicleTypeAsObservable(){
    return this.selectedVehicleTypeReplay$.asObservable();
  }

  getAvailableVehiclesAsObservable(){
    return this.availableVehiclesSubject$.asObservable();
  }

  getAvailableVehicleTypesAsObservable(){
    return this.availableVehicleTypesSubject$.asObservable()
  }
}
