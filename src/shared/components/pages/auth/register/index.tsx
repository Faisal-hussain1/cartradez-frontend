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
      password: '',
    },
  });

  const onSubmit = (payload: RegisterPayload) => {
    executeSignupMutation({payload});
  };

  return (
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
        name='email'
        label={t('auth.emailLabel')}
        control={control}
        placeholder={t('auth.emailPlaceholder')}
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
  );
}
