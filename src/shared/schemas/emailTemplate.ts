import * as Yup from 'yup';
import {TranslateFunction} from '@/shared/types/common';

export const emailTemplateSchema = (t: TranslateFunction) =>
  Yup.object().shape({
    description: Yup.string()
      .min(50, t('emailTemplateValidation.descriptionMin'))
      .required(t('emailTemplateValidation.descriptionRequired')),
    subject: Yup.string()
      .min(3, t('emailTemplateValidation.subjectMin'))
      .required(t('emailTemplateValidation.subjectRequired')),
  });
