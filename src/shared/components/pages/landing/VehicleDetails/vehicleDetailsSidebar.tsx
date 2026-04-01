// VehicleDetailsSidebar.tsx
'use client';

import ContactCard from '@/shared/components/common/vehicleDetails/ContactCard';
import SafetyGuidelinesCard from '@/shared/components/common/vehicleDetails/SafetyGuidelinesCard';
import SellerDetailsCard from '@/shared/components/common/vehicleDetails/SellerDetailsCard';

interface SellerDetailsType {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  totalActiveVehicles: number;
  createdAt: string;
}

export default function VehicleDetailsSidebar({
  sellerDetails,
}: {
  sellerDetails: SellerDetailsType;
}) {
  return (
    <div className='flex flex-col gap-4'>
      <ContactCard phoneNumber={sellerDetails.phoneNumber} sellerId={sellerDetails?._id} />
      <SellerDetailsCard sellerDetails={sellerDetails} />
      <SafetyGuidelinesCard />
    </div>
  );
}
