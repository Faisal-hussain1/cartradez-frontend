'use client';

import {useState} from 'react';
import Image from 'next/image';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import SubmitButton from '@/shared/components/common/buttons/submitButton';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/shared/components/ui/select';
import {ProductPayload} from '@/shared/interfaces/products';
import Container from '@/shared/components/common/containers';
import {productsMutations} from '@/shared/reactQuery';
import useTranslation from '@/shared/hooks/useTranslation';
import {newProductSchema} from '@/shared/schemas/products';
import TextInput from '@/shared/components/common/inputs/textInput';
import Logo from '@/shared/components/common/logo';
import AuthFormContainer from '@/shared/components/common/containers/auth/AuthFormContainer';

export default function AddProductForm() {
  const {t} = useTranslation();

  const {control, handleSubmit, reset, watch, setValue} =
    useForm<ProductPayload>({
      resolver: yupResolver(newProductSchema(t)),
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

  const {useAddNewProductMutation} = productsMutations();

  const onSuccess = () => {
    reset();
  };

  const {mutate: executeAddNewProductMutation, isPending} =
    useAddNewProductMutation({
      callBackFuncs: {onSuccess},
    });

  // ✅ Build FormData for API (backend expects `files`)
  const onSubmit: SubmitHandler<ProductPayload> = (data) => {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('condition', data.condition);
    formData.append('location', data.location);
    formData.append('brand', data.brand);
    formData.append('model', data.model);
    formData.append('year', data.year.toString());
    formData.append('mileage', data.mileage.toString());
    formData.append('fuelType', data.fuelType);
    formData.append('transmission', data.transmission);

    formData.append('color', 'red');

    // 👇 use "files" to match multer backend
    data.images.forEach((file, idx) => {
      formData.append('files', file, file.name || `image-${idx}.jpg`);
    });

    executeAddNewProductMutation({payload: formData});
  };

  // Image upload handler
  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    const currentImages = watch('images');

    if (currentImages.length + newFiles.length > 9) {
      setError('You can upload a maximum of 9 images');

      return;
    }

    setValue('images', [...currentImages, ...newFiles]);
    setError('');
  };

  return (
    <div className='w-full flex justify-center'>
      <Container>
        <div className='flex justify-center'>
          <Logo width={200} height={100} />
        </div>

        <AuthFormContainer
          heading='Add New Product'
          subHeading='Fill in the details below to list your product'
          handleSubmit={handleSubmit(onSubmit)}
        >
          {/* Text Inputs */}
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

          {/* Condition Select */}
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

          {/* Fuel Type */}
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

          {/* Transmission */}
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

          <SubmitButton loading={isPending} buttonText='Add Product' />
        </AuthFormContainer>
      </Container>
    </div>
  );
}
