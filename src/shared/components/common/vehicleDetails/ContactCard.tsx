'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components/ui/card';
import {Phone, Send} from 'lucide-react';
import {FaWhatsapp} from 'react-icons/fa'; // ✅ Official WhatsApp icon

export default function ContactCard({phoneNumber}: {phoneNumber?: string}) {
  return (
    <Card className='w-full max-w-sm rounded-xl shadow-sm border border-gray-200 p-3'>
      {/* Header */}
      <CardHeader className='pb-2 px-2'>
        <CardTitle className='text-[16px] font-semibold text-gray-800 leading-[100%]'>
          Ready to buy?{' '}
          <span className='font-semibold text-[16px] leading-[100%]'>
            Contact Now!
          </span>
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className='flex flex-col gap-2 px-2'>
        {/* Call Button */}
        <button className='flex items-center justify-center gap-2 bg-[#0B3E77] hover:bg-[#093360] text-white font-medium py-2.5 rounded-md transition-all text-[14px] leading-[100%]'>
          <Phone className='w-4 h-4' />{' '}
          {/* ✅ Removed py-4 for proper centering */}
          <span>Call {phoneNumber}</span>
        </button>

        {/* WhatsApp + Send Message Buttons */}
        <div className='flex items-center gap-2'>
          <button className='flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5C] text-white font-medium py-2.5 w-1/2 rounded-md transition-all text-[14px] leading-[100%]'>
            <FaWhatsapp className='w-4 h-4' />
            <span>WhatsApp</span>
          </button>

          <button className='flex items-center justify-center gap-2 border-2 border-[#0B3E77] text-[#0B3E77] hover:bg-[#0B3E77] hover:text-white font-medium py-2.5 w-1/2 rounded-md transition-all text-[14px] leading-[100%]'>
            <Send className='w-4 h-4' />
            <span>Send Message</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
