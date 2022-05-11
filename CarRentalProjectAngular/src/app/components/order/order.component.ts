import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, zip } from 'rxjs';
import { User } from 'src/app/models/user';
import { Vehicle } from 'src/app/models/vehicle';
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
  constructor(private browseService: BrowseService, private authService: AuthService, private orderService: OrderService) {}

  ngOnInit(): void {
    //load again??
    //Subscription assignment
    // this.subscribeToAvailableVehicles();
    // this.subscribeToSelectedVehicleType();
  }

  order(){
    this.orderService.executeOrder()
  }
  ngOnDestroy(): void {
    //Unsubscribing Vehicle Observables
    //this.availableVehicleListSubscription.unsubscribe();
    //this.selectedVehicleTypeSubscription.unsubscribe();
  }
}
