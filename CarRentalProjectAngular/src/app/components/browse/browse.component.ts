import { Component, OnDestroy, OnInit } from '@angular/core';
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
  constructor(private browseService: BrowseService) {}

  ngOnInit(): void {
    //HTTP requests
    this.browseService.loadAllAvailableVehicles();
    this.browseService.loadAllAvailableVehicleTypes();

    this.vehicleSubscription = this.browseService
      .getAvailableVehiclesAsObservable()
      .subscribe(
        (emittedVehicleList: Vehicle[]) => (this.availableVehiclesList = emittedVehicleList)
      );
  }

  //Subscription Properties
  private vehicleSubscription!: Subscription;
  private vehicleTypeSubscription!: Subscription;

  //Vehicle Data Properties
  private availableVehiclesList!: Vehicle[];
  private availableVehicleTypesList!: VehicleType[];

  ngOnDestroy(): void {

  }
}
