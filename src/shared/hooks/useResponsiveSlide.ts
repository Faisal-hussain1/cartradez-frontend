'use client';

import {useEffect, useState} from 'react';

export function useResponsiveSlides() {
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    function updateSlides() {
      const width = window.innerWidth;

      if (width < 640)
        setSlidesToShow(1); // sm
      else if (width < 1024)
        setSlidesToShow(2); // md
      else setSlidesToShow(4); // lg+
    }

    updateSlides();
    window.addEventListener('resize', updateSlides);

    return () => window.removeEventListener('resize', updateSlides);
  }, []);

  return slidesToShow;
}
