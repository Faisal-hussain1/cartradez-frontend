import * as Yup from 'yup';
import {TranslateFunction} from '@/shared/types/common';
import {commonFieldsSchema} from './common';

export const addSellerSchema = (t: TranslateFunction) =>
  Yup.object().shape({
    name: commonFieldsSchema(t).name,
    email: commonFieldsSchema(t).email,
    commissionRate: Yup.number()
      .required(t('sellerValidation.commissionRequired'))
      .min(1, t('sellerValidation.commissionMinDigits'))
      .max(100, t('sellerValidation.commissionMaxDigits')),
    username: Yup.string()
      .required(t('sellerValidation.usernameRequired'))
      .min(3, t('sellerValidation.usernameMinCharacters'))
      .max(20, t('sellerValidation.usernameMaxCharacters'))
      .matches(/^[^#]*$/, t('sellerValidation.usernameNoHash')), // Disallow '#'
    enabledFeatures: Yup.object().shape({
      // For now I only add checkbook but in future there will be stripe and other features if any
      checkbook: Yup.boolean().default(false),
    }),
  });
