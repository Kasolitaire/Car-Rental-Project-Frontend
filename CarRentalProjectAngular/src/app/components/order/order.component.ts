import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, firstValueFrom, Observable, Subscription } from 'rxjs';
import { OrderDetail } from 'src/app/models/order';
import { RentalPeriod } from 'src/app/models/rental-period';
import { VehicleType } from 'src/app/models/vehicle-type';
import { AuthService } from 'src/app/services/auth.service';
import { BrowseService } from 'src/app/services/browse.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private browseService: BrowseService,
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
      this.loginStatus$ = this.authService.loginStatusAsObservable();
      this.selectedVehicleType$ = this.browseService.getSelectedVehicleTypeAsObservable();
      this.createFormGroup();
      this.subscribeToFormChanges();
    }
    public loginStatus$!: Observable<boolean>;
    //  Contains the user selected vehicle
    public selectedVehicleType$!: Observable<VehicleType>;

    //  Calculated total cost
    public totalCost!: number;
    //  The initial date for pickUpDate
    public minDate: Date = new Date();
    //  The date that gets sent to the server

    public currentRentalPeriod!: RentalPeriod;
    //  Contains created form group
    public dateFormGroup!: FormGroup;
    //  Subscription to the date form
    private formSubscription!: Subscription;

  //  Creates from group & emits values on date changes
  createFormGroup(){
    this.dateFormGroup = this.formBuilder.group({
      pickUpDate: [Date, [Validators.required]],
      dropOffDate: [Date, [Validators.required]],
    });
  }
  //  Emits values when form is valid
  subscribeToFormChanges(){
    this.formSubscription = this.dateFormGroup.valueChanges
      .pipe(filter((value: RentalPeriod) => {
        if(this.dateFormGroup.valid){
          return value.dropOffDate.getTime() >= value.pickUpDate.getTime();
        }
        return false
      }))
      .subscribe((emittedRentalPeriod: RentalPeriod) => {
        this.currentRentalPeriod = emittedRentalPeriod;
        this.calculateTotalRentalCost(emittedRentalPeriod);
      });
  }
  //  Calculates the total cost
  async calculateTotalRentalCost(rentalPeriod: RentalPeriod) {
    const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
    const differenceInMilliseconds =
      rentalPeriod.dropOffDate.getTime() - rentalPeriod.pickUpDate.getTime();
    const differenceInDays = Math.round((differenceInMilliseconds / oneDayInMilliseconds) + 1);
    const selectedType: VehicleType =  await firstValueFrom(this.selectedVehicleType$);
    this.totalCost = selectedType.costPerDay * differenceInDays;
    //this.selectedVehicleType$.subscribe((selectedType: VehicleType) =>  {selectedType.costPerDay * differenceInDays} ).unsubscribe();
  }

  async orderThenNavigate(currentRentalPeriod: RentalPeriod) {
    const loginStatus: boolean = await firstValueFrom(this.loginStatus$);
    if(loginStatus){
      this.orderService.executeOrder(currentRentalPeriod);
      this.router.navigate(['/', 'userOrders']);
    }
    else{
      this.router.navigate(['/','login']);
    }
  }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
