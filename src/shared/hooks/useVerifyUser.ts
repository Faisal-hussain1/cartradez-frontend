'use client';

import {useState, useEffect} from 'react';
import {decodeVerificationToken} from '@/shared/utils/jwtUtils';
import {asyncTryCatch, tryCatch} from '@/shared/utils/tryCatchUtils';
import {userMutations} from '@/shared/reactQuery';

const useVerifyUser = ({token}: {token: string}) => {
  const [isRequestPending, setIsRequestPending] = useState(true);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [tokenError, setTokenError] = useState(false);
  const [unVerifiedEmail, setUnVerifiedEmail] = useState('');
  const {useVerifyUserMutation} = userMutations();

  const {mutate: executeVerifyUserMutation} = useVerifyUserMutation();

  useEffect(() => {
    const verify = async () => {
      setIsRequestPending(true);

      // Attempt to decode the verification token
      const {success, error, response} = tryCatch(() =>
        decodeVerificationToken({token})
      );

      if (!success) {
        setTokenError(error);
        setIsRequestPending(false);

        return;
      }

      if (response) {
        const {
          hasExpired,
          data: {email},
        } = response;

        setUnVerifiedEmail(email);

        if (!hasExpired) {
          const {success: userVerifiedSuccess, error: verifyError} =
            await asyncTryCatch(async () =>
              executeVerifyUserMutation({
                params: {token},
              })
            );

          if (userVerifiedSuccess) {
            setIsUserVerified(true);
          } else {
            setTokenError(verifyError);
          }
        } else {
          setIsTokenExpired(true);
        }
      }

      setIsRequestPending(false);
    };

    verify();
  }, [token, executeVerifyUserMutation]);

  return {
    isRequestPending,
    isTokenExpired,
    isUserVerified,
    tokenError,
    unVerifiedEmail,
  };
};

export default useVerifyUser;
