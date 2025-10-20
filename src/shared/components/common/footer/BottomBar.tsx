'use client';

import {Heart} from 'lucide-react';

export default function BottomBar() {
  return (
    <div className='bg-[#0B3E77] text-white text-sm py-3 border-t border-[#144B8D]'>
      <div className='max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 gap-2'>
        {/* Left */}
        <p className='text-center sm:text-left'>
          Copyright © 2025 <span className='font-semibold'>CarTradez</span>.
          All rights reserved.
        </p>

        {/* Center */}
        <p className='flex items-center space-x-1'>
          <span>Developed with</span>
          <Heart size={14} className='text-red-500' />
          <span>
            by{' '}
            <a href='#' className='hover:underline font-semibold'>
              Insols
            </a>
          </span>
        </p>

        {/* Right */}
        <div className='flex space-x-5'>
          <a href='#' className='hover:underline'>
            Terms & Condition
          </a>
          <a href='#' className='hover:underline'>
            Privacy Notice
          </a>
        </div>
      </div>
    </div>
  );
}
