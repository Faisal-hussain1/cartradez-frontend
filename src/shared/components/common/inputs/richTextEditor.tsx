'use client';
import {Controller} from 'react-hook-form';
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import {RichTextInputProps} from '@/shared/interfaces/inputs';
import ErrorMessage from './errorMessage';

const ReactQuill = dynamic(() => import('react-quill-new'), {ssr: false});

const RichTextInput = ({
  control,
  name,
  label,
  disabled = false,
  toolbarOptions,
  imagesAllowed = true,
  onFocus,
}: RichTextInputProps) => {
  return (
    <div className='flex flex-col relative w-full'>
      {label && (
        <label className='text-[14px] mb-[10px] text-secondary font-semibold'>
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({field: {onChange, value}, fieldState: {error}}) => {
          const handleChange = (html: string) => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = html;

            if (!imagesAllowed) {
              wrapper.querySelectorAll('img').forEach((img) => img.remove());
            }

            wrapper
              .querySelectorAll('video')
              .forEach((video) => video.remove());

            onChange(wrapper.innerHTML);
          };

          return (
            <>
              <ReactQuill
                theme='snow'
                value={value}
                onChange={handleChange}
                modules={{
                  toolbar: toolbarOptions,
                }}
                onFocus={onFocus}
                readOnly={disabled}
                className={`w-full rounded-[10px] bg-white
                  ${error ? 'border-error focus-visible:ring-error' : 'border-gray-300'}
                  ${disabled ? 'pointer-events-none opacity-50' : ''}
                  [&_.ql-toolbar]:border-0 [&_.ql-container]:border-0 [&_.ql-container]:p-0 [&_.ql-editor]:p-0`}
              />
              {error && <ErrorMessage errorMsg={error.message} />}
            </>
          );
        }}
      />
    </div>
  );
};

export default RichTextInput;
