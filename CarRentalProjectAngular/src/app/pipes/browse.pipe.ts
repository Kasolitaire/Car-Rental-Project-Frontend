import { Pipe, PipeTransform } from '@angular/core';
import {
  VehicleFilterRequirements,
  VehicleRequirements,
} from '../models/vehicle-filter-requirements';
import { VehicleType } from '../models/vehicle-type';

@Pipe({
  name: 'browse',
})
export class BrowsePipe implements PipeTransform {
  transform (vehicleType: VehicleType, vehicleFilterRequirements: VehicleFilterRequirements) {

    let vehicleDataList = [];
    let filterDataList = [];

    for (let key in vehicleFilterRequirements.vehicleRequirements) {

      let filterKey: keyof VehicleRequirements = key as keyof typeof vehicleFilterRequirements.vehicleRequirements;
      vehicleDataList.push(vehicleType[filterKey].toUpperCase());
      filterDataList.push(vehicleFilterRequirements.vehicleRequirements[filterKey].toUpperCase())
    }

    for (let index = 0; index < vehicleDataList.length; index++) {
      if(vehicleDataList[index] != filterDataList[index] && filterDataList[index] != ''){
        return false
      }
    }

    return vehicleDataList.includes(vehicleFilterRequirements.generalRequirement.toUpperCase()) || vehicleFilterRequirements.generalRequirement == '';
  }
}
