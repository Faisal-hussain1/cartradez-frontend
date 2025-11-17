import {Vehicle} from './common';

export interface VehiclePayload {
  make: string;
  model: string;
  variant?: string;
  year: number;
  condition: string;
  bodyType: string;
  color: string;
  mileage: number;
  engineSize: number;
  transmission: string;
  fuelType: string;
  driveType: string;
  currency: string;
  price: number;
  registrationCity: string;
  registrationNumber: string;
  registrationYear: number;
  numberOfOwners: number;
  features: string[];
  images: File[];
  description: string;
  isGreatPrice?: boolean;
}

export interface VehicleCardProps {
  vehicle: Vehicle;
}

export interface vehicleDetailsPageProps {
  params: {
    vehicleId: string;
  };
}

export interface vehicleDetailsLinkProps {
  vehicleId: string;
}

export interface PanelProps {
  title: string;
  items: string[];
  lightBg?: boolean;
}

// interface ContactCardProps {
//   vehicle?: Vehicle;
//   title?: string;
//   phoneNumber?: string;
//   whatsappNumber?: string;
//   whatsappMessage?: string;
//   contactMessage?: string;
//   showCallOption?: boolean;
//   showWhatsApp?: boolean;
//   showMessage?: boolean;
//   onCallClick?: () => void;
//   onWhatsAppClick?: () => void;
//   onMessageClick?: () => void;
// }
