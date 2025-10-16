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
interface ContactCardProps {
  vehicle?: Vehicle;
  title?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  contactMessage?: string;
  showCallOption?: boolean;
  showWhatsApp?: boolean;
  showMessage?: boolean;
  onCallClick?: () => void;
  onWhatsAppClick?: () => void;
  onMessageClick?: () => void;
}
