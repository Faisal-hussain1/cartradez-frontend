'use client';

import useTranslation from '@/shared/hooks/useTranslation';
import {getFullYear} from '@/shared/utils/dateUtils';

export default function Footer() {
  const {t} = useTranslation();

  return (
    <footer className='text-xs flex-center text-center'>
      © {getFullYear()} {t('mainPageTitle.appName')}. Built with
      &#10084;&#65039; by Desol Int.
    </footer>
  );
}
