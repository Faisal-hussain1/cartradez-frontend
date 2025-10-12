'use client';

import {vehicleDetailsLinkProps} from '@/shared/interfaces/vehicles';

export default function VehicleDetails({vehicleId}: vehicleDetailsLinkProps) {
  return <div className='flex justify-center'>Hello {vehicleId}</div>;
}
