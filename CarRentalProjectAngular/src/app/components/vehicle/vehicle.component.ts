import { Component, Input, OnInit } from '@angular/core';
import { VehicleType } from 'src/app/models/vehicle-type';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() vehicle!: VehicleType;

}
