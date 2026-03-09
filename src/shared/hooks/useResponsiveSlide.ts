'use client';

import {useEffect, useState} from 'react';

export function useResponsiveSlides({
  baseSlides = 5,
}: {baseSlides?: number} = {}) {
  const [slidesToShow, setSlidesToShow] = useState(baseSlides);

  useEffect(() => {
    function updateSlides() {
      const width = window.innerWidth;

      if (width < 640) {
        setSlidesToShow(Math.min(1, baseSlides)); // phones
      } else if (width < 1024) {
        setSlidesToShow(Math.min(2, baseSlides)); // tablets
      } else {
        setSlidesToShow(baseSlides); // desktops
      }
    }

    updateSlides();
    window.addEventListener('resize', updateSlides);

    return () => window.removeEventListener('resize', updateSlides);
  }, [baseSlides]);

  return slidesToShow;
}
