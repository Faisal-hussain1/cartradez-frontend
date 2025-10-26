'use client';
import Image from 'next/image';

import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {ROOT_ROUTE} from '@/shared/constants/PATHS';

export default function UnderDevelopment() {
  const router = useLocaleRouter();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 bg-white text-center'>
      <div className='mb-8'>
        <Image
          src='/images/logo-black.png'
          alt='CarTradez Logo'
          width={180}
          height={120}
          priority
        />
      </div>
      <div className='w-full'>
        <h1 className='text-6xl font-bold text-primary mb-2'>
          Under Development
        </h1>
        <p className='text-xl font-medium text-gray-700 mb-6 mt-5'>
          Over website is currently under development. <br />
          Please Check soon again.
        </p>

        {/* <div className='flex justify-center mb-6'>
          <FiSearch className='text-primary w-16 h-16' />
        </div>

        <p className='text-gray-600 mb-8'>
          The page you’re looking for doesn’t exist
        </p> */}

        <PrimaryButton
          buttonText='Go back home'
          onClick={() => router.push(ROOT_ROUTE)}
        />
      </div>
         
    </div>
  );
}
