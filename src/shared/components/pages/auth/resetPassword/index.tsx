'use client';

import {useEffect, useState, useCallback} from 'react';
import {jwtDecode} from 'jwt-decode';
import {tryCatch} from '@/shared/utils/tryCatchUtils';
import ResetPasswordForm from './resetPasswordForm';
import GlobalLoader from '@/shared/components/common/loaders/GlobalLoader';
import InvalidTokenMessage from './InvalidTokenMessage';

const ResetPasswordHandler = ({token}: {token: string}) => {
  const [tokenError, setTokenError] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  const verifyToken = useCallback(() => {
    const {success} = tryCatch(() => jwtDecode(token));
    if (!success) {
      setTokenError(true);
    }
    setInitialRender(false);
  }, [token]); // Only re-create when `token` changes

  useEffect(() => {
    if (initialRender) {
      verifyToken();
    }
  }, [initialRender, verifyToken]);

  if (initialRender) return <GlobalLoader />;

  if (tokenError) return <InvalidTokenMessage />;

  return <ResetPasswordForm token={token} />;
};

export default ResetPasswordHandler;
