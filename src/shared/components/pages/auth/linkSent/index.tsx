'use client';

import Image from 'next/image';
import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import {
  AuthSectionContainer,
  LeftSideContainer,
  RightSideContainer,
} from '@/shared/components/common/containers/auth';
import AuthFormContainer from '@/shared/components/common/containers/auth/AuthFormContainer';
import Logo from '@/shared/components/common/logo';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import useTranslation from '@/shared/hooks/useTranslation';
import {AUTH_ROUTES} from '@/shared/constants/PATHS';

export default function ActionMessage({action}: {action: string}) {
  const router = useLocaleRouter();
  const {t} = useTranslation();

  let headings = {
    main: '',
    subHeading: '',
    image: '',
  };

  if (action === 'reset') {
    headings = {
      main: t('auth.resetLinkSent'),
      subHeading: t('reset.message'),
      image: '/images/reset-link-sent-image.png',
    };
  }

  return (
    <AuthSectionContainer>
      <LeftSideContainer>
        <Image
          src={headings.image}
          alt='login-image'
          width={400}
          height={700}
          className='h-screen fixed w-[25%]'
        />
      </LeftSideContainer>
      <RightSideContainer>
        <Logo width={204} height={109} />
        <AuthFormContainer
          heading={headings.main}
          subHeading={headings.subHeading}
        >
          <PrimaryButton
            buttonText={t('auth.gotoLogin')}
            onClick={() => router.push(AUTH_ROUTES.login)}
          />
        </AuthFormContainer>
      </RightSideContainer>
    </AuthSectionContainer>
  );
}
