import * as Yup from 'yup';
import {TranslateFunction} from '@/shared/types/common';
import {commonFieldsSchema} from './common';

// Login Schema
export const loginUserSchema = (t: TranslateFunction) =>
  Yup.object().shape({
    email: commonFieldsSchema(t).email,
    password: commonFieldsSchema(t).password,
  });

// Registration Schema
export const registerUserSchema = (t: TranslateFunction) =>
  Yup.object().shape({
    email: commonFieldsSchema(t).email,
    password: commonFieldsSchema(t).password,

    // confirmPassword: commonFieldsSchema(t).confirmPassword,
    firstName: Yup.string()
      .min(1, t('authValidation.firstNameMin'))
      .max(255, t('authValidation.firstNameMax'))
      .required(t('authValidation.firstNameRequired')),
    lastName: Yup.string()
      .min(1, t('authValidation.lastNameMin'))
      .max(255, t('authValidation.lastNameMax'))
      .required(t('authValidation.lastNameRequired')),
    phoneNumber: Yup.string()
      .min(12, t('paymentValidation.phoneMin'))
      .required(t('paymentValidation.phoneRequired')),
  });

// Send Reset Password Link Schema
export const sendResetPasswordLinkSchema = (t: TranslateFunction) =>
  Yup.object().shape({
    email: commonFieldsSchema(t).email,
  });

// Reset Password Schema
export const resetPasswordSchema = (t: TranslateFunction) =>
  Yup.object().shape({
    password: commonFieldsSchema(t).password,
    confirmPassword: commonFieldsSchema(t).confirmPassword,
  });
