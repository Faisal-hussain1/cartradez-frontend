'use client';

import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import Logo from '@/shared/components/common/logo';
import {useRouter} from 'next/navigation';

export default function PaymentSuccess() {
  const router = useRouter();

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='bg-white rounded-xl shadow-md p-6 max-w-sm w-full text-center'>
        {/* logo */}
        <div className='flex justify-center mb-3'>
          <Logo width={150} height={55} />
        </div>

      <div className='flex justify-center mb-3'>
          <div className='w-14 h-14 rounded-full bg-green-200 flex items-center justify-center'>
            <span className='text-green-600 text-2xl font-semibold'>✓</span>
          </div>
        </div>
        
        <h1 className='text-xl font-semibold text-gray-800 mb-1'>
          Payment Successful
        </h1>

        <p className='text-gray-600 text-xs mb-5'>
          Your payment has been completed successfully. Your listing is now
          active.
        </p>

        {/* Button */}
        <PrimaryButton
          buttonText='Go to Dashboard'
          onClick={() => router.push('/')}
          styles='w-full'
        />
      </div>
    </div>
  );
}
