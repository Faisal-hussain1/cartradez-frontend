import * as Yup from 'yup';
import {TranslateFunction} from '@/shared/types/common';
import {commonFieldsSchema} from './common';

export const personalDetailsSchema = (t: TranslateFunction) =>
  Yup.object().shape({
    name: commonFieldsSchema(t).name,
    email: commonFieldsSchema(t).email,
  });

export const changePasswordSchema = (t: TranslateFunction) =>
  Yup.object().shape({
    currentPassword: commonFieldsSchema(t).password,
    newPassword: commonFieldsSchema(t).password.test(
      'not-same-as-current',
      t('authValidation.newPasswordMustBeDifferent'),
      function (value) {
        const {currentPassword} = this.parent;

        return value !== currentPassword;
      }
    ),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref('newPassword') as unknown as string, undefined],
        t('authValidation.passwordsMustMatch')
      )
      .required(t('authValidation.confirmPasswordRequired')),
  });
