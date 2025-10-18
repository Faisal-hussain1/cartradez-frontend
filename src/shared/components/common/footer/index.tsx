'use client';

import Image from 'next/image';
import {Facebook, Instagram, Linkedin, Twitter} from 'lucide-react';
import BottomBar from '@/shared/components/common/footer/BottomBar';

export default function Footer() {
  return (
    <footer className='bg-white border-t border-gray-200 pt-12'>
      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 pb-10'>
        {/* Logo & Brand */}
        <div className='col-span-1 flex flex-col items-center sm:items-start'>
          <Image
            src='/images/logo-black.png'
            alt='CarTradez Logo'
            width={120}
            height={50}
            className='mb-4'
          />
        </div>

        {/* CarTradez Section */}
        <div>
          <h3 className='font-semibold text-gray-900 mb-4'>CarTradez</h3>
          <ul className='space-y-2 text-sm text-gray-600'>
            <li>
              <a href='#'>About Us</a>
            </li>
            <li>
              <a href='#'>FAQs</a>
            </li>
            <li>
              <a href='#'>Buy & Sell Safety</a>
            </li>
            <li>
              <a href='#'>Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Buy A Car */}
        <div>
          <h3 className='font-semibold text-gray-900 mb-4'>Buy A Car</h3>
          <ul className='space-y-2 text-sm text-gray-600'>
            <li>
              <a href='#'>Browse All Cars</a>
            </li>
            <li>
              <a href='#'>Featured Cars</a>
            </li>
            <li>
              <a href='#'>Managed By CarTradez</a>
            </li>
            <li>
              <a href='#'>Buyer's Guide</a>
            </li>
          </ul>
        </div>

        {/* Sell A Car */}
        <div>
          <h3 className='font-semibold text-gray-900 mb-4'>Sell A Car</h3>
          <ul className='space-y-2 text-sm text-gray-600'>
            <li>
              <a href='#'>Post Your Ad</a>
            </li>
            <li>
              <a href='#'>Pricing Plans</a>
            </li>
            <li>
              <a href='#'>Seller's Guide</a>
            </li>
            <li>
              <a href='#'>Verification Process</a>
            </li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h3 className='font-semibold text-gray-900 mb-4'>Connect With Us</h3>
          <div className='flex space-x-5'>
            <a
              href='#'
              className='text-gray-500 hover:text-[#0B3E77] transition'
            >
              <Facebook size={20} />
            </a>
            <a
              href='#'
              className='text-gray-500 hover:text-[#0B3E77] transition'
            >
              <Instagram size={20} />
            </a>
            <a
              href='#'
              className='text-gray-500 hover:text-[#0B3E77] transition'
            >
              <Twitter size={20} />
            </a>
            <a
              href='#'
              className='text-gray-500 hover:text-[#0B3E77] transition'
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      <hr className='border-gray-200' />

      {/* Bottom Bar */}
      <BottomBar />
    </footer>
  );
}
