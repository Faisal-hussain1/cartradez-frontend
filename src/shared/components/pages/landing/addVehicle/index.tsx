'use client';

import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import SubmitButton from '@/shared/components/common/buttons/submitButton';

import { VehiclePayload } from '@/shared/interfaces/vehicles';
import Container from '@/shared/components/common/containers';
import { vehiclesMutations } from '@/shared/reactQuery';
import useTranslation from '@/shared/hooks/useTranslation';
import { newVehicleSchema } from '@/shared/schemas/vehicles';
import AuthFormContainer from '@/shared/components/common/containers/auth/AuthFormContainer';
import {
  DESCRIPTION_SUGGESTIONS,
  FEATURE_GROUPS_LIST,
  VEHICLE_BODY_TYPES,
  VEHICLE_CONDITIONS,
  VEHICLE_CURRENCY_TYPES,
  VEHICLE_DRIVE,
  VEHICLE_FUEL_TYPES,
  VEHICLE_MAKES,
  VEHICLE_TRANSMISSION_TYPES,
} from '@/shared/constants/vehicles';
import { DescriptionBox } from '@/shared/components/common/descriptionBox';
import BoxContainer from '@/shared/components/common/containers/boxContainer';
import Label from '@/shared/components/common/label';
import { getYearsList } from '@/shared/utils/general';
import CustomSelectInput from '@/shared/components/common/inputs/CustomSelectInput';
import CustomTextInput from '@/shared/components/common/inputs/CustomTextInput';
import CustomNumberInput from '@/shared/components/common/inputs/CustomNumberInput';
import ImageUploadInput from '@/shared/components/common/imageUpload';
import { useState } from 'react';
import { CheckboxList } from '@/shared/components/common/checkboxList';
import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';

export default function AddVehicleForm() {
  const { t } = useTranslation();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const router = useLocaleRouter();

  const { control, handleSubmit, reset, watch, setValue } =
    useForm<VehiclePayload>({
      resolver: yupResolver(newVehicleSchema(t)),
      shouldFocusError: true,
      defaultValues: {
        make: '',
        model: '',
        variant: '',
        year: 0,
        condition: '',
        bodyType: '',
        color: '',
        mileage: 0,
        engineSize: 0,
        transmission: '',
        fuelType: '',
        driveType: '',
        currency: '',
        price: 0,
        registrationCity: '',
        registrationNumber: '',
        registrationYear: 0,
        numberOfOwners: 0,
        features: [],
        images: [],
        description: '',
      },
    });

  const { useAddNewVehicleMutation } = vehiclesMutations();

  const onSuccess = () => {
    router.push('/dash');
    reset();
  };

  const { mutate: executeAddNewVehicleMutation, isPending } =
    useAddNewVehicleMutation({
      callBackFuncs: { onSuccess },
    });

  const onSubmit: SubmitHandler<VehiclePayload> = (data) => {
    const formData = new FormData();

    formData.append('make', data.make);
    formData.append('model', data.model);
    if (data.variant) formData.append('variant', data.variant);
    formData.append('year', data.year.toString());
    formData.append('condition', data.condition);
    formData.append('bodyType', data.bodyType);
    formData.append('color', data.color);
    formData.append('mileage', data.mileage.toString());
    formData.append('engineSize', data.engineSize.toString());
    formData.append('transmission', data.transmission);
    formData.append('fuelType', data.fuelType);
    formData.append('driveType', data.driveType);

    formData.append('currency', data.currency);
    formData.append('price', data.price.toString());

    formData.append('registrationCity', data.registrationCity);
    formData.append('registrationNumber', data.registrationNumber);
    formData.append('registrationYear', data.registrationYear.toString());
    formData.append('numberOfOwners', data.numberOfOwners.toString());

    formData.append('description', data.description);

    if (selectedFeatures.length > 0) {
      selectedFeatures.forEach((feature) =>
        formData.append('features', feature)
      );
    }

    data.images.forEach((file, idx) => {
      formData.append('files', file, file.name || `image-${idx}.jpg`);
    });

    executeAddNewVehicleMutation({ payload: formData });
  };

  /* Scroll to first validation error */
const onError = (errors: FieldErrors<VehiclePayload>) => {
  const firstError = Object.keys(errors)[0];
  if (!firstError) return;

  const el = document.querySelector(
    `[data-field-name="${firstError}"], [name="${firstError}"]`
  ) as HTMLElement | null;

  if (!el) return;

  const y = el.getBoundingClientRect().top + window.pageYOffset - 120;

  window.scrollTo({
    top: y,
    behavior: 'smooth',
  });

  setTimeout(() => {
    const focusable = el.querySelector(
      'input, select, textarea, button, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement | null;

    focusable?.focus();
  }, 300);
};
  

  return (
   <div className="mb-10">
      <div className="w-full">
        <img
          src="/images/home/add-vehicle-banner-image.png"
          alt="Safety Guidelines Banner"
          className="w-full h-40 sm:h-56 md:h-64 lg:h-80 object-cover shadow-glow"
        />
      </div>

      <div className="w-full flex justify-center">
        <Container>
          <div className="w-full sm:w-4/5 max-w-[1200px] mx-auto">
            <AuthFormContainer
              heading="List Your Vehicle"
              handleSubmit={handleSubmit(onSubmit, onError)}
              fromContainerStyles="bg-transparent shadow-none rounded-none"
            >
                {/* Basic Car Information */}
                <BoxContainer
                  heading='Basic Car Information'
                  subHeading='(All fields marked with * are mandatory)'
                >
                  <div className='grid grid-cols-12 gap-2 mt-3'>
                    <div className='md:col-span-6 col-span-12' data-field-name='make'>
  <CustomSelectInput
    label='Make'
    name='make'
    placeholder='Select Makes'
    control={control}
    options={Object.values(VEHICLE_MAKES)}
    isRequired={true}
  />
</div>
                    <div className='md:col-span-6 col-span-12'>
                      <CustomTextInput
                        label='Model'
                        name='model'
                        placeholder='Enter Model'
                        control={control}
                        isRequired={true}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-12 gap-2 mt-3'>
                    <div className='md:col-span-6 col-span-12'>
                      <CustomTextInput
                        label='Variant'
                        name='variant'
                        placeholder='Enter Variant (if applicable)'
                        control={control}
                      />
                    </div>
                     <div className='md:col-span-6 col-span-12' data-field-name='year'>
  <CustomSelectInput
    label='Year'
    name='year'
    placeholder='Select Year'
    control={control}
    options={getYearsList({start: 1900, end: 2026})}
    isRequired={true}
  />
</div>
                  </div>

                  <div className='grid grid-cols-12 gap-2 mt-3'>
                     <div className='md:col-span-6 col-span-12' data-field-name='condition'>
  <CustomSelectInput
    label='Condition'
    name='condition'
    placeholder='Select Condition'
    control={control}
    options={Object.values(VEHICLE_CONDITIONS)}
    isRequired={true}
  />
</div>
                      <div className='md:col-span-6 col-span-12' data-field-name='bodyType'>
  <CustomSelectInput
    label='Body Type'
    name='bodyType'
    placeholder='Select Body Type'
    control={control}
    options={Object.values(VEHICLE_BODY_TYPES)}
    isRequired={true}
  />
</div>
                    </div>

                  <div className='grid grid-cols-12 gap-2 mt-3'>
                    <div className='md:col-span-6 col-span-12'>
                      <CustomTextInput
                        label='Color'
                        name='color'
                        placeholder='Enter Color'
                        control={control}
                        isRequired={true}
                      />
                    </div>
                    <div className='md:col-span-6 col-span-12'>
                      <CustomNumberInput
                        label='Mileage (km)'
                        name='mileage'
                        placeholder='Type Mileage (KM)'
                        control={control}
                        isRequired={true}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-12 gap-2 mt-3'>
                    <div className='md:col-span-6 col-span-12'>
                      <CustomNumberInput
                        label='Engine Capacity (cc)'
                        name='engineSize'
                        placeholder='Type Engine Capacity'
                        control={control}
                        isRequired={true}
                      />
                    </div>
                     <div className='md:col-span-6 col-span-12' data-field-name='transmission'>
  <CustomSelectInput
    label='Transmission'
    name='transmission'
    placeholder='Select Transmission'
    control={control}
    options={Object.values(VEHICLE_TRANSMISSION_TYPES)}
    isRequired={true}
  />
</div>
                  </div>

                  <div className='grid grid-cols-12 gap-2 mt-3'>
                     <div className='md:col-span-6 col-span-12' data-field-name='fuelType'>
  <CustomSelectInput
    label='Fuel Type'
    name='fuelType'
    placeholder='Select Fuel Type'
    control={control}
    options={Object.values(VEHICLE_FUEL_TYPES)}
    isRequired={true}
  />
</div>
                     <div className='md:col-span-6 col-span-12' data-field-name='driveType'>
  <CustomSelectInput
    label='Drive Type'
    name='driveType'
    placeholder='Select Drive Type'
    control={control}
    options={Object.values(VEHICLE_DRIVE)}
    isRequired={true}
  />
</div>
                  </div>
                </BoxContainer>

                {/* Pricing Information */}
                <BoxContainer heading='Pricing Information'>
                  <div className='grid grid-cols-12 gap-2 mt-3'>
                     <div className='md:col-span-6 col-span-12' data-field-name='currency'>
  <CustomSelectInput
    label='Currency'
    name='currency'
    placeholder='Select Currency'
    control={control}
    options={Object.values(VEHICLE_CURRENCY_TYPES)}
    isRequired={true}
  />
</div>
                    <div className='md:col-span-6 col-span-12'>
                      <CustomNumberInput
                        label='Price'
                        name='price'
                        placeholder='Enter Price'
                        control={control}
                        isRequired={true}
                      />
                    </div>
                  </div>
                </BoxContainer>

                {/* Registration & Ownership */}
                <BoxContainer heading='Registration & Ownership'>
                  <div className='grid grid-cols-12 gap-2 mt-3'>
                    <div className='md:col-span-6 col-span-12'>
                      <CustomTextInput
                        label='Registration City'
                        name='registrationCity'
                        placeholder='Enter Registration City'
                        control={control}
                        isRequired={true}
                      />
                    </div>
                     <div className='md:col-span-6 col-span-12' data-field-name='registrationYear'>
  <CustomSelectInput
    label='Registration Year'
    name='registrationYear'
    placeholder='Select Registration Year'
    control={control}
    options={getYearsList({start: 1900, end: 2026})}
    isRequired={true}
  />
</div>
                  </div>

                  <div className='grid grid-cols-12 gap-2 mt-3'>
                    <div className='md:col-span-6 col-span-12'>
                      <CustomTextInput
                        label='Registration Number'
                        name='registrationNumber'
                        placeholder='Enter Registration Number'
                        control={control}
                        isRequired={true}
                      />
                    </div>
                    <div className='md:col-span-6 col-span-12'>
                      <CustomNumberInput
                        label='Number of Owners'
                        name='numberOfOwners'
                        placeholder='Enter Owners'
                        control={control}
                        isRequired={true}
                      />
                    </div>
                  </div>
                </BoxContainer>

                {/* Vehicle Features */}
                <BoxContainer heading='Vehicle Features'>
                  <div className='p-6'>
                    <CheckboxList
                      groups={FEATURE_GROUPS_LIST}
                      selected={selectedFeatures}
                      onChange={setSelectedFeatures}
                    />
                  </div>
                </BoxContainer>

               {/* Upload Images */}
<BoxContainer
  heading="Upload Vehicle Images"
  subHeading="Please upload clear vehicle photos. Minimum 3 images and maximum 9 images are required."
  containerStyles="border-l-primary"
>
  <div className="mt-5 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 md:p-5">
    <div className="mb-4">
      <p className="text-[15px] font-semibold text-gray90">
        Image Upload Guidelines
      </p>

      <p className="mt-1 text-sm text-gray70">
        Upload at least <strong>3 images</strong> and no more than{' '}
        <strong>9 images</strong>. Only <strong>JPEG</strong>,{' '}
        <strong>JPG</strong>, and <strong>PNG</strong> formats are allowed.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
      <div className="rounded-lg bg-white border border-gray-200 p-3 text-center">
        <p className="text-xs text-gray60">Minimum</p>
        <p className="text-lg font-bold text-primary">3 Images</p>
      </div>

      <div className="rounded-lg bg-white border border-gray-200 p-3 text-center">
        <p className="text-xs text-gray60">Maximum</p>
        <p className="text-lg font-bold text-primary">9 Images</p>
      </div>

      <div className="rounded-lg bg-white border border-gray-200 p-3 text-center">
        <p className="text-xs text-gray60">Formats</p>
        <p className="text-lg font-bold text-primary">JPG, JPEG, PNG</p>
      </div>
    </div>

    <ImageUploadInput
      name="images"
      setValue={setValue}
      watch={watch}
    />
  </div>
</BoxContainer>

                {/* Description */}
                <BoxContainer heading='Description'>
                  <div className='mt-3'>
                    <Label text={'Description'} isRequired={true} />
                  </div>
                  <div className='mt-1'>
                    <DescriptionBox
                      name={'description'}
                      control={control}
                      setValue={setValue}
                      watch={watch}
                      suggestions={DESCRIPTION_SUGGESTIONS}
                      placeholder='Describe your car...'
                    />
                  </div>
                </BoxContainer>

                 <div className="flex justify-end">
                <div>
                  <PrimaryButton
                    loading={isPending}
                    buttonText="Cancel"
                    styles="w-[60px] md:w-[80px] bg-white text-primary border-1 border-primary hover:bg-gray-100"
                  />
                  <SubmitButton
                    loading={isPending}
                    buttonText="Submit Now"
                    styles="w-[100px] md:w-[140px] ml-3"
                  />
                </div>
              </div>

            </AuthFormContainer>
          </div>
        </Container>
      </div>
    </div>
  );
}
