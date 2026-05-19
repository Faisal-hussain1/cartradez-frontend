'use client';

import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import SubmitButton from '@/shared/components/common/buttons/submitButton';

import { VehiclePayload } from '@/shared/interfaces/vehicles';
import Container from '@/shared/components/common/containers';
import { vehiclesMutations } from '@/shared/reactQuery';
import { vehiclesQueries } from '@/shared/reactQuery';
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
import { showToast } from '@/shared/utils/toasts';
import { getCurrentUser, getUserRole } from '@/shared/redux/slices/users';

const MAX_TOTAL_UPLOAD_SIZE_BYTES = 8 * 1024 * 1024;
const MAX_SINGLE_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;
const LISTING_TYPE_OPTIONS = [
  { value: 'premium', label: 'Premium' },
  { value: 'quick sell', label: 'Quick Sell' },
  { value: 'standard', label: 'Standard' },
];

const USER_MONTHLY_LIMITS: Record<string, number> = {
  premium: 1,
  'quick sell': 1,
  standard: 1,
};

const DEALER_MONTHLY_LIMITS: Record<string, number> = {
  premium: 2,
  'quick sell': 3,
  standard: 5,
};

export default function AddVehicleForm() {
  const { t } = useTranslation();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const router = useLocaleRouter();
  const currentUser: any = useSelector(getCurrentUser);
  const role = useSelector(getUserRole);
  const isAdmin = role === 'admin';
  const isDealer = role === 'dealer';
  const shouldShowMonthlyUsage = !isAdmin;
  const monthlyLimits = isDealer ? DEALER_MONTHLY_LIMITS : USER_MONTHLY_LIMITS;

  const { control, handleSubmit, reset, watch, setValue } =
    useForm<VehiclePayload>({
      resolver: yupResolver(newVehicleSchema(t)),
      shouldFocusError: true,
      defaultValues: {
        listingType: '',
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
        price: '' as unknown as number,
        registrationCity: '',
        registrationNumber: '',
        registrationYear: '',
        numberOfOwners: '',
        features: [],
        images: [],
        description: '',
      },
    });
  const { useFetchVehiclesByUserId } = vehiclesQueries();
  const { data: myVehiclesData, isLoading: isVehiclesLoading } =
    useFetchVehiclesByUserId({
      params: {
        userId: shouldShowMonthlyUsage ? currentUser?._id || '' : '',
        page: 1,
        limit: 500,
      },
    });

  const monthlyUsageByType = useMemo(() => {
    if (!shouldShowMonthlyUsage) {
      return {
        premium: 0,
        'quick sell': 0,
        standard: 0,
      };
    }

    const usage: Record<string, number> = {
      premium: 0,
      'quick sell': 0,
      standard: 0,
    };

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const vehicles = myVehiclesData?.vehicles || [];

    vehicles.forEach((vehicle: any) => {
      const listingType = String(vehicle?.listingType || '').toLowerCase().trim();
      if (!usage.hasOwnProperty(listingType)) return;

      const createdAt = vehicle?.createdAt;
      if (!createdAt) return;

      const createdDate = new Date(createdAt);
      if (Number.isNaN(createdDate.getTime())) return;

      if (createdDate.getFullYear() === year && createdDate.getMonth() === month) {
        usage[listingType] += 1;
      }
    });

    return usage;
  }, [myVehiclesData?.vehicles, shouldShowMonthlyUsage]);

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
    const selectedListingType = String(data.listingType || '').toLowerCase().trim();
    const allowedForType = monthlyLimits[selectedListingType] || 0;
    const usedForType = monthlyUsageByType[selectedListingType] || 0;

    if (!selectedListingType) {
      showToast({
        type: 'error',
        message: 'Please select a valid listing type.',
      });
      return;
    }

    if (!isAdmin) {
      if (!allowedForType) {
        showToast({
          type: 'error',
          message: 'Please select a valid listing type.',
        });
        return;
      }

      if (usedForType >= allowedForType) {
        showToast({
          type: 'error',
          message: `Monthly limit reached for ${data.listingType}. You have used ${usedForType}/${allowedForType} this month.`,
        });
        return;
      }
    }

    const oversizedFiles = data.images.filter(
      (file) => (file?.size || 0) > MAX_SINGLE_UPLOAD_SIZE_BYTES
    );

    if (oversizedFiles.length > 0) {
      const maxFileSizeMb = MAX_SINGLE_UPLOAD_SIZE_BYTES / (1024 * 1024);
      const fileNames = oversizedFiles
        .slice(0, 3)
        .map((file) => file.name || 'Unnamed file')
        .join(', ');
      const remainingCount = oversizedFiles.length - 3;

      showToast({
        type: 'error',
        message:
          remainingCount > 0
            ? `Some images are too large. Max allowed per image is ${maxFileSizeMb} MB. Example files: ${fileNames} and ${remainingCount} more.`
            : `Some images are too large. Max allowed per image is ${maxFileSizeMb} MB. Files: ${fileNames}.`,
      });
      return;
    }

    const totalUploadBytes = data.images.reduce(
      (sum, file) => sum + (file?.size || 0),
      0
    );

    if (totalUploadBytes > MAX_TOTAL_UPLOAD_SIZE_BYTES) {
      const totalMb = (totalUploadBytes / (1024 * 1024)).toFixed(1);
      const allowedMb = (MAX_TOTAL_UPLOAD_SIZE_BYTES / (1024 * 1024)).toFixed(0);
      showToast({
        type: 'error',
        message: `Total upload size is ${totalMb} MB, but allowed total is ${allowedMb} MB. Please compress images or upload fewer files.`,
      });
      return;
    }

    const formData = new FormData();

    formData.append('listingType', data.listingType);
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
    formData.append('registrationYear', data.registrationYear);
    formData.append(
      'numberOfOwners',
      data.numberOfOwners?.trim() || 'Freshly Imported'
    );

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
      {/* Disclaimer Section */}
      <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded text-yellow-900 text-sm">
        <strong>Disclaimer:</strong> CarTradz only provides a platform for users to buy and sell cars. We are not involved in any transaction between the buyer and seller. CarTradez is not responsible for authentication of uploaded vehicles; it is the customer&apos;s responsibility to verify authenticity. Users must read our <a href="/guidelines" className="underline text-blue-700 hover:text-blue-900" target="_blank" rel="noopener noreferrer">Buyer & Seller Safety Guide</a> before proceeding.
      </div>
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
                  subHeading='(Only Make, Model, Year, and Images are required)'
                >
                  {shouldShowMonthlyUsage && (
                    <div className='grid grid-cols-12 gap-2 mt-3'>
                      <div className='col-span-12'>
                        <div className='w-full rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-sm'>
                          <p className='text-[13px] font-semibold tracking-wide'>This Month Usage</p>
                          <p>
                            Premium: {monthlyUsageByType.premium}/{monthlyLimits.premium}
                          </p>
                          <p>
                            Quick Sell: {monthlyUsageByType['quick sell']}/{monthlyLimits['quick sell']}
                          </p>
                          <p>
                            Standard: {monthlyUsageByType.standard}/{monthlyLimits.standard}
                            {isVehiclesLoading ? ' (loading...)' : ''}
                          </p>
                          <p className='mt-2 text-xs text-primary/90'>
                            Note: Once listing type is set, you will not be able to update it later.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className='grid grid-cols-12 gap-2 mt-3'>
                    <div className='md:col-span-6 col-span-12' data-field-name='listingType'>
                      <CustomSelectInput
                        label='Listing Type'
                        name='listingType'
                        placeholder='Select Listing Type'
                        control={control}
                        options={LISTING_TYPE_OPTIONS}
                        isRequired={true}
                        isCreatable={false}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-12 gap-2 mt-3'>
                    <div className='md:col-span-6 col-span-12' data-field-name='make'>
                      <CustomSelectInput
                        label='Make'
                        name='make'
                        placeholder='Select or type Make'
                        control={control}
                        options={Object.values(VEHICLE_MAKES)}
                        isRequired={true}
                        isCreatable={true}
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
                    <div className='md:col-span-6 col-span-12' data-field-name='year'>
                      <CustomSelectInput
                        label='Year'
                        name='year'
                        placeholder='Select or type Year'
                        control={control}
                        options={getYearsList({start: 1900, end: 2026})}
                        isRequired={true}
                        isCreatable={true}
                      />
                    </div>
                    <div className='md:col-span-6 col-span-12'>
                      <CustomTextInput
                        label='Variant (optional)'
                        name='variant'
                        placeholder='Enter Variant (if applicable)'
                        control={control}
                        isRequired={false}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-12 gap-2 mt-3'>
                    <div className='md:col-span-6 col-span-12'>
                      <CustomTextInput
                        label='Condition (optional)'
                        name='condition'
                        placeholder='Enter Condition'
                        control={control}
                        isRequired={false}
                      />
                    </div>
                    <div className='md:col-span-6 col-span-12'>
                      <CustomTextInput
                        label='Body Type (optional)'
                        name='bodyType'
                        placeholder='Enter Body Type'
                        control={control}
                        isRequired={false}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-12 gap-2 mt-3'>
                    <div className='md:col-span-6 col-span-12'>
                      <CustomTextInput
                        label='Color (optional)'
                        name='color'
                        placeholder='Enter Color'
                        control={control}
                        isRequired={false}
                      />
                    </div>
                    <div className='md:col-span-6 col-span-12'>
                      <CustomNumberInput
                        label='Mileage (km) (optional)'
                        name='mileage'
                        placeholder='Type Mileage (KM)'
                        control={control}
                        isRequired={false}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-12 gap-2 mt-3'>
                    <div className='md:col-span-6 col-span-12'>
                      <CustomNumberInput
                        label='Engine Capacity (cc) (optional)'
                        name='engineSize'
                        placeholder='Type Engine Capacity'
                        control={control}
                        isRequired={false}
                      />
                    </div>
                    <div className='md:col-span-6 col-span-12'>
                      <CustomTextInput
                        label='Transmission (optional)'
                        name='transmission'
                        placeholder='Enter Transmission'
                        control={control}
                        isRequired={false}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-12 gap-2 mt-3'>
                    <div className='md:col-span-6 col-span-12'>
                      <CustomTextInput
                        label='Drive Type (optional)'
                        name='driveType'
                        placeholder='Enter Drive Type'
                        control={control}
                        isRequired={false}
                      />
                    </div>
                    <div className='md:col-span-6 col-span-12' data-field-name='fuelType'>
                      <CustomSelectInput
                        label='Fuel Type (optional)'
                        name='fuelType'
                        placeholder='Select or type Fuel Type'
                        control={control}
                        options={Object.values(VEHICLE_FUEL_TYPES)}
                        isRequired={false}
                        isCreatable={true}
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
    placeholder='Select or type Currency'
    control={control}
    options={Object.values(VEHICLE_CURRENCY_TYPES)}
    isRequired={true}
    isCreatable={true}
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
                        label='Available City (optional)'
                        name='registrationCity'
                        placeholder='Enter Available City'
                        control={control}
                        isRequired={false}
                      />
                    </div>
                    <div className='md:col-span-6 col-span-12'>
                      <CustomTextInput
                        label='Registration Year (optional)'
                        name='registrationYear'
                        placeholder='Enter Registration Year'
                        control={control}
                        isRequired={false}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-12 gap-2 mt-3'>
                    <div className='md:col-span-6 col-span-12'>
                      <CustomTextInput
                        label='Registration Number (optional)'
                        name='registrationNumber'
                        placeholder='Enter Registration Number'
                        control={control}
                        isRequired={false}
                      />
                    </div>
                    <div className='md:col-span-6 col-span-12'>
                      <CustomTextInput
                        label='Number of Owners (optional)'
                        name='numberOfOwners'
                        placeholder='1,2 or Freshly imported'
                        control={control}
                        isRequired={false}
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
                    <Label text={'Description'}/>
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
