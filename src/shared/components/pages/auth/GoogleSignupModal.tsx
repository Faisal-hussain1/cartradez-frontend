'use client';

import {useState} from 'react';
import {completeGoogleSignup} from '@/shared/utils/api';

type GoogleUserData = {
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
};

type GoogleSignupModalProps = {
  tempAccessToken: string;
  googleUserData: GoogleUserData;
  onClose: () => void;
  onComplete: (user: any) => void;
};

export default function GoogleSignupModal({
  tempAccessToken,
  googleUserData,
  onClose,
  onComplete,
}: GoogleSignupModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  const onSubmit = async () => {
    if (!phoneNumber || !city || !address || !country) {
      setError('Please fill all fields.');
      return;
    }

    if (!acceptTerms || !acceptPrivacy) {
      setError('Please accept Terms & Conditions and Privacy Policy.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await completeGoogleSignup({
        tempAccessToken,
        phoneNumber,
        city,
        address,
        country,
        firstName: googleUserData.firstName,
        lastName: googleUserData.lastName,
        profileImage: googleUserData.profileImage,
        acceptTerms,
        acceptPrivacy,
      });

      const completeUser = response?.data?.user || response?.data?.data?.user;

      if (!completeUser) {
        setError('Unable to complete signup. Please try again.');
        return;
      }

      localStorage.setItem('accessToken', response.data.accessToken);
      onComplete(completeUser);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to complete signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='w-full max-w-md rounded-xl bg-white p-5 shadow-xl'>
        <h2 className='text-lg font-semibold text-gray-900'>Complete your sign up</h2>
        <p className='mt-1 text-sm text-gray-600'>
          Enter your phone number and location details.
        </p>

        <div className='mt-4 space-y-3'>
          <input
            type='text'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder='Phone number'
            className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400'
          />
          <input
            type='text'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder='Country'
            className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400'
          />
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='City'
            className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400'
          />
          <input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Address'
            className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400'
          />
          <label className='flex items-start gap-2 text-sm text-gray-700'>
            <input
              type='checkbox'
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className='mt-1'
            />
            <span>
              I agree to{' '}
              <a href='/terms' target='_blank' className='underline font-medium'>
                Terms & Conditions
              </a>
            </span>
          </label>
          <label className='flex items-start gap-2 text-sm text-gray-700'>
            <input
              type='checkbox'
              checked={acceptPrivacy}
              onChange={(e) => setAcceptPrivacy(e.target.checked)}
              className='mt-1'
            />
            <span>
              I agree to{' '}
              <a href='/privacy' target='_blank' className='underline font-medium'>
                Privacy Policy
              </a>
            </span>
          </label>

          {error ? <p className='text-sm text-red-600'>{error}</p> : null}

          <div className='mt-2 flex items-center justify-end gap-2'>
            <button
              type='button'
              onClick={onClose}
              className='rounded-lg cursor-pointer border border-gray-300 px-4 py-2 text-sm text-gray-700'
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type='button'
              onClick={onSubmit}
              disabled={loading}
              className='bg-[#414279] cursor-pointer rounded-lg px-4 py-2 text-sm text-white disabled:opacity-50'
            >
              {loading ? 'Saving...' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
