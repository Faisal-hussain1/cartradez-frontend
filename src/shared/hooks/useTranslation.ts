import {i18nNamespaces} from '@/i18nConfig';
import {
  useTranslation as useI18Translation,
  UseTranslationResponse,
} from 'react-i18next';

type TranslationConstant = string | ((t: (key: any) => any) => any);

const useTranslation = () => {
  const useI18TranslationObj: UseTranslationResponse<string[], undefined> =
    useI18Translation(i18nNamespaces);

  const {t, ...rest} = useI18TranslationObj;

  const ct = (constant: TranslationConstant) => {
    return typeof constant === 'function' ? constant(t) : constant;
  };

  return {
    t,
    ct,
    ...rest,
  };
};

export default useTranslation;
