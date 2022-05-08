export interface VehicleFilterRequirements {
  generalRequirement: string
  vehicleRequirements: VehicleRequirements
}

export interface VehicleRequirements{
  brandName: string;
  model: string;
  dateManufactured: string
  gear: string;
}
