import * as Yup from 'yup';
import {TranslateFunction} from '@/shared/types/common';
import {commonFieldsSchema} from './common';

// Login Schema
export const loginUserSchema = (t: TranslateFunction) =>
  Yup.object().shape({
    email: commonFieldsSchema(t).email,
    password: Yup.string().required(t('Password is required')),
  });

// Registration Schema
export const registerUserSchema = (t: TranslateFunction) =>
  Yup.object().shape({
    email: commonFieldsSchema(t).email,
     password: Yup.string()
    .required(t('Password is required'))
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    ),
    firstName: Yup.string().required(t('First name is required'))
      .min(3, t('First name must be at least 3 characters'))
      .max(255, t('authValidation.firstNameMax')),
      
    lastName: Yup.string().required(t('authValidation.lastNameRequired'))
      .min(3, t('authValidation.lastNameMin'))
      .max(255, t('authValidation.lastNameMax')),
    phoneNumber: Yup.string().required(t('authValidation.phoneRequired'))
      .min(12, t('authValidation.phoneMin')),
      acceptTerms: Yup.boolean()
    .oneOf([true], 'You must accept Terms & Conditions'),

  acceptPrivacy: Yup
    .boolean()
    .oneOf([true], 'You must accept Privacy Policy'),
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
