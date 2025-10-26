'use client';

import {Heart} from 'lucide-react';
import useTranslation from '@/shared/hooks/useTranslation';

export default function BottomBar() {
  const {t} = useTranslation();

  return (
    <div className='bg-primary text-primary-foreground text-sm py-3 border-primary2'>
      <div className='max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 gap-2'>
        <p className='text-center sm:text-left text-white/90'>
          {t('footer.bottomBar.copyright')}{' '}
          <span className='font-semibold text-white'>CarTradez</span>.{' '}
          {t('footer.bottomBar.rights')}
        </p>

        <p className='flex items-center space-x-1 text-white/90'>
          <span>
            {t('footer.bottomBar.by')}{' '}
            <a href='#' className='hover:underline font-semibold text-white'>
              Insols
            </a>
          </span>
        </p>

        <div className='flex space-x-5 text-white/90'>
          <a href='#' className='hover:underline'>
            {t('footer.bottomBar.terms')}
          </a>
          <a href='#' className='hover:underline'>
            {t('footer.bottomBar.privacy')}
          </a>
        </div>
      </div>
    </div>
  );
}
