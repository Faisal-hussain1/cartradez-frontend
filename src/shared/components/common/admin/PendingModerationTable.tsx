'use client';

import Image from 'next/image';
import {Eye, Check, X} from 'lucide-react';
import { useSelector } from 'react-redux';
import { getCurrentUser, getUserRole } from '@/shared/redux/slices/users';
import { useMemo, useState } from 'react';
import { useQueries } from '@/shared/reactQuery/vehicles/queries';
import ListingPopUp from './adminUsers/ListingPopUp';

export default function PendingModerationTable() {
  const { useFetchAllVehicleList } = useQueries();
  const [popUp,setPopup]=useState(false);

  const { data, isLoading, error } = useFetchAllVehicleList();
  const [selectedVehicle,setSelectedVehicle]=useState<any>(null);
  const user=useSelector(getCurrentUser);

  const role=useSelector(getUserRole);
  const myVehicles = useMemo(() => {
  if (!data?.vehicles || !user?._id) return [];

  return data.vehicles.filter(
    (vehicle: any) => vehicle.creatorId === user._id
  );
}, [data?.vehicles, user?._id]);

const pendingVehicles = useMemo(() => {
  const source = role=='admin' ? data?.vehicles : myVehicles;

  if (!source) return [];

  return source.filter((vehicle: any) => vehicle?.listingType === null);
}, [role, data?.vehicles, myVehicles]);

  return (
    <section className='mt-4'>
      <div className='flex items-center justify-between mb-2'>
        {popUp && <ListingPopUp  vehicle={selectedVehicle}
    onClose={() => {
      setPopup(false);
      setSelectedVehicle(null);
    }}/>}
        <h2 className='text-sm font-semibold text-blue100'>
          Pending Moderation Queue
        </h2>

        <button
          className='
          text-xs font-medium
          text-blue100
          hover:text-blue100/80
           transition
            '
        >
          View All
        </button>
      </div>

      {/* Card */}
      <div className='bg-card border border-border rounded-lg overflow-hidden'>
        {/* Header Row */}
        <div
          className='
            grid grid-cols-[1fr_160px_120px_120px]
            px-3 py-2
            text-xs font-medium
            text-muted-foreground
            bg-muted
          '
        >
          <span>Listing</span>
          {(role==='admin' || role==='manager') && <span>Added By</span>}
          <span>Created</span>
          <span className='text-right'>Actions</span>
        </div>

         {pendingVehicles.length === 0 ? (
      <div className="py-10 text-center text-sm text-muted-foreground">
        No Pending Listings
      </div>
    ) : (
      pendingVehicles.map((item: any) => (
        <div key={item._id} className="grid grid-cols-[1fr_160px_120px_120px] items-center px-3 py-2 text-xs border-t border-border hover:bg-accent transition">
          
          {/* Listing */}
          <div className="flex items-center gap-2 min-w-0">
            <Image
              src={item?.coverImage?.url}
              alt="vehicle"
              width={32}
              height={32}
              className="rounded object-cover"
            />
            <span className="font-medium truncate text-foreground">
              {item?.make} {item?.model}
            </span>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-1.5 col-span-3">
            <ActionButton type="view" icon={<Eye size={14} />} />
            <ActionButton type="approve" icon={<Check size={14} />} />
            <ActionButton type="reject" icon={<X size={14} />} />

            <button
              onClick={() => {
                setPopup(true);
                setSelectedVehicle({
                  userId: item.creatorId,
                  vehicleId: item._id,
                  currency: item.currency,
                  image: item?.coverImage?.url,
                  make: item.make,
                  model: item.model,
                });
              }}
              className="bg-blue-600 hover:bg-primary active:scale-95 text-white text-xs font-medium px-4 py-2 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
            >
              List Now
            </button>
          </div>

        </div>
      ))
    )}
      </div>
    </section>
  );
}

// Action Button Component
function ActionButton({
  icon,
  type,
}: {
  icon: React.ReactNode;
  type: 'view' | 'approve' | 'reject';
}) {
  const styles = {
    view: `
      text-blue100 border-blue100
      hover:bg-blue10
      hover:shadow-sm
      active:scale-95
    `,
    approve: `
      text-green100 border-green100
      hover:bg-success-light
      hover:shadow-sm
      active:scale-95
    `,
    reject: `
      text-red100 border-red100
      hover:bg-error-light
      hover:shadow-sm
      active:scale-95
    `,
  };

  return (
    <button
      className={`
        h-7 w-7
        flex-center
        rounded-md
        border
        transition-all duration-150
        ${styles[type]}
      `}
    >
      {icon}
    </button>
  );
}
