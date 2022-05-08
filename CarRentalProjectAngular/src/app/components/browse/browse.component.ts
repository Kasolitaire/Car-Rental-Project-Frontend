import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleType } from 'src/app/models/vehicle-type';
import { BrowseService } from 'src/app/services/browse.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit , OnDestroy{

  constructor(private browseService: BrowseService) { }

  ngOnInit(): void {
    this.browseService.loadAllAvailableVehicles();
    this.browseService.loadAllAvailableVehicleTypes();

  }





  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
