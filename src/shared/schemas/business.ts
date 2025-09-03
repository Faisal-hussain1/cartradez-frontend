import * as Yup from 'yup';
import {TranslateFunction} from '@/shared/types/common';

export const BusinessDetailsFormSchema = (t: TranslateFunction) =>
  Yup.object().shape({
    name: Yup.string()
      .required(t('businessValidation.nameRequired'))
      .min(3)
      .max(50),
    email: Yup.string().email(t('businessValidation.emailInvalid')),
    themeColor: Yup.string()
      .matches(/^#([0-9A-Fa-f]{6})$/, t('businessValidation.invalidThemeColor'))
      .nullable()
      .transform((value, originalValue) =>
        originalValue === '' ? null : value
      ),
    slug: Yup.string()
      .required('Slug is required')
      .matches(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Slug must be lowercase, contain no spaces, and only use letters, numbers, and hyphens (no leading, trailing, or consecutive hyphens)'
      ),
  });

export const ManageSellerBusiness = (t: TranslateFunction) => {
  return Yup.object().shape({
    maxBusinesses: Yup.number()
      .typeError(t('typeErrors.number'))
      .required(t('manageSellerBusinesses.maxBusinessesRequired'))
      .min(1, t('manageSellerBusinesses.maxBusinessesMinDigits'))
      .max(100, t('manageSellerBusinesses.maxBusinessesMaxDigits')),
  });
};
