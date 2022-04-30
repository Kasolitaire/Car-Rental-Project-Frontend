//Not sure if this import makes sense yet
import { Vehicle } from "./vehicle";

export interface VehicleType {
  vehicleTypeId: number;
  brandName: string;
  model: string;
  costPerDay: number;
  costPerDayDelayed: number;
  dateManufactured: string;
  gear: string;
  vehicleInventories: Vehicle[];
}