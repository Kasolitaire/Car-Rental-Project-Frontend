import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleType } from 'src/app/models/vehicle-type';
import { AuthService } from 'src/app/services/auth.service';
import { BrowseService } from 'src/app/services/browse.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, OnDestroy {
  constructor(private browseService: BrowseService, authService: AuthService) {}

  ngOnInit(): void {
    //load again??

    //Subscription assignment
    this.availableVehicleListSubscription = this.browseService
      .getAvailableVehiclesAsObservable()
      .subscribe(
        (emittedVehicleList: Vehicle[]) =>
          (this.availableVehiclesList = emittedVehicleList)
      );
        this.test();
    }

    async test(){
      this.selectedVehicleTypeSubscription = this.browseService
        .getSelectedVehicleTypeAsObservable()
        .subscribe((vehicleType: VehicleType) => {
          this.selectedVehicleType = vehicleType;
          this.findMatchingVehicle(vehicleType);
        });
  }


  //Subscription Properties
  private availableVehicleListSubscription!: Subscription;
  private selectedVehicleTypeSubscription!: Subscription;

  //Vehicle Data Properties
  public availableVehiclesList!: Vehicle[];

  public selectedVehicleType!: VehicleType;
  private matchingVehicle!: Vehicle;
  //trash
  findMatchingVehicle(selectedVehicleType: VehicleType) {
    let test = this.availableVehiclesList.find(
      (vehicle) => vehicle.vehicleTypeId == selectedVehicleType.vehicleTypeId
    );

    debugger;
    console.log(this.selectedVehicleType);
  }

  ngOnDestroy(): void {
    //Unsubscribing Vehicle Observables
    this.availableVehicleListSubscription.unsubscribe();
    this.selectedVehicleTypeSubscription.unsubscribe();
  }
}
