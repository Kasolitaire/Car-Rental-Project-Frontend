import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { EmptyError, filter, Observable } from 'rxjs';
import { OrderDetail } from 'src/app/models/order';
import { VehicleType } from 'src/app/models/vehicle-type';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.calendarControlGroup = this.formBuilder.group({date: ['', [Validators.required]]});
    this.serialNumberFromControl = this.formBuilder.control('', Validators.required)
    this.calendarControlGroup.disable();

    this.calendarControlGroup.valueChanges.pipe(filter(() => this.calendarControlGroup.valid)).subscribe((returnDate) => {
      this.processDates(returnDate.date as string)
    });

  }

  calendarControlGroup!: FormGroup;
  serialNumberFromControl!: FormControl;

  minDate!: Date;

  public currentMatchingOrder!: OrderDetail;
  private currentMatchingVehicleType!: VehicleType

  totalDelayCost!: number;
  totalCost!: number;

  async matchingOrderRequest(serialNumber: string){
    const matchingOrder: OrderDetail | null = await this.employeeService.getMatchingOrder(serialNumber);
    if (matchingOrder) {
      const matchingVehicleType: VehicleType | null = await this.matchingTypeRequest(serialNumber);
      if (matchingVehicleType) {
        this.finalize(matchingOrder, matchingVehicleType);
      }
    }
    else{
      alert('Order does not exist')
    }
  }

  async matchingTypeRequest(serialNumber: string):Promise<VehicleType | null>{
    const matchingVehicleType: VehicleType | null = await this.employeeService.getMatchingVehicleType(serialNumber);
    if (matchingVehicleType) {
      return matchingVehicleType
    }
    else{
      alert('Vehicle with matching serial number dose not exist');
      return null
    }
  }

  returnVehicle(order: OrderDetail){
    this.employeeService.returnVehicleRequest(order);
  }

  processDates(returnDateString: string){
    const returnDate: Date = new Date(returnDateString);
    const dropOffDate: Date = this.convertDate(this.currentMatchingOrder.dropOffDate);
    this.totalCost = this.calculateRentalCost(this.currentMatchingOrder, this.currentMatchingVehicleType);
    this.totalDelayCost = this.totalDelayCostCalculation(dropOffDate, returnDate, this.currentMatchingVehicleType);
  }

  totalDelayCostCalculation(dropOffDate: Date, ReturnDate: Date, currentType: VehicleType):number {
    const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
    const differenceInMilliseconds = ReturnDate.getTime() - dropOffDate.getTime();
    const differenceInDays = Math.round(differenceInMilliseconds / oneDayInMilliseconds);
    return currentType.costPerDayDelayed * differenceInDays;
  }

  calculateRentalCost(currentOrder: OrderDetail, currentType: VehicleType): number{
    const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
    const differenceInMilliseconds = this.convertDate(currentOrder.dropOffDate).getTime() - this.convertDate(currentOrder.pickUpDate).getTime();
    const differenceInDays = Math.round((differenceInMilliseconds / oneDayInMilliseconds)) + 1;
    const t = currentType.costPerDay;
    return currentType.costPerDay * differenceInDays;
  }

  finalize(matchingOrder: OrderDetail, matchingVehicleType: VehicleType){
    this.currentMatchingOrder = matchingOrder;
    this.currentMatchingVehicleType = matchingVehicleType;

    this.minDate = this.convertDate(matchingOrder.dropOffDate);
    this.calendarControlGroup.enable();
    this.currentMatchingOrder = matchingOrder;
  }

  convertDate(badFormat: string): Date{
    const split: string[] = badFormat.split('/');
    return new Date(`${split[1]}/${split[0]}/${split[2]}`);
  }
}