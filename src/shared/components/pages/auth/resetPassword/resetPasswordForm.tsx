'use client';

import Image from 'next/image';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {resetPasswordSchema} from '@/shared/schemas/auth';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import SubmitButton from '@/shared/components/common/buttons/submitButton';
import PasswordInput from '@/shared/components/common/inputs/passwordInput';
import useTranslation from '@/shared/hooks/useTranslation';
import {AUTH_ROUTES} from '@/shared/constants/PATHS';
import AuthFormContainer from '@/shared/components/common/containers/auth/AuthFormContainer';
import {ResetPasswordPayload} from '@/shared/interfaces/auth';
import {userMutations} from '@/shared/reactQuery';
import {
  AuthSectionContainer,
  LeftSideContainer,
  RightSideContainer,
} from '@/shared/components/common/containers/auth';
import Logo from '@/shared/components/common/logo';

export default function ResetPasswordForm({token}: {token: string}) {
  const router = useLocaleRouter();
  const {t, ct} = useTranslation();

  const {control, handleSubmit} = useForm<ResetPasswordPayload>({
    resolver: yupResolver(ct(resetPasswordSchema)),
    defaultValues: {password: '', confirmPassword: ''},
  });
  const onSuccess = () => router.push(AUTH_ROUTES.login);

  const onError = () => router.push(AUTH_ROUTES.forgotPassword);

  const {useResetPasswordMutation} = userMutations();

  const {mutate: executeResetPasswordMutation, isPending} =
    useResetPasswordMutation({
      callBackFuncs: {onError, onSuccess},
    });

  const onSubmit = (payload: ResetPasswordPayload) => {
    executeResetPasswordMutation({payload, params: {token}});
  };

  return (
    <AuthSectionContainer>
      <LeftSideContainer>
        <Image
          src='/images/auth/reset-password-image.png'
          alt='login-image'
          width={400}
          height={700}
          className='h-screen fixed w-[25%]'
        />
      </LeftSideContainer>
      <RightSideContainer>
        <Logo width={204} height={109} />
        <AuthFormContainer
          heading={t('auth.reset')}
          handleSubmit={handleSubmit(onSubmit)}
          subHeading={t('auth.resetMessage')}
        >
          <PasswordInput
            name='password'
            control={control}
            label={t('auth.passwordLabel')}
            placeholder={t('auth.passwordPlaceholder')}
          />
          <PasswordInput
            label={t('auth.confirmPassword')}
            placeholder={t('auth.confirmPasswordPlaceholder')}
            name='confirmPassword'
            control={control}
          />
          <SubmitButton loading={isPending} buttonText={t('auth.reset')} />
        </AuthFormContainer>
      </RightSideContainer>
    </AuthSectionContainer>
  );
}
