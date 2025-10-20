'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components/ui/card';
import {Phone, Send} from 'lucide-react';
import {FaWhatsapp} from 'react-icons/fa'; // ✅ Official WhatsApp icon
import PrimaryButton from '../buttons/PrimaryButton';

export default function ContactCard({phoneNumber}: {phoneNumber?: string}) {
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    // Removes any + or spaces
    if (!phoneNumber) return;
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}`, '_blank');
  };

  const handleMessage = () => {
    window.location.href = `sms:${phoneNumber}`;
  };

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
        <PrimaryButton
          styles='hover:bg-transparent hover:text-primary hover:border hover:border-primary'
          onClick={handleCall}
          buttonText={
            <>
              <Phone className='w-4 h-4' />
              <span>Call {phoneNumber}</span>
            </>
          }
        />

        {/* WhatsApp + Send Message Buttons */}
        <div className='flex w-full gap-2'>
          <PrimaryButton
            styles='flex-1 w-1/2 bg-green100 hover:bg-transparent hover:text-green100 hover:border hover:border-green100'
            onClick={handleWhatsApp}
            buttonText={
              <>
                <FaWhatsapp className='w-4 h-4' />
                <span>WhatsApp</span>
              </>
            }
          />

          <PrimaryButton
            styles='flex-1 w-1/2 bg-transparent text-primary border border-primary hover:bg-primary hover:text-white'
            onClick={handleMessage}
            buttonText={
              <>
                <Send className='w-4 h-4' />
                <span>Send Message</span>
              </>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
