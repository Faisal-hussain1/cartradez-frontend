import * as Yup from 'yup';
import {TranslateFunction} from '@/shared/types/common';

export const newVehicleSchema = (t: TranslateFunction) =>
  Yup.object({
    listingType: Yup.string().required('Listing type is required'),
    make: Yup.string().required(t('vehicleListingValidation.makeRequired')),
    model: Yup.string().required(t('vehicleListingValidation.modelRequired')),
    variant: Yup.string(),
    year: Yup.number()
      .typeError(t('vehicleListingValidation.yearRequired'))
      .required(t('vehicleListingValidation.yearRequired'))
      .min(1900, t('vehicleListingValidation.yearMin'))
      .max(2026, t('vehicleListingValidation.yearMax')),
    condition: Yup.string(),
    bodyType: Yup.string(),
    color: Yup.string(),
    mileage: Yup.number(),
    engineSize: Yup.number(),
    transmission: Yup.string(),
    fuelType: Yup.string(),
    driveType: Yup.string(),
    currency: Yup.string().required(
      t('vehicleListingValidation.currencyRequired')
    ),
    price: Yup.number()
      .typeError(t('vehicleListingValidation.priceRequired'))
      .required(t('vehicleListingValidation.priceRequired'))
      .min(2000, t('vehicleListingValidation.priceMin')),

    registrationCity: Yup.string(),
    registrationNumber: Yup.string(),
    registrationYear: Yup.string(),
    numberOfOwners: Yup.string(),
    description: Yup.string(),
    features: Yup.array()
      .of(Yup.string().required()) // every item MUST be string
      .optional() // field itself is optional
      .default([]), // but default is empty array
    images: Yup.array()
      .of(
        Yup.mixed<File>()
          .defined()
          .test(
            'fileType',
            t('vehicle:vehicleListingValidation.imageInvalid'),
            (file): file is File => file instanceof File
          )
      )
      .min(3, t('vehicle:vehicleListingValidation.imagesMin'))
      .max(9, t('vehicle:vehicleListingValidation.imagesMax'))
      .default([]) as unknown as Yup.Schema<File[]>,
  });
