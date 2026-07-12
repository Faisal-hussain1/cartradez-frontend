import React from 'react';
import {IconProps} from '@/shared/interfaces/common';

export default function FacebookIcon({size = 20, color, ...props}: IconProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox='0 0 320 512'
      fill={color || 'currentColor'}
      aria-hidden='true'
      focusable='false'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M279.14 288l14.22-92.66h-88.91V135.2c0-25.35 12.42-50.06 52.24-50.06H297V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z' />
    </svg>
  );
}
