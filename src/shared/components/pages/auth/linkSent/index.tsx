'use client';
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

        {/* Mail Icon */}
        <div className='flex justify-center mb-3'>
          <div className='w-14 h-14 rounded-full bg-red-100 flex items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-7 h-7 text-red-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
              />
            </svg>
          </div>
        </div>

        <h1 className='text-xl font-semibold text-gray-800 mb-1'>
          Check Your Email
        </h1>

        <p className='text-gray-600 text-xs mb-5'>
          We have sent you a mail. Check your mailbox.
        </p>

      </div>
    </div>
  );
}