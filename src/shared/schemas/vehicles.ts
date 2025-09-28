import * as Yup from 'yup';
import {TranslateFunction} from '@/shared/types/common';
import {
  VEHICLE_CURRENCY_TYPES_VALUES,
  VEHICLE_FUEL_TYPES_VALUES,
  VEHICLE_TRANSMISSION_TYPES_VALUES,
} from '../constants/vehicles';

export const newVehicleSchema = (t: TranslateFunction) =>
  Yup.object({
    make: Yup.string().required(t('vehicleListingValidation.makeRequired')),
    model: Yup.string().required(t('vehicleListingValidation.modelRequired')),
    year: Yup.number()
      .typeError(t('vehicleListingValidation.yearRequired'))
      .required(t('vehicleListingValidation.yearRequired'))
      .min(1900, t('vehicleListingValidation.yearMin'))
      .max(new Date().getFullYear(), t('vehicleListingValidation.yearMax')),
    color: Yup.string().required(t('vehicleListingValidation.colorRequired')),
    mileage: Yup.number().required(
      t('vehicleListingValidation.mileageRequired')
    ),
    description: Yup.string().required(
      t('vehicleListingValidation.descriptionRequired')
    ),
    price: Yup.number()
      .typeError(t('vehicleListingValidation.priceRequired'))
      .required(t('vehicleListingValidation.priceRequired'))
      .min(1, t('vehicleListingValidation.priceMin')),
    currency: Yup.string()
      .oneOf(
        VEHICLE_CURRENCY_TYPES_VALUES,
        t('vehicleListingValidation.currencyInvalid')
      )
      .required(t('vehicleListingValidation.currencyRequired')),
    engineSize: Yup.number().required(
      t('vehicleListingValidation.engineSizeRequired')
    ),
    fuelType: Yup.string()
      .oneOf(
        VEHICLE_FUEL_TYPES_VALUES,
        t('vehicleListingValidation.fuelTypeInvalid')
      )
      .required(t('vehicleListingValidation.fuelTypeRequired')),
    transmission: Yup.string()
      .oneOf(
        VEHICLE_TRANSMISSION_TYPES_VALUES,
        t('vehicleListingValidation.transmissionInvalid')
      )
      .required(t('vehicleListingValidation.transmissionRequired')),
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
      .min(1, t('vehicle:vehicleListingValidation.imageRequired'))
      .default([]) as unknown as Yup.Schema<File[]>,
  });
