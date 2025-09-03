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
        email={unVerifiedEmail}
        message={t('unverifiedVerfication.message')}
      />
    );

  if (tokenError)
    return (
      <VerificationMessage
        email={unVerifiedEmail}
        message={t('unVerifiedEmail.message')}
      />
    );

  if (isUserVerified)
    return (
      <VerificationMessage
        successful={<p>{t('successfulAccountVerified.message')}</p>}
      />
    );

  if (isUserVerified === false)
    return (
      <VerificationMessage
        unsuccessful={<p>{t('unSuccessfulAccountVerified.message')}</p>}
        email={unVerifiedEmail}
      />
    );

  return null;
};

export default UserVerificationHandler;
