'use client';

import {ChangeEvent} from 'react';
import {usePathname} from 'next/navigation';
import {useTranslation} from 'react-i18next';
import {i18nConfig} from '@/i18nConfig';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';

const LanguageSwitcher = () => {
  const {locales} = i18nConfig;
  const {push, currentLocale} = useLocaleRouter();
  const {i18n} = useTranslation();
  const currentPathname = usePathname(); // Get current pathname

  const handleChangeLocale = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    if (newLocale === currentLocale) return;

    i18n.changeLanguage(newLocale);

    const newPath = `/${newLocale}${currentPathname}`;
    push(newPath);
  };

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <select
        id='locale-select'
        value={currentLocale}
        onChange={handleChangeLocale}
        style={{border: 'none', padding: '5px'}}
      >
        {locales.map((language: string) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
