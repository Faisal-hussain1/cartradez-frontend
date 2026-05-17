import React, {useState} from 'react';
import {postRequest} from '@/shared/utils/requests';
import {API_ENDPOINTS} from '@/shared/constants/apiEndpoints';
import {showToast} from '@/shared/utils/toasts';

const ContactMessageBox = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast({
        type: 'error',
        message: 'Name, email, and message are required.',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await postRequest({
        endpoint: API_ENDPOINTS.PUBLIC.CONTACT,
        payload: formData,
      });

      showToast({
        type: 'success',
        message: response?.data?.message || 'Message sent successfully.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error?.message || 'Failed to send message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Left - Contact Form */}
      <div className='bg-white rounded-2xl shadow p-6 md:p-8'>
        <h2 className='text-lg font-semibold mb-4'>Send us a message</h2>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label className='block text-sm font-medium'>Name</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Your Name'
              className='w-full mt-1 px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
            />
          </div>
          <div>
            <label className='block text-l font-medium'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Your Email'
              className='w-full mt-1 px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
            />
          </div>
          <div>
            <label className='block text-l font-medium'>Phone (Optional)</label>
            <input
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='Your Phone Number'
              className='w-full mt-1 px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
            />
          </div>
          <div>
            <label className='block text-l font-medium'>Message</label>
            <textarea
              name='message'
              value={formData.message}
              onChange={handleChange}
              placeholder='Type your message...'
              rows={5}
              className='w-full mt-1 px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
            ></textarea>
          </div>
          <div>
            <button
              type='submit'
              disabled={isSubmitting}
              className='bg-primary hover:bg-primary/97 text-white font-semibold px-6 py-2 rounded-md shadow cursor-pointer'
            >
              {isSubmitting ? 'Sending...' : 'Submit Now'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactMessageBox;
