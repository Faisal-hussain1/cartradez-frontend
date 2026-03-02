'use client';

import Image from 'next/image';
import {Eye, Check, X} from 'lucide-react';
import { useSelector } from 'react-redux';
import { getCurrentUser, getUserRole } from '@/shared/redux/slices/users';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useMemo, useState } from 'react';
import { useQueries } from '@/shared/reactQuery/vehicles/queries';
import { API_ENDPOINTS } from '@/shared/constants/apiEndpoints';
import { tryCatch } from '@/shared/utils/tryCatchUtils';

const listings = [
  {
    id: 1,
    title: 'Bugatti Chiron Super Sport 300+',
    image: '/images/Frame 22.png',
    seller: 'Darrell Steward',
    created: 'Feb 08, 2025',
  },
  {
    id: 2,
    title: 'Lamborghini Sian Roadster',
    image: '/images/Frame 22.png',
    seller: 'Brooklyn Simmons',
    created: 'May 14, 2025',
  },
  {
    id: 3,
    title: 'SSC Tuatara',
    image: '/images/Frame 22.png',
    seller: 'Kathryn Murphy',
    created: 'Jul 01, 2025',
  },
  {
    id: 4,
    title: 'SSC Tuatara',
    image: '/images/Frame 22.png',
    seller: 'Kathryn Murphy',
    created: 'Jul 01, 2025',
  },
  {
    id: 5,
    title: 'SSC Tuatara',
    image: '/images/Frame 22.png',
    seller: 'Kathryn Murphy',
    created: 'Jul 01, 2025',
  },
  {
    id: 6,
    title: 'SSC Tuatara',
    image: '/images/Frame 22.png',
    seller: 'Kathryn Murphy',
    created: 'Jul 01, 2025',
  },
];

export default function PendingModerationTable() {
  const { useFetchAllVehicleList } = useQueries();

  const { data, isLoading, error } = useFetchAllVehicleList();
  const [message,setMessage]=useState('');
  const user=useSelector(getCurrentUser);
  const myVehicles = useMemo(() => {
  if (!data?.vehicles || !user?._id) return [];

  return data.vehicles.filter(
    (vehicle: any) => vehicle.creatorId === user._id
  );
}, [data?.vehicles, user?._id]);

const publishableKey="pk_test_51RKN9FQaNfqZpifiMJskjSfmcCdVhVMks73GTE7Ti9MG5nkg9T5w4a9cdeUDckrEEYXgoTdZzgFm5aLh8cQRsMCN00IOOjP2BE"
  
  const stripePromise = loadStripe(publishableKey);

  const pay=async(userId:any,vehicleId:any,currency:any,image:any,make:any,model:any)=>{
    try {
      const stripe = await stripePromise;
       if (!stripe) {
      console.error('Stripe failed to initialize');
      return;
    }
      
      const res = await fetch(`http://localhost:3001/api/v1/payment`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({userId,vehicleId,currency,image,make,model}),
      });
  
  
      const data = await res.json();  
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.id
      });
      if (error) {
        console.error('Stripe redirect error:', error);
      }
      
    } catch (err) {
      console.error('Payment error:', err);
    }
  }



  return (
    <section className='mt-4'>
      {/* Header */}
      <div className='flex items-center justify-between mb-2'>
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
          <span>Seller</span>
          <span>Created</span>
          <span className='text-right'>Actions</span>
        </div>

        {myVehicles.map((item:any) => (
          <div
            key={item._id}
            className='
              grid grid-cols-[1fr_160px_120px_120px]
              items-center
              px-3 py-2
              text-xs
              border-t border-border
              hover:bg-accent
              transition
            '
          >
            {/* Listing */}
            <div className='flex items-center gap-2 min-w-0'>
              <Image
                src={item.coverImage.url}
                alt={item.coverImage.key}
                width={32}
                height={32}
                className='rounded object-cover'
              />
              <span className='font-medium truncate text-foreground'>
                {item.make}
              </span>
            </div>

            {/* Seller */}
            {/* <span className='truncate text-gray80'>{item.seller}</span> */}

            {/* Created */}
            {/* <span className='text-gray70'>{item.created}</span> */}

            {/* Actions */}
            <div className='flex justify-end gap-1.5'>
              <ActionButton type='view' icon={<Eye size={14} />} />
              <ActionButton type='approve' icon={<Check size={14} />} />
              <ActionButton type='reject' icon={<X size={14} />} />
              <button onClick={()=>pay(user?._id,item._id,item.currency,item.coverImage.url,item.make,item.model)} className='bg-blue-600
    hover:bg-blue-700
    active:scale-95
    text-white
    text-xs
    font-medium
    px-4
    py-2
    rounded-md
    transition-all
    duration-200
    shadow-sm
    hover:shadow-md'>Pay Now</button>
            </div>
          </div>
        ))}
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
