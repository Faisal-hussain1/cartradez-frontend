import Container from '@/shared/components/common/containers';
import {BannerProps} from '@/shared/interfaces/common';
import React from 'react';

export default function Banner({heading}: BannerProps) {
  return (
    <div className="relative bg-[url('/images/background.png')] bg-cover bg-center h-[500px]">
      {/* Black overlay */}
      <div className='absolute inset-0 bg-black/50'></div>

      {/* Content */}
      <div className='relative flex items-center justify-center h-full'>
        <Container>
          <h1 className='text-white text-4xl text-center font-bold'>
            {heading}
          </h1>
        </Container>
      </div>
    </div>
  );
}
