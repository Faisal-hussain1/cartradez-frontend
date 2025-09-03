'use client';

import Image from 'next/image';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {sendResetPasswordLinkSchema} from '@/shared/schemas/auth';
import SubmitButton from '@/shared/components/common/buttons/submitButton';
import TextInput from '@/shared/components/common/inputs/textInput';
import useTranslation from '@/shared/hooks/useTranslation';
import {AUTH_ROUTES} from '@/shared/constants/PATHS';
import AuthFormContainer from '@/shared/components/common/containers/auth/AuthFormContainer';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {ForgotPasswordPayload} from '@/shared/interfaces/auth';
import {userMutations} from '@/shared/reactQuery';
import {
  AuthSectionContainer,
  LeftSideContainer,
  RightSideContainer,
} from '@/shared/components/common/containers/auth';
import Logo from '@/shared/components/common/logo';
import Link from '@/shared/utils/localeLink';

export default function ForgotPasswordForm() {
  const {t, ct} = useTranslation();
  const router = useLocaleRouter();

  const onSuccess = () => {
    router.push(AUTH_ROUTES.resetPasswordRequest);
  };
  const onError = () => {};

  const {useSendResetPasswordMutation} = userMutations();

  const {mutate: executeSendResetPasswordMutation, isPending} =
    useSendResetPasswordMutation({
      callBackFuncs: {onError, onSuccess},
    });

  const {control, handleSubmit} = useForm<ForgotPasswordPayload>({
    resolver: yupResolver(ct(sendResetPasswordLinkSchema)),
    defaultValues: {email: ''},
  });

  const onSubmit = (payload: ForgotPasswordPayload) => {
    executeSendResetPasswordMutation({payload});
  };

  return (
    <AuthSectionContainer>
      <LeftSideContainer>
        <Image
          src='/images/forgot-password-image.png'
          alt='login-image'
          width={400}
          height={700}
          className='h-screen fixed w-[25%]'
        />
      </LeftSideContainer>
      <RightSideContainer>
        <Logo width={204} height={109} />
        <AuthFormContainer
          heading={t('auth.forgot')}
          handleSubmit={handleSubmit(onSubmit)}
          subHeading={t('auth.forgotPasswordSubheading')}
        >
          <TextInput
            name='email'
            label={t('auth.emailLabel')}
            control={control}
            placeholder={t('auth.emailPlaceholder')}
          />
          <SubmitButton loading={isPending} buttonText={t('auth.sendEmail')} />
          <div className='flex-end'>
            <Link className='text-primary text-sm' href={AUTH_ROUTES.login}>
              {t('auth.loginWithQuestionMarkText')}
            </Link>
          </div>
        </AuthFormContainer>
      </RightSideContainer>
    </AuthSectionContainer>
  );
}
