import {ChangeEvent, useEffect} from 'react';
import Image from 'next/image';
import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import useTranslation from '@/shared/hooks/useTranslation';
import {ProfileImageUploadProps} from '@/shared/interfaces/dashboard';
import {ALLOWED_FILE_TYPES} from '@/shared/constants/general';
import {showToast} from '@/shared/utils/toasts';

const ImageUpload = ({
  setIsCropModalOpen,
  setImagePreview,
  setCrop,
  imagePreview,
  setFile,
  setIsProfileImageRemoved,
}: ProfileImageUploadProps) => {
  const {t} = useTranslation();

  // Cleanup blob URL from memory when component unmounts or imagePreview changes
  useEffect(() => {
    return () => {
      if (
        imagePreview &&
        typeof imagePreview === 'string' &&
        imagePreview.startsWith('blob:')
      ) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const removeLogo = () => {
    setImagePreview('/images/default-seller-logo.png');
    setIsProfileImageRemoved(true);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      showToast({
        type: 'error',
        message: t('commonContent.invalidFileFormat'),
      });

      return;
    }

    setIsCropModalOpen(true);
    setFile(file);

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target?.result) {
        setImagePreview(event.target.result as string);
        setCrop({unit: 'px', x: 0, y: 0, width: 50, height: 50});
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='flex-col-center gap-[10px]'>
      <input
        type='file'
        id='upload-dp'
        className='hidden'
        accept='.jpg, .jpeg, .png'
        onChange={handleOnChange}
      />
      <div className='w-[115px] h-[115px] rounded-[10px] overflow-hidden'>
        <Image src={imagePreview} alt='seller-logo' width={115} height={115} />
      </div>

      <label
        className='w-[115px] cursor-pointer h-10 rounded-[8px] text-white bg-primary text-sm flex-center'
        htmlFor='upload-dp'
      >
        {t('buttons.updateLogo')}
      </label>
      <PrimaryButton
        buttonText={t('buttons.removeLogo')}
        onClick={removeLogo}
        styles='w-[115px] h-5 underline text-secondary'
        variant='link'
      />
    </div>
  );
};

export default ImageUpload;
