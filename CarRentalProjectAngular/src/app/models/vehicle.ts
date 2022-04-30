import { VehicleType } from './vehicle-type';

export interface Vehicle {
  vehicleId: number;
  vehicleTypeId: number;
  kilometers: number;
  carPhotograph: boolean | null;
  operational: boolean;
  available: boolean;
  serialNumber: string;
  vehicleType: VehicleType;
}
