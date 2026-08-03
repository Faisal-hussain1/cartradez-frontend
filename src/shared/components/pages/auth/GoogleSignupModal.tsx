'use client';

import {useState} from 'react';
import {createPortal} from 'react-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {completeGoogleSignup} from '@/shared/utils/api';
import TextInput from '@/shared/components/common/inputs/textInput';
import PhoneInputText from '@/shared/components/common/inputs/phoneInput';
import Link from '@/shared/utils/localeLink';
import useTranslation from '@/shared/hooks/useTranslation';
import {googleSignupDetailsSchema} from '@/shared/schemas/auth';

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

type GoogleSignupDetails = {
  phoneNumber: string;
  city: string;
  address: string;
  country: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
};

export default function GoogleSignupModal({
  tempAccessToken,
  googleUserData,
  onClose,
  onComplete,
}: GoogleSignupModalProps) {
  const {ct} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {control, handleSubmit, register, watch} = useForm<GoogleSignupDetails>(
    {
      resolver: yupResolver(ct(googleSignupDetailsSchema)),
      defaultValues: {
        phoneNumber: '',
        city: '',
        address: '',
        country: '',
        acceptTerms: false,
        acceptPrivacy: false,
      },
    }
  );

  const country = watch('country');
  const acceptTerms = watch('acceptTerms');
  const acceptPrivacy = watch('acceptPrivacy');

  const onSubmit = async (details: GoogleSignupDetails) => {
    setLoading(true);
    setError('');

    try {
      const response = await completeGoogleSignup({
        tempAccessToken,
        phoneNumber: details.phoneNumber,
        city: details.city,
        address: details.address,
        country: details.country,
        firstName: googleUserData.firstName,
        lastName: googleUserData.lastName,
        profileImage: googleUserData.profileImage,
        acceptTerms: details.acceptTerms,
        acceptPrivacy: details.acceptPrivacy,
      });

      const completeUser = response?.data?.user || response?.data?.data?.user;

      if (!completeUser) {
        setError('Unable to complete signup. Please try again.');

        return;
      }

      const token = response.data.accessToken;
      localStorage.setItem('accessToken', token);
      document.cookie = `x-auth-token=${token}; path=/; max-age=2592000; samesite=lax`;
      document.cookie = `x-auth-token-cartradez=${token}; path=/; max-age=2592000; samesite=lax`;
      onComplete(completeUser);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to complete signup');
    } finally {
      setLoading(false);
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='w-full max-w-md rounded-xl bg-white p-5 shadow-xl'>
        <h2 className='text-lg font-semibold text-gray-900'>
          Complete your sign up
        </h2>
        <p className='mt-1 text-sm text-gray-600'>
          Enter your phone number and location details.
        </p>

        <form
          className='mt-4 space-y-3'
          onSubmit={(event) => {
            event.stopPropagation();
            void handleSubmit(onSubmit)(event);
          }}
        >
          <TextInput
            control={control}
            name='country'
            label='Country'
            placeholder='Country'
          />
          <PhoneInputText
            control={control}
            name='phoneNumber'
            label='Phone number'
            placeholder='Phone number'
            countryName={country}
          />
          <TextInput
            control={control}
            name='city'
            label='City'
            placeholder='City'
          />
          <TextInput
            control={control}
            name='address'
            label='Address'
            placeholder='Address'
          />
          <label className='flex items-start gap-2 text-sm text-gray-700'>
            <input
              type='checkbox'
              {...register('acceptTerms')}
              className='mt-1'
            />
            <span>
              I agree to{' '}
              <Link
                href='/terms'
                target='_blank'
                className='underline font-medium'
              >
                Terms & Conditions
              </Link>
            </span>
          </label>
          <label className='flex items-start gap-2 text-sm text-gray-700'>
            <input
              type='checkbox'
              {...register('acceptPrivacy')}
              className='mt-1'
            />
            <span>
              I agree to{' '}
              <Link
                href='/privacy'
                target='_blank'
                className='underline font-medium'
              >
                Privacy Policy
              </Link>
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
              type='submit'
              disabled={loading || !acceptTerms || !acceptPrivacy}
              className='bg-[#414279] cursor-pointer rounded-lg px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50'
            >
              {loading ? 'Saving...' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
