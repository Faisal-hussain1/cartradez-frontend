'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel';
import {ReactNode} from 'react';
import GlobalLoader from '../loaders/GlobalLoader';

interface CommonCarouselProps {
  title?: string;
  titleColor?: string;
  items: any[]; // you can make it generic later
  renderItem: (item: any, index: number) => ReactNode;
  className?: string;
  slidesToShow?: number;
  isShowArrows?: boolean;
}

export function CommonCarousel({
  title,
  titleColor = 'text-primary',
  items,
  renderItem,
  slidesToShow = 4,
  isShowArrows = true,
}: CommonCarouselProps) {
  // Each slide’s width based on count (4 per view = 25%)
  const itemWidth = `${100 / slidesToShow}%`;

  return (
    <div className='relative w-full'>
      {title && (
        <h2 className={`text-xl text-bold ${titleColor} font-semibold mb-3`}>
          {title}
        </h2>
      )}

      <div className='relative group'>
        <Carousel
          opts={{
            align: 'start',
            slidesToScroll: slidesToShow,
          }}
          className='w-full'
        >
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem
                key={index}
                className='pl-4'
                style={{flex: `0 0 ${itemWidth}`}}
              >
                {renderItem(item, index)}
              </CarouselItem>
            ))}
          </CarouselContent>

          {isShowArrows && (
            <>
              <CarouselPrevious
                className='absolute 
              left-0 
              top-1/2 
              -translate-y-1/2 
              -translate-x-1/2 
              bg-white 
              text-primary
              shadow-md 
              hover:bg-primary 
              hover:text-white
              hover:border-primary
              rounded-full 
              h-10 w-10 
              flex items-center justify-center 
              opacity-100 transition 
              z-20'
              />
              <CarouselNext
                className='absolute 
              right-0 
              top-1/2 
              -translate-y-1/2 
              translate-x-1/2 
              bg-white 
              text-primary
              shadow-md 
              hover:bg-primary 
              hover:text-white
              hover:border-primary
              rounded-full 
              h-10 w-10 
              flex items-center justify-center 
              opacity-100 transition 
              z-20'
              />
            </>
          )}
        </Carousel>
      </div>
    </div>
  );
}
