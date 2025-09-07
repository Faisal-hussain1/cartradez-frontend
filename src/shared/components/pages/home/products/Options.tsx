'use client';

import {ArrowUpRight} from 'lucide-react';
import {Button} from '@/shared/components/ui/button';

export default function CarOptions() {
  const options = [
    {
      title: 'Are You Looking For a Car ?',
      desc: 'We are committed to providing our customers with exceptional service.',
      bg: 'bg-blue-50',
      btn: 'bg-primary hover:bg-blue-700 text-white',
      icon: '/images/home/buyCar.png', // replace with your actual SVG
    },
    {
      title: 'Do You Want to Sell a Car ?',
      desc: 'We are committed to providing our customers with exceptional service.',
      bg: 'bg-pink-50',
      btn: 'bg-primary2 hover:bg-gray-900 text-white',
      icon: '/images/home/sellCar.png', // replace with your actual SVG
    },
  ];

  return (
    <section className='mx-auto py-12 grid grid-cols-1 md:grid-cols-2 gap-6'>
      {options.map((item, index) => (
        <div
          key={index}
          className={`${item.bg} rounded-2xl p-8 flex flex-col justify-between shadow-sm`}
        >
          <div>
            <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
            <p className='text-gray-600 mb-6'>{item.desc}</p>
            <Button className={`${item.btn}`}>
              Get Started <ArrowUpRight className='ml-2 h-4 w-4' />
            </Button>
          </div>
          <div className='mt-6 flex justify-end'>
            <img src={item.icon} alt='icon' className='w-16 h-16' />
          </div>
        </div>
      ))}
    </section>
  );
}
