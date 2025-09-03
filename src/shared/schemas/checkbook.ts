import * as Yup from 'yup';
import {TranslateFunction} from '@/shared/types/common';
import {commonFieldsSchema} from './common';

export const newPaymentSchema = (t: TranslateFunction) =>
  Yup.object().shape({
    email: commonFieldsSchema(t).email,
    amount: Yup.number()
      .required(t('checkbookValidation.amountRequired'))
      .min(1, t('checkbookValidation.amountMin')),
    description: Yup.string(),
    name: commonFieldsSchema(t).name,
  });

export const newContactSchema = (t: TranslateFunction) =>
  Yup.object().shape({
    name: commonFieldsSchema(t).name,
    email: commonFieldsSchema(t).email,
  });
