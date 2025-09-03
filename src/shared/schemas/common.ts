import * as Yup from 'yup';
import {TranslateFunction} from '@/shared/types/common';

export const commonFieldsSchema = (t: TranslateFunction) => ({
  email: Yup.string()
    .email(t('authValidation.emailInvalid'))
    .required(t('authValidation.emailRequired')),
  password: Yup.string()
    .required(t('authValidation.passwordRequired'))
    .min(8, t('authValidation.passwordMin'))
    .matches(/[A-Z]/, t('authValidation.passwordUppercase')),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password') as unknown as string, undefined],
      t('authValidation.passwordsMustMatch')
    )
    .required(t('authValidation.confirmPasswordRequired')),
  name: Yup.string()
    .required(t('authValidation.nameRequired'))
    .min(3, t('authValidation.nameMinCharacters'))
    .max(50, t('authValidation.nameMaxCharacters'))
    .matches(/^[a-zA-Z\s]*$/, t('authValidation.nameRegex')),
});
