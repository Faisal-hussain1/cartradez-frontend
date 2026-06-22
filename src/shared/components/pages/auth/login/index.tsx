'use client';

import {useCallback} from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {useSearchParams} from 'next/navigation';
import Image from 'next/image';
import PasswordInput from '@/shared/components/common/inputs/passwordInput';
import TextInput from '@/shared/components/common/inputs/textInput';
import SubmitButton from '@/shared/components/common/buttons/submitButton';
import {loginUserSchema} from '@/shared/schemas/auth';
import {AUTH_ROUTES} from '@/shared/constants/PATHS';
import useTranslation from '@/shared/hooks/useTranslation';
import AuthFormContainer from '@/shared/components/common/containers/auth/AuthFormContainer';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {LoginError, LoginPayload} from '@/shared/interfaces/auth';
import {userMutations} from '@/shared/reactQuery';
import {USER_ERRORS_TYPES} from '@/shared/constants/responses/errors/users';
import Logo from '@/shared/components/common/logo';
import {
  AuthSectionContainer,
  LeftSideContainer,
  RightSideContainer,
} from '@/shared/components/common/containers/auth';
import Link from '@/shared/utils/localeLink';
import GoogleAuthButton from '../googleButton';
import {persistAuthToken} from '@/shared/utils/authSession';

export default function LoginForm() {
  const {t, ct} = useTranslation();
  const router = useLocaleRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');
  const from = searchParams.get('from');
  const {useLoginMutation} = userMutations();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const onError = ({error: {type, email} = {}}: LoginError) => {
    if (type === USER_ERRORS_TYPES.userNotVerified.value) {
      router.push(
        `${AUTH_ROUTES.unverifiedLoginAttempt}?${createQueryString(
          'email',
          email || ''
        )}`
      );
    }
  };

  const onSuccess = (res: any) => {
    const token = res?.data?.token;
    if (token) {
      persistAuthToken(token);
    }
  };

  const {mutate: executeLoginMutation, isPending} = useLoginMutation({
    callBackFuncs: {onError, onSuccess},
  });

  const {control, handleSubmit} = useForm<LoginPayload>({
    resolver: yupResolver(ct(loginUserSchema)),
    defaultValues: {email: '', password: ''},
  });



  const onSubmit = (payload: LoginPayload) => {
    executeLoginMutation({
      payload,
    });
  };

  return (
    <AuthSectionContainer>
      <LeftSideContainer>
        <Image
          src="/images/auth/login-image.png"
          alt='login-image'
          width={400}
          height={700}
          className='h-screen fixed md:w-[25%] w-full'
        />
      </LeftSideContainer>
      <RightSideContainer>
        <Logo width={130} height={80} />
        <AuthFormContainer
          heading={t('auth.welcomeBack')}
          subHeading={t('auth.loginSubHeading')}
          handleSubmit={handleSubmit(onSubmit)}
        >
          {reason === 'login_required' && from === 'dealer' && (
            <p className='rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800'>
              Please login to access the dealer page.
            </p>
          )}
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
          <div className='flex-end'>
            <Link
              className='text-primary text-sm'
              href={AUTH_ROUTES.forgotPassword}
            >
              {t('auth.forgotPassword')}
            </Link>
          </div>
          <SubmitButton loading={isPending} buttonText={t('auth.loginText')} />
          <div className="flex items-center gap-3 my-2">
  <div className="flex-1 h-px bg-gray-200" />
  <span className="text-xs text-gray-400">OR</span>
  <div className="flex-1 h-px bg-gray-200" />
</div>

<GoogleAuthButton text="Login with Google" />
          <div className='flex-end'>
            <span className='text-gray-600 text-sm'>New to Car Tradez?</span>
            <button
              type='button'
              className='text-primary text-sm'
              onClick={() => router.push(AUTH_ROUTES.register)}
            >
              {t(' Sign Up')}
            </button>
          </div>
        </AuthFormContainer>
      </RightSideContainer>
    </AuthSectionContainer>
  );
}
