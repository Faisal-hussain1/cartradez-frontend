'use client';

import {useState} from 'react';
import Image from 'next/image';
import {UseFormSetValue, UseFormWatch} from 'react-hook-form';
import {cn} from '@/shared/utils/shadCNUtils';
import {Button} from '@/shared/components/ui/button'; // ✅ using your shadcn button

interface ImageUploadInputProps {
  name: string;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  min?: number;
  max?: number;
}

export default function ImageUploadInput({
  name,
  setValue,
  watch,
  min = 3,
  max = 9,
}: ImageUploadInputProps) {
  const [error, setError] = useState('');
  const images: File[] = watch(name) || [];

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);

    if (images.length + newFiles.length > max) {
      setError(`You can upload a maximum of ${max} images`);

      return;
    }

    setValue(name, [...images, ...newFiles], {shouldValidate: true});
    setError('');
  };

  const handleRemoveImage = (idx: number) => {
    const updated = images.filter((_, i) => i !== idx);
    setValue(name, updated, {shouldValidate: true});
  };

  return (
    <div
      className={cn(
        'border-2 border-dashed rounded-md p-4 flex justify-center',
        images.length <= 0
          ? 'border-[var(--error-light)] bg-[var(--error-light)]/10'
          : 'border-[var(--success-light)] bg-[var(--success-light)]/10'
      )}
    >
      <div className='w-full'>
        {/* <label className='block text-sm font-medium mb-2'>
          Upload between{' '}
          <span className='font-semibold'>
            {min}–{max}
          </span>{' '}
          images
          <span className='block text-xs text-gray-500'>
            Supported formats: JPEG, JPG, PNG
          </span>
        </label> */}

        {/* Hidden file input */}
        <input
          id={`${name}-input`}
          type='file'
          accept='.jpg,.jpeg,.png'
          multiple
          className='hidden'
          onChange={(e) => handleImageUpload(e.target.files)}
        />

        {/* Styled button that triggers input */}
        <Button
          type='button'
          onClick={() => document.getElementById(`${name}-input`)?.click()}
          className='bg-primary text-white hover:bg-primary/90'
        >
          + Upload Images
        </Button>

        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

        {images.length < min && (
          <p className='text-yellow-600 text-sm mt-1 text-center'>
            Please add at least {min} images.
          </p>
        )}

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-3 gap-2 mt-4'>
          {images.map((file, idx) => (
            <div
              key={idx}
              className='relative aspect-[4/3] w-full rounded-lg overflow-hidden border'
            >
              <Image
                src={URL.createObjectURL(file)}
                alt={`preview-${idx}`}
                fill
                className='object-cover'
              />
              <button
                type='button'
                onClick={() => handleRemoveImage(idx)}
                className='absolute top-1 right-1 bg-black/60 text-white text-xs rounded px-1'
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
