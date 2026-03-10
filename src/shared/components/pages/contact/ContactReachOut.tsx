import {Clock, Mail, MapPin, Phone} from 'lucide-react';
import React from 'react';

const ContactReachOut = () => {
  return (
    <>
      <div className='w-full bg-white rounded-2xl shadow p-8 space-y-8'>
        <h2 className='text-lg font-semibold mb-4'>Reach Out to Us</h2>

        <div className='grid grid-cols-1 sm:grid-cols2 gap-4'>
          {/* Phone */}
          <div className='flex items-start space-x-3 border border-gray-100 rounded-xl p-5 shadow-sm'>
            <Phone className='w-6 h-6 text-black-600' />
            <div>
              <h3 className='block text-l font-medium'>Phone</h3>
              <p className='text-gray-600 cursor-pointer'>+260 977 123 456</p>
            </div>
          </div>

          {/* Email */}
          <div className='flex items-start space-x-3  border-gray-100 rounded-xl p-5 shadow-sm'>
            <Mail className='w-10 h-6 text-black-600' />
            <div>
              <h3 className='block text-l font-medium'>Email</h3>
              <p className='text-gray-600 cursor-pointer'>
                Cartradez@gmail.com
              </p>
            </div>
          </div>

          {/* Visit Us */}
          <div className='flex items-start space-x-3 border border-gray-100 rounded-xl p-5 shadow-sm'>
            <MapPin className='w-6 h-6 text-black-600' />
            <div>
              <h3 className='block text-l font-medium'>Visit Us</h3>
              <p className='text-gray-600 cursor-pointer'>
                123 Main Street, Lusaka, Zambia
              </p>
            </div>
          </div>

          {/* Visiting Hours */}
          <div className='flex items-start space-x-3 border border-gray-100 rounded-xl p-5 shadow-sm'>
            <Clock className='w-6 h-6 text-black-600' />
            <div>
              <h3 className='block text-l font-medium'>Visiting Hours</h3>
              <p className='text-gray-600'>09:00 - 17:00</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactReachOut;
