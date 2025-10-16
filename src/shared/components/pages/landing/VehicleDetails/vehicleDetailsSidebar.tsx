// VehicleDetailsSidebar.tsx
'use client';

import ContactCard from '@/shared/components/common/vehicleDetails/ContactCard';
import SafetyGuidelinesCard from '@/shared/components/common/vehicleDetails/SafetyGuidelinesCard';
import SellerDetailsCard from '@/shared/components/common/vehicleDetails/SellerDetailsCard';

export default function VehicleDetailsSidebar() {
  return (
    <div className='flex flex-col gap-4'>
      <ContactCard />
      <SellerDetailsCard />
      <SafetyGuidelinesCard />
    </div>
  );
}
