import {Button} from '@/shared/components/ui/button';
import {MessageSquare} from 'lucide-react';
import React from 'react';

const ContactFAQs = () => {
  return (
    <>
      <div className='w-full bg-white rounded-2xl shadow p-8 space-y-4'>
        <h2 className='text-xl font-bold text-gray-900'>Need Answers Fast</h2>
        <p className='text-gray-600'>
          Don’t wait for an email. Our FAQ section covers everything from
          creating listings to securing safe trades — and it’s just a click
          away.
        </p>

        <Button className='bg-primary hover:bg-primary/97 text-white font-semibold px-6 py-2 rounded-md shadow'>
          <MessageSquare className='w-5 h-5 text-white' />
          Go to FAQs
        </Button>
      </div>
    </>
  );
};

export default ContactFAQs;
