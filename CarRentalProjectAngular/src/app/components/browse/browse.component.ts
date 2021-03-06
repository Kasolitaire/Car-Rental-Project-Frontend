import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, Subscription } from 'rxjs';
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
  constructor(
    private browseService: BrowseService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  //Move logic into separate function too crowded
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

    //Form Logic
    const vehicleRequirements: FormGroup = this.formBuilder.group({
      //Inner FormGroup
      brandName: '',
      model: '',
      dateManufactured: '',
      gear: '',
    });
    //Main FromGroup
    this.vehicleFilterRequirementsFormGroup = this.formBuilder.group({
      generalRequirement: '',
      vehicleRequirements: vehicleRequirements,
    });
    //pipe
    this.formSubscription = this.vehicleFilterRequirementsFormGroup.valueChanges
      .pipe(debounceTime(500))
      .subscribe(
        (emittedVehicleFilterRequirements: VehicleFilterRequirements) => {
          this.vehicleFilterRequirements = emittedVehicleFilterRequirements;
        }
      );
    this.vehicleFilterRequirements = this.vehicleFilterRequirementsFormGroup.value;
  }

  passSelectedVehicleType(selectedVehicleType: VehicleType){
    this.browseService.emitSelectedVehicle(selectedVehicleType);
    this.commitSelectedTypeToSessionStorage(selectedVehicleType);
    this.router.navigate(['/', 'order']);
  }

  commitSelectedTypeToSessionStorage(selectedVehicleType: VehicleType){
    const typeIdAsString: string = String(selectedVehicleType.vehicleTypeId);
    localStorage.setItem(typeIdAsString, typeIdAsString);
  }

  //Subscription Properties
  private vehicleSubscription!: Subscription;
  private vehicleTypeSubscription!: Subscription;
  private formSubscription!: Subscription;

  //Vehicle Data Properties
  public availableVehiclesList!: Vehicle[];
  public availableVehicleTypesList!: VehicleType[];

  //
  public vehicleFilterRequirementsFormGroup!: FormGroup;
  public vehicleFilterRequirements!: VehicleFilterRequirements;

  public showSuggestion: boolean = false;

  showSuggestionOnClick(){
    this.showSuggestion = !this.showSuggestion;
  }

  ngOnDestroy(): void {
    //Unsubscribing Vehicle Observables
    this.vehicleSubscription.unsubscribe();
    this.vehicleTypeSubscription.unsubscribe();

    //Unsubscribing from FormGroup Observable
    this.formSubscription.unsubscribe();
  }
}
