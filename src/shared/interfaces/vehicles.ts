import {Vehicle} from './common';

export interface VehiclePayload {
  make: string;
  model: string;
  year: number;
  mileage: number;
  color: string;
  price: number;
  currency: string;
  description: string;
  engineSize: number;
  fuelType: string;
  transmission: string;

  // cylinder?: string;
  // location?: string;
  // modelDetail?: string;
  // importHistory?: string;
  images: File[];
  isGreatPrice?: boolean;
}

export interface VehicleCardProps {
  vehicle: Vehicle;
}

export interface vehicleDetailsPageProps {
  params: Promise<{vehicleId: string}>;
}

export interface vehicleDetailsLinkProps {
  vehicleId: string;
}
