// app/contact/page.tsx
'use client';

import React from 'react';
import ContactMessageBox from './ContactMessageBox';
import ContactReachOut from './ContactReachOut';
import ContactFAQs from './ContactFAQs';

export default function ContactPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div
        className='h-[280px] bg-cover bg-center relative'
        style={{
          backgroundImage: "url('/ContactUs.png')", // image in public folder
        }}
      >
        <div className='absolute inset-0 bg-black/40'></div>
      </div>

      <div className='max-w-6xl  px-20 mt-10 text-start'>
        <h1 className='text-4xl md:text-4xl  text-black font-bold'>
          Contact Us
        </h1>
        <p className='text-gray-600 mt-3 text-base md:text-lg'>
          We're here to help. Reach out to us through any of the channels below.
        </p>
      </div>

      <div className='max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Left – Contact Form */}
        <div>
          <ContactMessageBox />
        </div>

        {/* Right – Info + FAQs */}
        <div className='flex flex-col space-y-8'>
          <ContactReachOut />
          <ContactFAQs />
        </div>
      </div>
    </div>
  );
}
