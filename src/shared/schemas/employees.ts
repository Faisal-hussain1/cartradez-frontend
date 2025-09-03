import * as Yup from 'yup';
import {commonFieldsSchema} from './common';
import {TranslateFunction} from '@/shared/types/common';

export const addEmployeeSchema = (t: TranslateFunction) =>
  Yup.object().shape({
    name: commonFieldsSchema(t).name,
    email: commonFieldsSchema(t).email,
    businessIds: Yup.array()
      .of(Yup.string())
      .min(1, t('employeeValidation.atLeastOneBusinessRequired')),
  });
