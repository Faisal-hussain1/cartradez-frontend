'use client';

import {useEffect, useCallback} from 'react';
import {useSearchParams} from 'next/navigation';
import useTranslation from '@/shared/hooks/useTranslation';
import {userMutations} from '@/shared/reactQuery';

export function HandleUnverifiedLogin() {
  const searchParams = useSearchParams();
  const {useResendVerificationMutation} = userMutations();

  const {mutate: executeResendPasswordMutation} =
    useResendVerificationMutation();
  const {t} = useTranslation();

  const email = searchParams.get('email');

  const resendLink = useCallback(() => {
    if (email) {
      executeResendPasswordMutation({payload: email});
    }
  }, [email, executeResendPasswordMutation]);

  useEffect(() => {
    resendLink();
  }, [resendLink]);

  return (
    <div className='max-w-[700px] w-full'>
      <h1 className='text-center'>{t('unverifedLogin.message')}</h1>
    </div>
  );
}
