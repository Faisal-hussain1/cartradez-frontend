'use client';

import * as React from 'react';
import Image from 'next/image';
import {Card, CardContent} from '@/shared/components/ui/card';
import {cn} from '@/shared/utils/shadCNUtils';

interface ImageItem {
  key: string;
  url: string;
  _id: string;
  id: string;
}

interface ImageSliderProps {
  images: ImageItem[];
}

export const ImageSlider: React.FC<ImageSliderProps> = ({images}) => {
  const [active, setActive] = React.useState(0);

  if (!images || images.length === 0) {
    return <p className='text-center text-gray-500'>No images available</p>;
  }

  return (
    <div className='w-full'>
      {/* Main Image */}
      <div className='relative w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-lg'>
        <Image
          src={images[active].url}
          alt={`Car image ${active + 1}`}
          fill
          className='object-cover'
          sizes='100vw' // important for sharpness
          priority // makes first image load faster
        />
      </div>

      {/* Thumbnails */}
      <div className='flex gap-3 mt-4 justify-center flex-wrap'>
        {images.map((img, i) => (
          <Card
            key={img.id || i}
            className={cn(
              'cursor-pointer rounded-xl overflow-hidden border-2 transition-all',
              active === i ? 'border-red-500' : 'border-transparent'
            )}
            onClick={() => setActive(i)}
          >
            <CardContent className='p-0'>
              <Image
                src={img.url}
                alt={`Car thumbnail ${i + 1}`}
                width={100} // fixed size keeps thumbnails sharp
                height={50}
                className='object-cover rounded-lg'
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
