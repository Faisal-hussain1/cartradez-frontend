'use client';

import useTranslation from '@/shared/hooks/useTranslation';

export default function BottomBar() {
  const {t} = useTranslation();

  return (
    <div className='bg-primary text-primary-foreground text-sm py-3 border-primary2'>
      <div className='max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 gap-2'>
        <p className='text-center sm:text-left text-white'>
          {t('footer.bottomBar.copyright')}{' '}
          <span className='font-semibold text-white'>
            {t('mainPageTitle.appName')}
          </span>
          . {t('footer.bottomBar.rights')}
        </p>

        <p className='flex items-center space-x-1 text-white'>
          <span>
            Developed by{' '}
            <a href='#' className='hover:underline font-semibold text-white'>
              {t('ourCompanyName')}
            </a>
          </span>
        </p>

        <div className='flex space-x-5 text-white'>
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
