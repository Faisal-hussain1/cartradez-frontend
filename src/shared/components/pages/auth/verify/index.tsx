'use client';

import VerificationMessage from '@/shared/components/pages/auth/verify/verificationMessage';
import useVerifyUser from '@/shared/hooks/useVerifyUser';
import useTranslation from '@/shared/hooks/useTranslation';

const UserVerificationHandler = ({token}: {token: string}) => {
  const {
    isRequestPending,
    isTokenExpired,
    isUserVerified,
    tokenError,
    unVerifiedEmail,
  } = useVerifyUser({token});

  const {t} = useTranslation();


  if (isRequestPending) return <div>{t('loginIdentifier.message')}</div>;

  if (isTokenExpired)
    return (
      <VerificationMessage
        heading={t('auth.verificationLinkExpired')}
        email={unVerifiedEmail}
        message={t('unverifiedVerfication.message')}
      />
    );

  if (tokenError)
    return (
      <VerificationMessage
        heading={t('auth.verificationFailed')}
        email={unVerifiedEmail}
        message={t('unVerifiedEmail.message')}
      />
    );

  if (isUserVerified)
    return (
      <VerificationMessage
        heading={t('auth.accountVerified')}
        successful={<p>{t('successfulAccountVerified.message')}</p>}
      />
    );

  if (isUserVerified === false)
    return (
      <VerificationMessage
        heading={t('auth.verificationFailed')}
        unsuccessful={<p>{t('unSuccessfulAccountVerified.message')}</p>}
        email={unVerifiedEmail}
      />
    );

  return null;
};

export default UserVerificationHandler;
