import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderDetail } from '../models/order';
import { VehicleType } from '../models/vehicle-type';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  private serverURL: string = environment.serverURL;

  async getMatchingOrder(serialNumber: string): Promise<OrderDetail | null>{
    try {
      const response$: Observable<OrderDetail> = this.httpClient.get<OrderDetail>(`${this.serverURL}Employee/GetOrderWithMatchingSerialNumber,${serialNumber}`);
      return await firstValueFrom<OrderDetail>(response$);
    }
    catch (error) {
      return null;
    }
  }
  async getMatchingVehicleType(serialNumber: string): Promise<VehicleType | null>{
    try {
      const response$: Observable<VehicleType> = this.httpClient.get<VehicleType>(`${this.serverURL}Employee/GetVehicleTypeWithMatchingSerialNumber,${serialNumber}`);
      return await firstValueFrom<VehicleType>(response$);
    }
    catch (error) {
      console.log(error as HttpErrorResponse);
      return null;
    }
  }

  async returnVehicleRequest(order: OrderDetail){
    try {
      const response$ = this.httpClient.put(`${this.serverURL}`, order);
      return await firstValueFrom(response$);
    } catch (error) {
      console.log(error as HttpErrorResponse);
      return null;
    }
  }

}
