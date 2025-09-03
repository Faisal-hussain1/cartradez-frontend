export interface ProductPayload {
  title: string;
  description: string;
  price: number;
  condition: 'new' | 'used';
  location: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'manual' | 'automatic';
  images: File[];
}
