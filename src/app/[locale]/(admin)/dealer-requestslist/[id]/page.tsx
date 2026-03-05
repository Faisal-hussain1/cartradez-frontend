'use client';

import {useParams} from 'next/navigation';
import {useMemo} from 'react';

interface DealerRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  showroomName: string;
  showroomAddress: string;
  experience: number;
  nrcNo: string;
  ntnNo: string;
  carTypes: string;
  socialMedia?: string;
}

export default function DealerRequestDetail() {
  const params = useParams();
  const id = params.id as string;

  // 🔥 Temporary static data (later replace with API)
  const dealers: DealerRequest[] = [
    {
      id: '1',
      name: 'Ali Traders',
      email: 'ali@gmail.com',
      phone: '03001234567',
      company: 'Ali Motors',
      city: 'Lahore',
      showroomName: 'Ali Motors Showroom',
      showroomAddress: 'Main Boulevard Lahore',
      experience: 5,
      nrcNo: '123456/12/1',
      ntnNo: '3456789',
      carTypes: 'Used',
      socialMedia: 'facebook.com/alimotors',
    },
  ];

  const dealer = useMemo(() => dealers.find((d) => d.id === id), [id]);

  if (!dealer) {
    return (
      <div className='p-10 text-center text-muted-foreground'>
        Dealer not found.
      </div>
    );
  }

  return (
    <div className='p-10 bg-background min-h-screen'>
      <h1 className='text-3xl font-bold text-primary mb-8'>
        Dealer Request Detail
      </h1>

      <div className='bg-card border border-border rounded-xl p-8 shadow-glow'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-12 md:col-span-6'>
            <p className='text-muted-foreground'>Dealer Name</p>
            <p className='font-semibold text-foreground'>{dealer.name}</p>
          </div>

          <div className='col-span-12 md:col-span-6'>
            <p className='text-muted-foreground'>Email</p>
            <p className='font-semibold'>{dealer.email}</p>
          </div>

          <div className='col-span-12 md:col-span-6'>
            <p className='text-muted-foreground'>Phone</p>
            <p className='font-semibold'>{dealer.phone}</p>
          </div>

          <div className='col-span-12 md:col-span-6'>
            <p className='text-muted-foreground'>City</p>
            <p className='font-semibold'>{dealer.city}</p>
          </div>

          <div className='col-span-12 md:col-span-6'>
            <p className='text-muted-foreground'>Company</p>
            <p className='font-semibold'>{dealer.company}</p>
          </div>

          <div className='col-span-12 md:col-span-6'>
            <p className='text-muted-foreground'>Showroom Name</p>
            <p className='font-semibold'>{dealer.showroomName}</p>
          </div>

          <div className='col-span-12 md:col-span-6'>
            <p className='text-muted-foreground'>Experience</p>
            <p className='font-semibold'>{dealer.experience} Years</p>
          </div>

          <div className='col-span-12 md:col-span-6'>
            <p className='text-muted-foreground'>Car Types</p>
            <p className='font-semibold'>{dealer.carTypes}</p>
          </div>

          <div className='col-span-12 md:col-span-6'>
            <p className='text-muted-foreground'>NRC No</p>
            <p className='font-semibold'>{dealer.nrcNo}</p>
          </div>

          <div className='col-span-12 md:col-span-6'>
            <p className='text-muted-foreground'>NTN No</p>
            <p className='font-semibold'>{dealer.ntnNo}</p>
          </div>

          <div className='col-span-12'>
            <p className='text-muted-foreground'>Showroom Address</p>
            <p className='font-semibold'>{dealer.showroomAddress}</p>
          </div>

          {dealer.socialMedia && (
            <div className='col-span-12'>
              <p className='text-muted-foreground'>Social Media</p>
              <p className='font-semibold text-primary'>{dealer.socialMedia}</p>
            </div>
          )}
        </div>

        {/* Approve / Reject Buttons */}
        <div className='flex justify-end mt-8 gap-4'>
          <button className='bg-green100 text-white px-6 py-2 rounded-lg'>
            Approve
          </button>
          <button className='bg-destructive text-destructive-foreground px-6 py-2 rounded-lg'>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
