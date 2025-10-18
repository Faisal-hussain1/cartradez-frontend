// shared/components/pages/landing/guidelines.tsx
'use client';
import {PanelProps} from '@/shared/interfaces/vehicles';
import React from 'react';

// 🔹 Panel Component
function Panel({title, items, lightBg = true}: PanelProps) {
  const bgClass = lightBg ? 'bg-blue-50' : 'bg-yellow-50';

  return (
    <div
      className={`flex-1 min-w-[280px] sm:min-w-[320px] md:min-w-[45%] lg:min-w-[48%] p-4 sm:p-6 rounded-2xl shadow-md transition hover:shadow-lg ${bgClass}`}
    >
      <h2 className='text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-blue-900'>
        {title}
      </h2>
      <ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700'>
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// 🔹 Main Guidelines Component
export default function Guidelines() {
  const buyerItems = [
    'Check the vehicle’s details against official records, making sure the engine, chassis, and registration number match.',
    'Before making a payment, always have a look at the vehicle. Never depend just on pictures or videos.',
    'To look for hidden problems, request maintenance data and service histories.',
    'Prices that look too good to be true should be avoided because they typically are.',
    'During the Meeting: Meet the seller in a public, secure setting.',
    'Payment & Documentation: Never transfer funds or make an advance payment without documentation.',
    'After Purchase: Transfer ownership immediately to avoid liabilities.',
  ];

  const sellerItems = [
    'Give truthful details regarding the state of your vehicle; sincerity fosters trust.',
    'Make use of actual, crisp, daylight-shot photographs. Don’t use old or stock photos.',
    'Don’t publicly disclose personal information like your home address or NRC.',
    'During Buyer Interaction: Use the official platform’s messaging first.',
    'At the Meeting: Select a public, secure area to meet.',
    'Payment & Handover: Use traceable payment methods instead of cash when possible.',
    'After the Sale: Submit the ownership transfer immediately.',
  ];

  return (
    <>
      {/* 🔹 Top Banner Image */}
      <div className='w-full mb-6'>
        <img
          src='/images/DisclaimerPic.png'
          alt='Safety Guidelines Banner'
          className='w-full h-40 sm:h-56 md:h-64 lg:h-80 object-cover rounded-2xl shadow'
        />
      </div>

      {/* 🔹 Content Section */}
      <div className='px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto'>
        <h1 className='text-xl sm:text-2xl lg:text-3xl mb-3 font-bold text-blue-900 text-center sm:text-left'>
          Buy & Sell Safety Guidelines (Disclaimer)
        </h1>

        <p className='text-sm sm:text-base text-gray-600 mb-8 leading-relaxed text-center sm:text-left'>
          CarTrader provides a secure platform for buyers and sellers to connect
          directly. While we facilitate the process, all transactions and
          communications take place between users. Please follow the safety
          guidelines below to ensure a transparent, fair, and risk-free
          experience when buying or selling a vehicle.
        </p>

        {/* 🔹 Responsive Panels */}
        <div className='flex flex-col sm:flex-row flex-wrap gap-6 justify-center sm:justify-between'>
          <Panel title='For Buyer' items={buyerItems} lightBg={true} />
          <Panel title='For Seller' items={sellerItems} lightBg={false} />
        </div>
      </div>
    </>
  );
}
