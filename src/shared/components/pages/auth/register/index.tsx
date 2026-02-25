// 'use client';

// import {yupResolver} from '@hookform/resolvers/yup';
// import {useForm} from 'react-hook-form';
// import SelectInput from '@/shared/components/common/inputs/selectInput';

// import PasswordInput from '@/shared/components/common/inputs/passwordInput';
// import Link from '@/shared/utils/localeLink';
// import TextInput from '@/shared/components/common/inputs/textInput';
// import SubmitButton from '@/shared/components/common/buttons/submitButton';
// import {registerUserSchema} from '@/shared/schemas/auth';
// import {AUTH_ROUTES} from '@/shared/constants/PATHS';
// import useTranslation from '@/shared/hooks/useTranslation';
// import AuthFormContainer from '@/shared/components/common/containers/auth/AuthFormContainer';
// import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
// import {RegisterPayload} from '@/shared/interfaces/auth';
// import {userMutations} from '@/shared/reactQuery';
// import {
//   AuthSectionContainer,
//   LeftSideContainer,
//   RightSideContainer,
// } from '@/shared/components/common/containers/auth';
// import Image from 'next/image';
// import Logo from '@/shared/components/common/logo';
// import PhoneInputText from '@/shared/components/common/inputs/phoneInput';

// export default function RegisterForm() {
//   const {t, ct} = useTranslation();
//   const router = useLocaleRouter();
//   const {useSignupMutation} = userMutations();

//   const onSuccess = () => {
//     router.push(AUTH_ROUTES.registerVerifyRequest);
//   };

//   const {mutate: executeSignupMutation, isPending} = useSignupMutation({
//     callBackFuncs: {onSuccess},
//   });

//   const {control, handleSubmit, watch} = useForm<RegisterPayload>({
//     resolver: yupResolver(ct(registerUserSchema)),
//     defaultValues: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       phoneNumber: '',
//       password: '',
//       systemRole: 'user',
//       showroomName: '',
//       address: '',
//       city: '',
//       state: '',
//       country: '',
//     },
//   });

//   const onSubmit = (payload: RegisterPayload) => {
//     executeSignupMutation({payload});
//   };

//   return (
//     <AuthSectionContainer>
//       <LeftSideContainer>
//         <Image
//           src='/images/auth/register-image.png'
//           alt='login-image'
//           width={400}
//           height={700}
//           className='h-screen fixed w-[25%]'
//         />
//       </LeftSideContainer>
//       <RightSideContainer>
//         <Logo width={204} height={109} />
//         <AuthFormContainer
//           heading={t('auth.signup')}
//           handleSubmit={handleSubmit(onSubmit)}
//         >
//           <TextInput
//             label={t('auth.firstName')}
//             placeholder={t('auth.firstNamePlaceholder')}
//             control={control}
//             name='firstName'
//           />
//           <TextInput
//             label={t('auth.lastName')}
//             placeholder={t('auth.lastNamePlaceholder')}
//             control={control}
//             name='lastName'
//           />
//           <TextInput
//             control={control}
//             name='address'
//             label={t('auth.address')}
//             placeholder={t('auth.addressPlaceholder')}
//           />
//           <TextInput
//             control={control}
//             name='country'
//             label={t('auth.country')}
//             placeholder={t('auth.countryPlaceholder')}
//           />

//           <TextInput
//             control={control}
//             name='state'
//             label={t('auth.state')}
//             placeholder={t('auth.statePlaceholder')}
//           />
//           <TextInput
//             control={control}
//             name='city'
//             label={t('auth.city')}
//             placeholder={t('auth.cityPlaceholder')}
//           />

//           <SelectInput
//             control={control}
//             name='systemRole'
//             label={t('auth.systemRole')}
//             options={[
//               {label: t('auth.user'), value: 'user'},
//               {
//                 label: t('auth.dealer'),
//                 value: 'dealer',
//               },
//             ]}
//             isSearchable={false}
//             isClearable={false}
//             closeMenuOnSelect={true}
//           />
//           {watch('systemRole') === 'dealer' && (
//             <>
//               <TextInput
//                 control={control}
//                 name='showroomName'
//                 label={t('auth.showroomName')}
//                 placeholder={t('auth.showroomNamePlaceholder')}
//               />
//             </>
//           )}
//           <TextInput
//             name='email'
//             label={t('auth.emailLabel')}
//             control={control}
//             placeholder={t('auth.emailPlaceholder')}
//           />
//           {/* <TextInput
//             name='phoneNumber'
//             label={t('auth.phoneNumberLabel')}
//             control={control}
//             placeholder={t('auth.phoneNumberPlaceholder')}
//           /> */}
//           <PhoneInputText
//             control={control}
//             name='phoneNumber'
//             label={t('auth.phoneNumberLabel')}
//             placeholder={t('auth.phoneNumberPlaceholder')}
//           />

//           <PasswordInput
//             name='password'
//             control={control}
//             label={t('auth.passwordLabel')}
//             placeholder={t('auth.passwordPlaceholder')}
//           />
//           <SubmitButton loading={isPending} buttonText={t('auth.signup')} />
//           <Link href={AUTH_ROUTES.login}>{t('auth.allReadyAccount')}</Link>
//         </AuthFormContainer>
//       </RightSideContainer>
//     </AuthSectionContainer>
//   );
// }

'use client';

import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';

import PasswordInput from '@/shared/components/common/inputs/passwordInput';
import Link from '@/shared/utils/localeLink';
import TextInput from '@/shared/components/common/inputs/textInput';
import SubmitButton from '@/shared/components/common/buttons/submitButton';
import {registerUserSchema} from '@/shared/schemas/auth';
import {AUTH_ROUTES} from '@/shared/constants/PATHS';
import useTranslation from '@/shared/hooks/useTranslation';
import AuthFormContainer from '@/shared/components/common/containers/auth/AuthFormContainer';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {RegisterPayload} from '@/shared/interfaces/auth';
import {userMutations} from '@/shared/reactQuery';
import {
  AuthSectionContainer,
  LeftSideContainer,
  RightSideContainer,
} from '@/shared/components/common/containers/auth';
import Image from 'next/image';
import Logo from '@/shared/components/common/logo';
import PhoneInputText from '@/shared/components/common/inputs/phoneInput';

export default function RegisterForm() {
  const {t, ct} = useTranslation();
  const router = useLocaleRouter();
  const {useSignupMutation} = userMutations();

  const onSuccess = () => {
    router.push(AUTH_ROUTES.registerVerifyRequest);
  };

  const {mutate: executeSignupMutation, isPending} = useSignupMutation({
    callBackFuncs: {onSuccess},
  });

  const {control, handleSubmit} = useForm<RegisterPayload>({
    resolver: yupResolver(ct(registerUserSchema)),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',

      // 👇 Important: systemRole hardcoded as user
      systemRole: 'user',

      address: '',
      city: '',
      state: '',
      country: '',
    },
  });

  const onSubmit = (payload: RegisterPayload) => {
    executeSignupMutation({payload});
  };

  return (
    <AuthSectionContainer>
      <LeftSideContainer>
        <Image
          src='/images/auth/register-image.png'
          alt='login-image'
          width={400}
          height={700}
          className='h-screen fixed w-[25%]'
        />
      </LeftSideContainer>

      <RightSideContainer>
        <Logo width={204} height={109} />

        <AuthFormContainer
          heading={t('auth.signup')}
          handleSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            label={t('auth.firstName')}
            placeholder={t('auth.firstNamePlaceholder')}
            control={control}
            name='firstName'
          />

          <TextInput
            label={t('auth.lastName')}
            placeholder={t('auth.lastNamePlaceholder')}
            control={control}
            name='lastName'
          />

          <TextInput
            control={control}
            name='address'
            label={t('auth.address')}
            placeholder={t('auth.addressPlaceholder')}
          />

          <TextInput
            control={control}
            name='country'
            label={t('auth.country')}
            placeholder={t('auth.countryPlaceholder')}
          />

          <TextInput
            control={control}
            name='state'
            label={t('auth.state')}
            placeholder={t('auth.statePlaceholder')}
          />

          <TextInput
            control={control}
            name='city'
            label={t('auth.city')}
            placeholder={t('auth.cityPlaceholder')}
          />

          <TextInput
            name='email'
            label={t('auth.emailLabel')}
            control={control}
            placeholder={t('auth.emailPlaceholder')}
          />

          <PhoneInputText
            control={control}
            name='phoneNumber'
            label={t('auth.phoneNumberLabel')}
            placeholder={t('auth.phoneNumberPlaceholder')}
          />

          <PasswordInput
            name='password'
            control={control}
            label={t('auth.passwordLabel')}
            placeholder={t('auth.passwordPlaceholder')}
          />

          <SubmitButton loading={isPending} buttonText={t('auth.signup')} />

          <Link href={AUTH_ROUTES.login}>{t('auth.allReadyAccount')}</Link>
        </AuthFormContainer>
      </RightSideContainer>
    </AuthSectionContainer>
  );
}
