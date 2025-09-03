'use client';

import {useState} from 'react';

import Image from 'next/image';
import {useForm, Controller} from 'react-hook-form';

import SubmitButton from '@/shared/components/common/buttons/submitButton';
import {
  AuthSectionContainer,
  LeftSideContainer,
  RightSideContainer,
} from '@/shared/components/common/containers/auth';
import AuthFormContainer from '@/shared/components/common/containers/auth/AuthFormContainer';
import TextInput from '@/shared/components/common/inputs/textInput';
import Logo from '@/shared/components/common/logo';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/shared/components/ui/select';
import {ProductPayload} from '@/shared/interfaces/products';

export default function AddProductForm() {
  const {control, handleSubmit, setValue, watch} = useForm<ProductPayload>({
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      condition: 'new',
      location: '',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      mileage: 0,
      fuelType: 'petrol',
      transmission: 'manual',
      images: [],
    },
  });

  const images = watch('images');
  const [error, setError] = useState('');

  const onSubmit = ({data}: any) => {
    if (data.images.length === 0) {
      setError('At least 1 image is required');

      return;
    }
  };

  const handleImageUpload = ({files}: any) => {
    if (!files) return;
    const newFiles = Array.from(files);
    const currentImages = watch('images');

    if (currentImages.length + newFiles.length > 9) {
      setError('You can upload a maximum of 9 images');

      return;
    }

    // setValue('images', [...currentImages, ...newFiles]);
    setError('');
  };

  return (
    <AuthSectionContainer>
      <LeftSideContainer>
        <Image
          src='/images/auth/login-image.png'
          alt='product-image'
          width={400}
          height={700}
          className='h-screen fixed w-[30%] object-cover'
        />
      </LeftSideContainer>

      <RightSideContainer>
        <Logo width={200} height={100} />

        <AuthFormContainer
          heading='Add New Product'
          subHeading='Fill in the details below to list your product'
          handleSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            name='title'
            label='Title'
            control={control}
            placeholder='Enter product title'
          />
          <TextInput
            name='description'
            label='Description'
            control={control}
            placeholder='Enter product description'
          />
          <TextInput
            name='price'
            label='Price'
            control={control}
            placeholder='Enter price'
          />
          <Controller
            name='condition'
            control={control}
            render={({field}) => (
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Condition
                </label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select condition' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='new'>New</SelectItem>
                    <SelectItem value='used'>Used</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          />
          <TextInput
            name='location'
            label='Location'
            control={control}
            placeholder='Enter location'
          />
          <TextInput
            name='brand'
            label='Brand'
            control={control}
            placeholder='Enter brand name'
          />
          <TextInput
            name='model'
            label='Model'
            control={control}
            placeholder='Enter model name'
          />
          <TextInput
            name='year'
            label='Year'
            control={control}
            placeholder='Enter year'
          />
          <TextInput
            name='mileage'
            label='Mileage'
            control={control}
            placeholder='Enter mileage'
          />
          <Controller
            name='fuelType'
            control={control}
            render={({field}) => (
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Fuel Type
                </label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select fuel type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='petrol'>Petrol</SelectItem>
                    <SelectItem value='diesel'>Diesel</SelectItem>
                    <SelectItem value='electric'>Electric</SelectItem>
                    <SelectItem value='hybrid'>Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          />
          <Controller
            name='transmission'
            control={control}
            render={({field}) => (
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Transmission
                </label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select transmission' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='manual'>Manual</SelectItem>
                    <SelectItem value='automatic'>Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          />

          {/* Image Upload */}
          <div>
            <label className='block text-sm font-medium mb-1'>
              Upload Images (Max 9)
            </label>
            <input
              type='file'
              accept='image/*'
              multiple
              onChange={(e) => handleImageUpload(e.target.files)}
              className='mb-2'
            />
            {error && <p className='text-red-500 text-sm'>{error}</p>}
            <div className='grid grid-cols-3 gap-2 mt-2'>
              {images?.map((file, idx) => (
                <div
                  key={idx}
                  className='relative w-24 h-24 rounded-lg overflow-hidden'
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`preview-${idx}`}
                    fill
                    className='object-cover'
                  />
                </div>
              ))}
            </div>
          </div>

          <SubmitButton loading={false} buttonText='Add Product' />
        </AuthFormContainer>
      </RightSideContainer>
    </AuthSectionContainer>
  );
}
