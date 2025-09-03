import useTranslation from '@/shared/hooks/useTranslation';
import {ChooseColorFieldProps} from '@/shared/interfaces/dashboard';

export const ChooseColorField = ({
  setIsThemeModalOpen,
  value,
  placeholder,
}: ChooseColorFieldProps) => {
  const {t} = useTranslation();

  return (
    <>
      <label className='text-[14px] mb-[10px] text-secondary font-semibold'>
        {t('addSellerForm.colorTheme')}
      </label>
      <button
        type='button'
        onClick={() => setIsThemeModalOpen(true)}
        className='flex-start w-full cursor-pointer mt-[10px] border-[1px] border-gray10 rounded-[10px] h-[50px]'
      >
        {value && (
          <div
            className={`w-[50px] h-[50px] rounded-[10px]`}
            style={{backgroundColor: value}}
          ></div>
        )}
        <span
          className={`ml-4 text-sm ${value ? 'text-secondary' : 'text-gray90'}`}
        >
          {value || placeholder}
        </span>
      </button>
    </>
  );
};
