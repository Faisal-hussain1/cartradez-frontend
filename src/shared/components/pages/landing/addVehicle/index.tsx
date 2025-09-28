'use client';

import {useState} from 'react';
import Image from 'next/image';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import SubmitButton from '@/shared/components/common/buttons/submitButton';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/shared/components/ui/select';
import {VehiclePayload} from '@/shared/interfaces/vehicles';
import Container from '@/shared/components/common/containers';
import {vehiclesMutations} from '@/shared/reactQuery';
import useTranslation from '@/shared/hooks/useTranslation';
import {newVehicleSchema} from '@/shared/schemas/vehicles';
import TextInput from '@/shared/components/common/inputs/textInput';
import Logo from '@/shared/components/common/logo';
import AuthFormContainer from '@/shared/components/common/containers/auth/AuthFormContainer';
import {
  VEHICLE_BODIES,
  VEHICLE_CURRENCY_TYPES,
  VEHICLE_CYLINDERS,
  VEHICLE_DOORS,
  VEHICLE_FUEL_TYPES,
  VEHICLE_MAKES,
  VEHICLE_MODELS,
  VEHICLE_TRANSMISSION_TYPES,
} from '@/shared/constants/vehicles';
import SelectInput from '@/shared/components/common/inputs/selectInput';
import NumberInput from '@/shared/components/common/inputs/numberInput';
import {DescriptionBox} from '@/shared/components/common/descriptionBox';
import BoxContainer from '@/shared/components/common/containers/boxContainer';
import Label from '@/shared/components/common/label';
import {getYearsList} from '@/shared/utils/general';
import CustomSelectInput from '@/shared/components/common/inputs/CustomSelectInput';
import CustomTextInput from '@/shared/components/common/inputs/CustomTextInput';
import CustomNumberInput from '@/shared/components/common/inputs/CustomNumberInput';
import ImageUploadInput from '@/shared/components/common/imageUpload';

export default function AddVehicleForm() {
  const {t} = useTranslation();

  const {control, handleSubmit, reset, watch, setValue} =
    useForm<VehiclePayload>({
      resolver: yupResolver(newVehicleSchema(t)),
      defaultValues: {
        make: '',
        model: '',
        year: 0,
        color: '',
        mileage: 0,
        description: '',
        price: 0,
        currency: '',
        engineSize: 0,
        fuelType: '',
        transmission: '',
        images: [],
      },
    });

  const images = watch('images');
  const [error, setError] = useState('');

  const {useAddNewVehicleMutation} = vehiclesMutations();

  const onSuccess = () => {
    reset();
  };

  const {mutate: executeAddNewVehicleMutation, isPending} =
    useAddNewVehicleMutation({
      callBackFuncs: {onSuccess},
    });

  // ✅ Build FormData for API (backend expects `files`)
  const onSubmit: SubmitHandler<VehiclePayload> = (data) => {
    console.log(data);
    const formData = new FormData();

    formData.append('make', data.make);
    formData.append('model', data.model);
    formData.append('year', data.year.toString());
    formData.append('color', data.color);
    formData.append('mileage', data.mileage.toString());
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('currency', data.currency);
    formData.append('engineSize', data.engineSize.toString());
    formData.append('fuelType', data.fuelType);
    formData.append('transmission', data.transmission);

    // if (data.doors) formData.append('doors', data.doors);
    // if (data.seats) formData.append('seats', data.seats.toString());
    // if (data.location) formData.append('location', data.location);
    // if (data.cylinder) formData.append('cylinder', data.cylinder);
    // if (data.modelDetail) formData.append('modelDetail', data.modelDetail);
    // if (data.importHistory)
    //   formData.append('importHistory', data.importHistory);

    // 👇 use "files" to match multer backend
    data.images.forEach((file, idx) => {
      formData.append('files', file, file.name || `image-${idx}.jpg`);
    });

    executeAddNewVehicleMutation({payload: formData});
  };

  return (
    <>
      <div>
        <div className='flex justify-center bg-white mt-10 p-5'>
          <div>
            <p className='text-3xl font-semibold text-center text-primary'>
              Sell your Car With Easy & Simple Steps!
            </p>
            <p className='text-center mt-2'>
              It's free and takes less than a minute
            </p>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-center'>
        <Container>
          <div className='w-4/5 max-w-[1200px] mx-auto'>
            <AuthFormContainer
              heading=''
              handleSubmit={handleSubmit(onSubmit)}
              fromContainerStyles='bg-transparent shadow-none rounded-none mt-0'
            >
              <BoxContainer
                heading='Car Information'
                subHeading='(All fields marked with * are mandatory)'
              >
                <CustomSelectInput
                  label='Make'
                  name='make'
                  placeholder='Select Vehicle Makes'
                  control={control}
                  options={Object.values(VEHICLE_MAKES)}
                  isRequired={true}
                />

                <CustomSelectInput
                  label='Model'
                  name='model'
                  placeholder='Select Vehicle Model'
                  control={control}
                  options={Object.values(VEHICLE_MODELS)}
                  isRequired={true}
                />

                <CustomSelectInput
                  label='Year'
                  name='year'
                  placeholder='Select Vehicle Registration Year'
                  control={control}
                  options={getYearsList({start: 1900})}
                  isRequired={true}
                />

                <CustomTextInput
                  label='Color'
                  name='color'
                  placeholder='Type Vehicle Color'
                  control={control}
                  isRequired={true}
                />

                <CustomNumberInput
                  label='Mileage (KM)'
                  name='mileage'
                  placeholder='Type Vehicle Mileage (KM)'
                  control={control}
                  isRequired={true}
                />

                <CustomNumberInput
                  label='price'
                  name='price'
                  placeholder='Type Vehicle Price'
                  control={control}
                  isRequired={true}
                />

                <CustomSelectInput
                  label='Currency'
                  name='currency'
                  placeholder='Select Vehicle Currency'
                  control={control}
                  options={Object.values(VEHICLE_CURRENCY_TYPES)}
                  isRequired={true}
                />

                <div className='grid grid-cols-12 gap-4 mt-5'>
                  <div className='col-span-2 flex items-start justify-end'>
                    <Label text={'Add Description'} isRequired={true} />
                  </div>

                  <div className='col-span-10'>
                    <DescriptionBox
                      name={'description'}
                      control={control}
                      isRequired={true}
                      setValue={setValue}
                      watch={watch}
                      placeholder='Describe your car...'
                    />
                  </div>
                </div>
              </BoxContainer>

              <BoxContainer
                heading='Upload Images'
                subHeading='Upload between 3 and 9 images of your vehicle. Supported formats: JPEG, JPG, PNG.'
              >
                <div className='mt-5'>
                  <ImageUploadInput
                    name='images'
                    setValue={setValue}
                    watch={watch}
                  />
                </div>
              </BoxContainer>

              <BoxContainer heading='Additional Information'>
                <CustomNumberInput
                  label='Engine Size in CC'
                  name='engineSize'
                  placeholder='Type Vehicle Engine Size in CC'
                  control={control}
                  isRequired={true}
                />

                <CustomSelectInput
                  label='Transmission'
                  name='transmission'
                  placeholder='Select Vehicle Transmission'
                  control={control}
                  options={Object.values(VEHICLE_TRANSMISSION_TYPES)}
                  isRequired={true}
                />

                <CustomSelectInput
                  label='Fuel Type'
                  name='fuelType'
                  placeholder='Select Vehicle Fuel Type'
                  control={control}
                  options={Object.values(VEHICLE_FUEL_TYPES)}
                  isRequired={true}
                />
              </BoxContainer>

              <div className='flex justify-end'>
                <SubmitButton
                  loading={isPending}
                  buttonText='SUBMIT'
                  styles='w-[180px]'
                />
              </div>
            </AuthFormContainer>
          </div>
        </Container>
      </div>
    </>
  );
}
