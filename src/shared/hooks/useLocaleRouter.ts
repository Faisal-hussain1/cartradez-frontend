'use client';

import {useRouter} from 'next/navigation';
import {useTranslation} from 'react-i18next';

const useLocaleRouter = () => {
  const router = useRouter();
  const {i18n} = useTranslation();
  const currentLocale = i18n.language;

  const push = (url: string, options?: {scroll?: boolean}) => {
    if (options) {
      router.push(url, options);
    } else {
      router.push(url);
    }
  };

  const replace = (url: string, refresh = false) => {
    router.replace(url);
    if (refresh) router.refresh();
  };

  return {...router, push, replace, currentLocale};
};

export default useLocaleRouter;
