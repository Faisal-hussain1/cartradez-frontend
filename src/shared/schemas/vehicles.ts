import * as Yup from 'yup';
import {TranslateFunction} from '@/shared/types/common';
import {
  VEHICLE_BODY_TYPES_VALUES,
  VEHICLE_CURRENCY_TYPES_VALUES,
  VEHICLE_DRIVE_VALUES,
  VEHICLE_FUEL_TYPES_VALUES,
  VEHICLE_TRANSMISSION_TYPES_VALUES,
} from '../constants/vehicles';

export const newVehicleSchema = (t: TranslateFunction) =>
  Yup.object({
    make: Yup.string().required(t('vehicleListingValidation.makeRequired')),
    model: Yup.string().required(t('vehicleListingValidation.modelRequired')),
    variant: Yup.string(),
    year: Yup.number()
      .typeError(t('vehicleListingValidation.yearRequired'))
      .required(t('vehicleListingValidation.yearRequired'))
      .min(1900, t('vehicleListingValidation.yearMin'))
      .max(2026, t('vehicleListingValidation.yearMax')),
    condition: Yup.string().required(
      t('vehicleListingValidation.conditionRequired')
    ),
    bodyType: Yup.string()
      .required(t('Body type is required')),
    color: Yup.string().required(t('vehicleListingValidation.colorRequired')),
    mileage: Yup.number().required(
      t('vehicleListingValidation.mileageRequired')
    ),
    engineSize: Yup.number().required(
      t('vehicleListingValidation.engineSizeRequired')
    ),
    transmission: Yup.string()
      .oneOf(
        VEHICLE_TRANSMISSION_TYPES_VALUES,
        t('vehicleListingValidation.transmissionInvalid')
      )
      .required(t('vehicleListingValidation.transmissionRequired')),
    fuelType: Yup.string()
      .oneOf(
        VEHICLE_FUEL_TYPES_VALUES,
        t('vehicleListingValidation.fuelTypeInvalid')
      )
      .required(t('vehicleListingValidation.fuelTypeRequired')),
    driveType: Yup.string()
      .required(t('Drive Type is required')),
    currency: Yup.string()
      .oneOf(
        VEHICLE_CURRENCY_TYPES_VALUES,
        t('vehicleListingValidation.currencyInvalid')
      )
      .required(t('vehicleListingValidation.currencyRequired')),
    price: Yup.number()
      .typeError(t('vehicleListingValidation.priceRequired'))
      .required(t('vehicleListingValidation.priceRequired'))
      .min(2000, t('vehicleListingValidation.priceMin')),

    registrationCity: Yup.string().required(
      t('vehicleListingValidation.registrationCityRequired')
    ),
    registrationNumber: Yup.string().required(
      t('vehicleListingValidation.registrationNumberRequired')
    ),
    registrationYear: Yup.number()
      .typeError(t('vehicleListingValidation.registrationYearRequired'))
      .required(t('vehicleListingValidation.registrationYearRequired')),
    numberOfOwners: Yup.number()
      .typeError(t('vehicleListingValidation.numberOfOwnersRequired'))
      .required(t('vehicleListingValidation.numberOfOwnersRequired'))
      .min(1, t('vehicleListingValidation.numberOfOwnersMin')),
    description: Yup.string().required(
      t('vehicleListingValidation.descriptionRequired')
    ),
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
      .min(1, t('vehicle:vehicleListingValidation.imageRequired'))
      .default([]) as unknown as Yup.Schema<File[]>,
  });
