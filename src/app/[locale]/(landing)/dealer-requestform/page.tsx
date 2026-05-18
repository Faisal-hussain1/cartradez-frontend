'use client';

import {useForm, SubmitHandler} from 'react-hook-form';
import {useEffect, useState} from 'react';
import Container from '@/shared/components/common/containers';
import AuthFormContainer from '@/shared/components/common/containers/auth/AuthFormContainer';
import BoxContainer from '@/shared/components/common/containers/boxContainer';
import CustomTextInput from '@/shared/components/common/inputs/CustomTextInput';
import CustomNumberInput from '@/shared/components/common/inputs/CustomNumberInput';
import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import SubmitButton from '@/shared/components/common/buttons/submitButton';
import CustomSelectInput from '@/shared/components/common/inputs/CustomSelectInput';
import { useSelector } from 'react-redux';
import { actions, getCurrentUser } from '@/shared/redux/slices/users';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import { dispatch } from '@/shared/redux/store';
import {showToast} from '@/shared/utils/toasts';
const API_URL=`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;

// type DealerPayload = {
//   showroomName: string;
//   showroomAddress: string;
//   experience: number;
// };

export default function DealerRequestForm() {
  const {control, handleSubmit, reset} = useForm<any>({
    defaultValues: {
      showroomName: '',
      showroomAddress: '',
      experience: 0,
    },
  });
  const user=useSelector(getCurrentUser);
  const router=useLocaleRouter();
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const usedAttempts = Number((user as any)?.requestLimit || 0);
  const maxAttempts = 3;
  const limitReached = usedAttempts >= maxAttempts;

  useEffect(() => {
    if (!token) {
      showToast({
        type: 'error',
        message: 'Please log in to access the dealer request form.',
      });
      router.push('/auth/login');
    }
  }, [token, router]);

 const onSubmit: SubmitHandler<any> = async (data) => {
    if (!token || !(user as any)?._id) {
      showToast({
        type: 'error',
        message: 'Your session has expired. Please log in again.',
      });
      router.push('/auth/login');
      return;
    }

    if (limitReached) {
      showToast({
        type: 'error',
        message:
          'Dealer request limit reached (3/3). You cannot submit the dealer form again.',
      });
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/users/dealer-form/${(user as any)._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            'Authorization':`Bearer ${token}`
          },
          body: JSON.stringify({
            carTypes: data.carTypes,
            experience: data.experience,
            tpin: data.tpin,
            showroomAddress: data.showroomAddress,
            showroomName: data.showroomName,
            socialMedia: data.socialMedia,
          }),
        }
      );

      const result = await res.json();

      if (res.ok && result?.success === true) {
        dispatch(actions.setCurrentUser(result?.updatedUser));
        showToast({type: 'success', message: result?.message || 'Dealer request submitted successfully'});
        reset();
        router.push('/dash');
        return;
      }

      const apiMessage = String(result?.message || '').toLowerCase();
      const readableError =
        apiMessage.includes('invalid user') || apiMessage.includes('invalid user id')
          ? 'Your session has expired. Please log in again.'
          : result?.message || 'Failed to submit dealer request';
      showToast({type: 'error', message: readableError});
    } catch (error: any) {
      showToast({type: 'error', message: error?.message || 'Failed to submit dealer request'});
    }
 };
  const [agreed, setAgreed] = useState(false);

  return (
    <div className='mb-10'>
      {/* Banner */}
      <div className='w-full'>
        <img
          src='/images/home/add-vehicle-banner-image.png'
          alt='Dealer Banner'
          className='w-full h-40 sm:h-56 md:h-64 lg:h-80 object-cover shadow-glow'
        />
      </div>

      <div className='w-full flex justify-center'>
        <Container>
          <div className='w-full sm:w-4/5 max-w-[1200px] mx-auto'>
            <AuthFormContainer
              heading='Become a Dealer Partner'
              handleSubmit={handleSubmit(onSubmit)}
              fromContainerStyles='bg-transparent shadow-none rounded-none'
            >
              {/* Personal Info */}
              {/* <BoxContainer heading='Personal Information'>
                <div className='grid grid-cols-12 gap-2 mt-3'>
                  <div className='md:col-span-6 col-span-12'>
                    <CustomTextInput
                      label='Dealer Name'
                      name='dealerName'
                      placeholder='Enter Your Name'
                      control={control}
                      isRequired
                    />
                  </div>

                  <div className='md:col-span-6 col-span-12'>
                    <CustomTextInput
                      label='Phone Number'
                      name='phone'
                      placeholder='097-XXX-XXXX'
                      control={control}
                      isRequired
                    />
                  </div>
                </div>

                <div className='grid grid-cols-12 gap-2 mt-3'>
                  <div className='md:col-span-6 col-span-12'>
                    <CustomTextInput
                      label='Email'
                      name='email'
                      placeholder='Enter Email'
                      control={control}
                      isRequired
                    />
                  </div>
                     
                  <div className='md:col-span-6 col-span-12'>
                    <CustomTextInput
                      label='City'
                      name='city'
                      placeholder='Enter City'
                      control={control}
                      isRequired
                    />
                  </div>
                </div>
              </BoxContainer> */}

              {/* Business Info */}
              <BoxContainer heading='Business Information'>
                <div className='grid grid-cols-12 gap-2 mt-3'>
                  <div className='md:col-span-6 col-span-12'>
                    <CustomTextInput
                      label='Registered Company / Showroom Name'
                      name='showroomName'
                      placeholder='Enter Company Name'
                      control={control}
                      isRequired
                    />
                  </div>
                  <div className='md:col-span-6 col-span-12'>
                    <CustomTextInput
                      label='TPIN'
                      name='tpin'
                      placeholder='Enter TPIN'
                      control={control}
                      isRequired
                    />
                  </div>
                </div>

                <div className='grid grid-cols-12 gap-2 mt-3'>
                  <div className='md:col-span-6 col-span-12'>
                    <CustomNumberInput
                      label='Years of Experience'
                      name='experience'
                      placeholder='Enter Experience'
                      control={control}
                      isRequired
                    />
                  </div>
                  <div className='md:col-span-6 col-span-12'>
                    <CustomSelectInput
                      label='Types of Cars Sold'
                      name='carTypes'
                      placeholder='Select Type'
                      control={control}
                      options={[
                        {value: 'new', label: 'New'},
                        {value: 'used', label: 'Used'},
                        {value: 'both', label: 'Both'},
                      ]}
                      isRequired
                    />
                  </div>
                </div>

                <div className='grid grid-cols-12 gap-2 mt-3'>
                  <div className='col-span-12'>
                    <CustomTextInput
                      label='Showroom Address'
                      name='showroomAddress'
                      placeholder='Enter Full Address'
                      control={control}
                      isRequired
                    />
                  </div>
                </div>
                <div className='mt-3'>
                  <CustomTextInput
                    label='Dealer Social Media (optional)'
                    name='socialMedia'
                    placeholder='Facebook / Instagram / Website link'
                    control={control}
                  />
                </div>
              </BoxContainer>
              {/* Message */}
              {/* <BoxContainer heading='Additional Information'>
                <div className='mt-3'>
                  <CustomTextInput
                    label='Message'
                    name='message'
                    placeholder='Tell us about your dealership...'
                    control={control}
                  />
                </div>
              </BoxContainer> */}

              {/* Buttons */}
              {/* Terms & Conditions */}
              {limitReached && (
                <div className='mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700'>
                  Dealer request limit reached (3/3). You cannot submit the dealer form again.
                </div>
              )}

              <div className='mt-5 flex items-center'>
                <input
                  type='checkbox'
                  id='terms'
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className='w-5 h-5 accent-primary'
                />
                <label htmlFor='terms' className='ml-2 text-sm'>
                  I agree to the{' '}
                  <a href='/terms' target='_blank' rel='noopener noreferrer' className='text-primary font-semibold underline cursor-pointer'>
                    Terms & Conditions
                  </a>
                </label>
              </div>

              {/* Buttons */}
              <div className='flex justify-end mt-5'>
                <div>
                  <PrimaryButton
                    buttonText='Cancel'
                    styles='w-[80px] bg-white text-primary border border-primary hover:bg-gray-100'
                  />
                  <SubmitButton
                    buttonText='Submit Request'
                    styles='w-[150px] ml-3'
                    disabled={!agreed || limitReached}
                  />
                </div>
              </div>
            </AuthFormContainer>
          </div>
        </Container>
      </div>
    </div>
    
  );
}
