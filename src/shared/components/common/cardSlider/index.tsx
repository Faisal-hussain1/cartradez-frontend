'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel';
import { ReactNode, useEffect, useState } from 'react';

interface CommonCarouselProps {
  title?: string;
  titleColor?: string;
  items: any[];
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

  const [responsiveSlides, setResponsiveSlides] = useState(slidesToShow);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      const maxSlides = Math.max(1, slidesToShow);

      if (width < 640) setResponsiveSlides(Math.min(2, maxSlides));
      else if (width < 768) setResponsiveSlides(Math.min(3, maxSlides));
      else if (width < 1024) setResponsiveSlides(Math.min(4, maxSlides));
      else if (width < 1280) setResponsiveSlides(Math.min(5, maxSlides));
      else setResponsiveSlides(Math.min(6, maxSlides));
    };

    updateSlides();
    window.addEventListener('resize', updateSlides);

    return () => window.removeEventListener('resize', updateSlides);
  }, [slidesToShow]);

  const itemWidth = `${100 / responsiveSlides}%`;
  const isSliderNeeded = items.length > responsiveSlides;

  return (
    <div className="relative w-full">
      {title && (
        <h2 className={`text-xl font-semibold mb-3 ${titleColor}`}>
          {title}
        </h2>
      )}

      <div className="relative group">
        <Carousel
          opts={{
            align: 'start',
            slidesToScroll: 1,
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {items.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-2"
                style={{ flex: `0 0 ${itemWidth}` }}
              >
                {renderItem(item, index)}
              </CarouselItem>
            ))}
          </CarouselContent>

          {isShowArrows && isSliderNeeded && (
            <>
              <CarouselPrevious
                className="
                absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2
                bg-white text-primary shadow-md
                hover:bg-primary hover:text-white
                rounded-full h-10 w-10 flex items-center justify-center z-20
              "
              />

              <CarouselNext
                className="
                absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
                bg-white text-primary shadow-md
                hover:bg-primary hover:text-white
                rounded-full h-10 w-10 flex items-center justify-center z-20
              "
              />
            </>
          )}
        </Carousel>
      </div>
    </div>
  );
}
