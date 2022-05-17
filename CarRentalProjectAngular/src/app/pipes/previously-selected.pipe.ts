import { Pipe, PipeTransform } from '@angular/core';
import { VehicleType } from '../models/vehicle-type';

@Pipe({
  name: 'previouslySelected'
})
export class PreviouslySelectedPipe implements PipeTransform {

  transform(vehicleType: VehicleType): boolean {
    const TypeIdAsString = String(vehicleType.vehicleTypeId);

    if(TypeIdAsString != localStorage.getItem(TypeIdAsString)) return false;
    return true
  }

}
