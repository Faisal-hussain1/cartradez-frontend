import * as Yup from 'yup';
import {TranslateFunction} from '@/shared/types/common';
import {MAXIMUM_PURCHASE_KEYS} from '../constants/payment';
import {commonFieldsSchema} from './common';

export const keysPurchaseSchema = (t: TranslateFunction) =>
  Yup.object().shape({
    numberOfKeys: Yup.number()
      .min(10, t('paymentValidation.numberOfKeysMin'))
      .max(MAXIMUM_PURCHASE_KEYS, t('paymentValidation.numberOfKeysMax'))
      .required(t('paymentValidation.numberOfKeysRequired')),
  });

export const paymentFormSchema = (t: TranslateFunction) =>
  Yup.object().shape({
    email: commonFieldsSchema(t).email,
    name: commonFieldsSchema(t).name,
  });

export const customerFormSchema = (t: TranslateFunction) =>
  Yup.object().shape({
    customerEmail: commonFieldsSchema(t).email,
    customerName: Yup.string()
      .min(3, t('paymentValidation.nameMin'))
      .max(255, t('paymentValidation.nameMax'))
      .required(t('paymentValidation.nameRequired')),
    customerPhoneNo: Yup.string()
      .min(12, t('paymentValidation.phoneMin'))
      .required(t('paymentValidation.phoneRequired')),
  });
