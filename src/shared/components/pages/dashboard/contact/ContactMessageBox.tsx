import React from 'react';

const ContactMessageBox = () => {
  return (
    <>
      {/* Left - Contact Form */}
      <div className='bg-white rounded-2xl shadow p-6 md:p-8'>
        <h2 className='text-lg font-semibold mb-4'>Send us a message</h2>
        <form className='space-y-4'>
          <div>
            <label className='block text-sm font-medium'>Name</label>
            <input
              type='text'
              placeholder='Your Name'
              className='w-full mt-1 px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
            />
          </div>
          <div>
            <label className='block text-l font-medium'>Email</label>
            <input
              type='email'
              placeholder='Your Email'
              className='w-full mt-1 px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
            />
          </div>
          <div>
            <label className='block text-l font-medium'>Phone (Optional)</label>
            <input
              type='tel'
              placeholder='Your Phone Number'
              className='w-full mt-1 px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
            />
          </div>
          <div>
            <label className='block text-l font-medium'>Message</label>
            <textarea
              placeholder='Type your message...'
              rows={5}
              className='w-full mt-1 px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
            ></textarea>
          </div>
          <div>
            <button
              type='submit'
              className='bg-primary hover:bg-blue-950 text-white font-semibold px-6 py-2 rounded-md shadow cursor-pointer'
            >
              Submit Now
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactMessageBox;
