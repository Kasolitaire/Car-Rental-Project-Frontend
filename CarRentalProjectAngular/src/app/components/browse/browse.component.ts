import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleFilterRequirements } from 'src/app/models/vehicle-filter-requirements';
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

      //Form Testing
      const vehicleRequirements: FormGroup = this.formBuilder.group({
        brandName: '',
        model: '',
        dateManufactured: '',
        gear: ''
      });

      this.vehicleFilterRequirements = this.formBuilder.group({
        generalRequirement: '',
        vehicleRequirements: vehicleRequirements
      })
      //trash
      this.vehicleFilterRequirements.valueChanges.subscribe(value => console.log((value as VehicleFilterRequirements)))
  }

  //Subscription Properties
  private vehicleSubscription!: Subscription;
  private vehicleTypeSubscription!: Subscription;

  //Vehicle Data Properties
  public availableVehiclesList!: Vehicle[];
  public availableVehicleTypesList!: VehicleType[];

  //
  public vehicleFilterRequirements!: FormGroup;

  ngOnDestroy(): void {
    //Unsubscribing
    this.vehicleSubscription.unsubscribe();
    this.vehicleTypeSubscription.unsubscribe();
  }
}
