import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleType } from 'src/app/models/vehicle-type';
import { BrowseService } from 'src/app/services/browse.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit, OnDestroy {
  constructor(private browseService: BrowseService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    //HTTP requests
    this.browseService.loadAllAvailableVehicles();
    this.browseService.loadAllAvailableVehicleTypes();

    //Subscription assignment
    this.vehicleSubscription = this.browseService
      .getAvailableVehiclesAsObservable()
      .subscribe(
        (emittedVehicleList: Vehicle[]) =>
          (this.availableVehiclesList = emittedVehicleList)
      );

    this.vehicleTypeSubscription = this.browseService
      .getAvailableVehicleTypesAsObservable()
      .subscribe(
        (emittedVehicleTypeList: VehicleType[]) =>
          (this.availableVehicleTypesList = emittedVehicleTypeList)
      );
  }

  //Subscription Properties
  private vehicleSubscription!: Subscription;
  private vehicleTypeSubscription!: Subscription;

  //Vehicle Data Properties
  public availableVehiclesList!: Vehicle[];
  public availableVehicleTypesList!: VehicleType[];

  ngOnDestroy(): void {
    //Unsubscribing
    this.vehicleSubscription.unsubscribe();
    this.vehicleTypeSubscription.unsubscribe();
  }
}
