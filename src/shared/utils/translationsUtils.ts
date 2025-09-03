import translateFunction from '@/i18n';
import {i18nConfig} from '@/i18nConfig';

const getLocale = () => {
  if (typeof window === 'undefined') {
    const params = new URLSearchParams(globalThis.location?.search || '');

    return params.get('locale') || i18nConfig.defaultLocale;
  }

  return navigator.language || i18nConfig.defaultLocale;
};

const ct = async (constant: ((t: any) => any) | any) => {
  const locale = getLocale();
  const {t} = await translateFunction(locale);

  return typeof constant === 'function' ? constant(t) : constant;
};

const translate = async () => {
  const locale = getLocale();

  return await translateFunction(locale);
};

export const mockEmptyT = () => {
  return 'If you see me, that means you should not use me and should use the actual T, I am just to pass when you need to get value of object and not label';
};

// ----
const translationUtilsValues = async () => {
  const {t, ...rest} = await translate();

  return {ct, t, ...rest};
};

export default translationUtilsValues;
