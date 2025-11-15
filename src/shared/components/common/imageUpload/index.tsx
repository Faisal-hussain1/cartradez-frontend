'use client';

import {useState, DragEvent} from 'react';
import Image from 'next/image';
import {UseFormSetValue, UseFormWatch} from 'react-hook-form';
import {cn} from '@/shared/utils/shadCNUtils';
import {Button} from '@/shared/components/ui/button';
import {Upload} from 'lucide-react'; // nice icon from lucide-react

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
  const [dragActive, setDragActive] = useState(false);
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

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    handleImageUpload(e.dataTransfer.files);
  };

  return (
    <div className='w-full'>
      {/* Dropzone area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        className={cn(
          'border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-all',
          dragActive
            ? 'border-primary/70 bg-primary/5'
            : 'border-gray-300 hover:border-gray-400',
          'cursor-pointer'
        )}
        onClick={() => document.getElementById(`${name}-input`)?.click()}
      >
        <Upload className='w-8 h-8 text-gray-500 mb-3' />
        <p className='font-semibold text-gray-700'>
          Drag and drop images here, or click “Upload” to select
        </p>
        <p className='text-sm text-gray-500 mt-1'>
          Upload photos that best represent your vehicle.
        </p>
        <Button
          type='button'
          className='mt-4'
          onClick={(e) => {
            e.stopPropagation();
            document.getElementById(`${name}-input`)?.click();
          }}
        >
          Upload Images
        </Button>

        <input
          id={`${name}-input`}
          type='file'
          accept='.jpg,.jpeg,.png'
          multiple
          className='hidden'
          onChange={(e) => handleImageUpload(e.target.files)}
        />
      </div>
      {/* 
      {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
      {images.length < min && (
        <p className='text-yellow-600 text-sm mt-1 text-center'>
          Please add at least {min} images.
        </p>
      )} */}

      {/* Preview grid */}
      {images.length > 0 && (
        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-4'>
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
                className='absolute top-1 right-1 bg-black/60 text-white text-xs rounded px-1 cursor-pointer'
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
