'use client';

import useTranslation from '@/shared/hooks/useTranslation';
import './ErrorFallback.css';

export const ErrorFallback = ({message}: {message?: string}) => {
  const {t} = useTranslation();
  message = message || t('errorResponse.message');

  return (
    <div className='error-fallback'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width='24'
        height='24'
        fill='currentColor'
        className='error-icon'
      >
        <path d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z' />
      </svg>
      <h2 className='error-title'>{message}</h2>
    </div>
  );
};
