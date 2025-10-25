'use client';
import React from 'react';
import useTranslation from '@/shared/hooks/useTranslation';
import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {ROOT_ROUTE} from '@/shared/constants/PATHS';

export default function AboutUs() {
  const router = useLocaleRouter();
  const {t, ct} = useTranslation();

  return (
    <div className='flex flex-col min-h-screen px-6 py-12 bg-white text-gray-800'>
      <h1 className='text-4xl md:text-5xl font-bold text-black mb-10 text-left'>
        {t('title')}
      </h1>

      <div className='flex flex-col items-center'>
        {/* --- Mission Section --- */}
        <div className='max-w-4xl w-full mb-8'>
          <div className='bg-white border border-gray-200 rounded-2xl shadow-sm p-6 text-left'>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>
              {t('missionTitle')}
            </h2>
            <p className='text-gray-700 leading-relaxed'>
              {t('missionDescription')}
            </p>
          </div>
        </div>

        {/* --- Vision Section --- */}
        <div className='max-w-4xl w-full mb-12'>
          <div className='bg-white border border-gray-200 rounded-2xl shadow-sm p-6 text-left'>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>
              {t('visionTitle')}
            </h2>
            <p className='text-gray-700 leading-relaxed'>
              {t('visionDescription')}
            </p>
          </div>
        </div>

        {/* --- Support Section --- */}
        <div className='text-center'>
          <h3 className='text-2xl font-semibold text-gray-900 mb-2'>
            {t('supportTitle')}
          </h3>
          <p className='text-gray-600 mb-6'>{t('supportDescription')}</p>

          <div className='flex flex-wrap gap-4 justify-center'>
            <PrimaryButton
              buttonText={t('contactSupport')}
              onClick={() => router.push('/support')}
            />
            <button
              onClick={() => router.push('/faq')}
              className='px-5 py-2.5 rounded-lg border border-primary text-primary font-medium hover:bg-primary hover:text-white transition'
            >
              {t('readFAQs')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
