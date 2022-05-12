import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderDetail } from '../models/order';
import { RentalPeriod } from '../models/rental-period';
import { User } from '../models/user';
import { Vehicle } from '../models/vehicle';
import { VehicleType } from '../models/vehicle-type';
import { AuthService } from './auth.service';
import { BrowseService } from './browse.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService{

  constructor(private browseService: BrowseService, private authService: AuthService, private httpClient: HttpClient) { }

  serverURL:String = environment.serverURL;

  async executeOrder(currentRentalPeriod: RentalPeriod){
    const availableVehicles$: Observable<Vehicle[]> = this.browseService.getAvailableVehiclesAsObservable()
    const selectedVehicleType$: Observable<VehicleType> = this.browseService.getSelectedVehicleTypeAsObservable()
    const currentUser$: Observable<User> = this.authService.userAsObservable()
    zip(availableVehicles$, selectedVehicleType$, currentUser$).subscribe(([emittedVehicles, emittedType, emittedUser]) =>{
      const matchingVehicle:Vehicle | undefined = this.findMatchingVehicle(emittedVehicles, emittedType);
      const order = this.createOrder(matchingVehicle, emittedUser, currentRentalPeriod);
      this.postOrder(order, matchingVehicle)
    }).unsubscribe();
  }

  private findMatchingVehicle(availableVehiclesList: Vehicle[], selectedVehicleType: VehicleType): Vehicle | undefined {
    return availableVehiclesList.find(
      (vehicle) => vehicle.vehicleTypeId == selectedVehicleType.vehicleTypeId
    );
  }

  private createOrder(matchingVehicle:Vehicle | undefined, currentUser: User, currentRentalPeriod: RentalPeriod){
    return {
    pickUpDate: currentRentalPeriod.pickUpDate.toLocaleDateString(),
    dropOffDate:currentRentalPeriod.dropOffDate.toLocaleDateString(),
    userId: currentUser.userId,
    serialNumber: matchingVehicle?.serialNumber
    } as OrderDetail
  }

  async postOrder(order: OrderDetail, matchingVehicle:Vehicle | undefined){
    //post
    try {
      const response$ = this.httpClient.post(`${this.serverURL}User/PostNewOrder,${matchingVehicle?.vehicleId}`, order);
      console.log(await firstValueFrom(response$));
      alert('Order was successful')
    }
    catch (error) {
      console.log((error as HttpErrorResponse));
    }
    finally{
      this.browseService.loadAllAvailableVehicleTypes();
      this.browseService.loadAllAvailableVehicles();
    }
  }
}
