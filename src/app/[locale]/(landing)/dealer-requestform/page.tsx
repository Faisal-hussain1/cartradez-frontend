'use client';

import {useForm, SubmitHandler} from 'react-hook-form';
import {useState} from 'react';
import Container from '@/shared/components/common/containers';
import AuthFormContainer from '@/shared/components/common/containers/auth/AuthFormContainer';
import BoxContainer from '@/shared/components/common/containers/boxContainer';
import CustomTextInput from '@/shared/components/common/inputs/CustomTextInput';
import CustomNumberInput from '@/shared/components/common/inputs/CustomNumberInput';
import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import SubmitButton from '@/shared/components/common/buttons/submitButton';
import CustomSelectInput from '@/shared/components/common/inputs/CustomSelectInput';

type DealerPayload = {
  showroomName: string;
  showroomAddress: string;
  experience: number;
};

export default function DealerRequestForm() {
  const {control, handleSubmit, reset} = useForm<DealerPayload>({
    defaultValues: {
      showroomName: '',
      showroomAddress: '',
      experience: 0,
    },
  });

  const onSubmit: SubmitHandler<DealerPayload> =async  (data) => {
    console.log(data)
  //   try {
  //   const res = await fetch(
  //     `http://localhost:3001/api/v1/users/dealer-form`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     }
  //   );

  //   const result = await res.json();

  //   if (!res.ok) {
  //     throw new Error(result?.message || "Something went wrong");
  //   }

  //   console.log("Dealer form submitted:", result);

  //   reset();
  // } catch (error: any) {
  //   console.error("Dealer form error:", error.message);
  // }
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
                      label='National Registration Card No (NRC)'
                      name='nrcNo'
                      placeholder='XXXXXX/XX/X'
                      control={control}
                      isRequired
                    />
                  </div>
                </div>

                <div className='grid grid-cols-12 gap-2 mt-3'>
                  <div className='md:col-span-6 col-span-12'>
                    <CustomTextInput
                      label='Company / Showroom Name'
                      name='showroomName'
                      placeholder='Enter Company Name'
                      control={control}
                      isRequired
                    />
                  </div>

                  <div className='md:col-span-6 col-span-12'>
                    <CustomNumberInput
                      label='Years of Experience'
                      name='experience'
                      placeholder='Enter Experience'
                      control={control}
                      isRequired
                    />
                  </div>
                </div>

                <div className='grid grid-cols-12 gap-2 mt-3'>
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
                  <div className='md:col-span-6 col-span-12'>
                    <CustomTextInput
                      label='Showroom Address'
                      name='showroomAddress'
                      placeholder='Enter Full Address'
                      control={control}
                      isRequired
                    />
                  </div>

                  <div className='md:col-span-6 col-span-12'>
                    <CustomNumberInput
                      label='NTN No'
                      name='ntnNo'
                      placeholder='XXXXXXX'
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
                  <span className='text-primary font-semibold underline cursor-pointer'>
                    Terms & Conditions
                  </span>
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
                    disabled={!agreed}
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
