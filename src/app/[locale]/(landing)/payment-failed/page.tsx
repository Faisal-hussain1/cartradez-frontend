'use client';

import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import Logo from '@/shared/components/common/logo';
import {useRouter} from 'next/navigation';

export default function PaymentFailed() {
  const router = useRouter();

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='bg-white rounded-xl shadow-md p-6 max-w-sm w-full text-center'>

        <div className='flex justify-center mb-3'>
          <Logo width={150} height={55} />
        </div>

        <div className='flex justify-center mb-3'>
          <div className='w-14 h-14 rounded-full bg-red-100 flex items-center justify-center'>
            <span className='text-red-600 text-2xl font-semibold'>✕</span>
          </div>
        </div>

        <h1 className='text-xl font-semibold text-gray-800 mb-1'>
          Payment Failed
        </h1>

        <p className='text-gray-600 text-xs mb-5'>
          Your payment could not be processed. Please try again.
        </p>

        {/* Button */}
        <PrimaryButton
          buttonText='Go To Dashboard'
          onClick={() => router.push('/')}
          styles='w-full'
        />
      </div>
    </div>
  );
}