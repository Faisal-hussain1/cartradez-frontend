import * as Yup from 'yup';
import {TranslateFunction} from '@/shared/types/common';

// ✅ This schema always produces valid ProductPayload
export const newProductSchema = (t: TranslateFunction) =>
  Yup.object({
    title: Yup.string()
      .required(t('listingValidation.titleRequired'))
      .max(100, t('listingValidation.titleMax')),

    description: Yup.string()
      .required(t('listingValidation.descriptionRequired'))
      .max(1000, t('listingValidation.descriptionMax')),

    price: Yup.number()
      .typeError(t('listingValidation.priceRequired'))
      .required(t('listingValidation.priceRequired'))
      .min(1, t('listingValidation.priceMin')),

    condition: Yup.string()
      .oneOf(['new', 'used'], t('listingValidation.conditionInvalid'))
      .required(t('listingValidation.conditionRequired')),

    location: Yup.string().required(t('listingValidation.locationRequired')),

    brand: Yup.string().required(t('listingValidation.brandRequired')),

    model: Yup.string().required(t('listingValidation.modelRequired')),

    year: Yup.number()
      .typeError(t('listingValidation.yearRequired'))
      .required(t('listingValidation.yearRequired'))
      .min(1900, t('listingValidation.yearMin'))
      .max(new Date().getFullYear(), t('listingValidation.yearMax')),

    mileage: Yup.number()
      .typeError(t('listingValidation.mileageRequired'))
      .required(t('listingValidation.mileageRequired'))
      .min(0, t('listingValidation.mileageMin')),

    fuelType: Yup.string()
      .oneOf(
        ['petrol', 'diesel', 'electric', 'hybrid'],
        t('listingValidation.fuelTypeInvalid')
      )
      .required(t('listingValidation.fuelTypeRequired')),

    transmission: Yup.string()
      .oneOf(
        ['manual', 'automatic'],
        t('listingValidation.transmissionInvalid')
      )
      .required(t('listingValidation.transmissionRequired')),

    images: Yup.array()
      .of(
        Yup.mixed<File>()
          .defined()
          .test(
            'fileType',
            t('listingValidation.imageInvalid'),
            (file): file is File => file instanceof File
          )
      )
      .min(1, t('listingValidation.imageRequired'))
      .default([]) as unknown as Yup.Schema<File[]>,
  });
