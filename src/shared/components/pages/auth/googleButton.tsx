'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { googleAuth } from "@/shared/utils/api";
import { useGoogleLogin } from "@react-oauth/google";
import { actions } from '@/shared/redux/slices/users';
import GoogleSignupModal from './GoogleSignupModal';
import {showToast} from '@/shared/utils/toasts';

type GoogleAuthButtonProps = {
  text?: string;
};

export default function GoogleAuthButton({
  text = 'Continue with Google',
}: GoogleAuthButtonProps) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [userDataFromGoogle, setUserDataFromGoogle] = useState<any>(null);
  const [tempAccessToken, setTempAccessToken] = useState('');
  const [loading, setLoading] = useState(false);

  const normalizeUser = (user: any) => {
    if (!user) return user;
    if (user._id) return user;
    if (user.id) return {...user, _id: user.id};
    return user;
  };

  const responseGoogle = async (authResult: any) => {
    setLoading(true);
    try {
      if (authResult.code) {
        const res = await googleAuth(authResult.code);
        const {user, isNewUser, needsAdditionalInfo, tempAccessToken: signupToken, googleUserData} = res.data;
        
        if (isNewUser && needsAdditionalInfo && text === 'Sign up with Google') {
          setTempAccessToken(signupToken || '');
          setUserDataFromGoogle(googleUserData);
          setShowModal(true);
        } else if (isNewUser && needsAdditionalInfo) {
          showToast({
            type: 'error',
            message: 'No account found for this Google email. Please use Sign up with Google first.',
          });
        } else if (text === 'Sign up with Google' && user) {
          showToast({
            type: 'error',
            message: 'This Google account is already registered. Please login instead.',
          });
        } else if (user) {
          if (res?.data?.accessToken) {
            localStorage.setItem('accessToken', res.data.accessToken);
          }
          // Existing user or login flow - store and redirect
          dispatch(actions.setCurrentUser(normalizeUser(user)));
          // TODO: Redirect to dashboard or home page
        } else {
          console.error('Error: Unable to retrieve user information');
        }
      } else if (authResult.error) {
        console.error('Google login error:', authResult.error);
      }
    } catch (error: any) {
      console.error('Error during Google authentication:', error?.response?.data || error?.message || error);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code',
  });

  const handleModalClose = () => {
    setShowModal(false);
    setUserDataFromGoogle(null);
    setTempAccessToken('');
  };

  const handleProfileComplete = (completeUser: any) => {
    const normalizedUser = normalizeUser(completeUser);
    dispatch(actions.setCurrentUser(normalizedUser));
    handleModalClose();
    // TODO: Redirect to dashboard or home page
  };

  return (
    <>
      <button
        type="button"
        onClick={googleLogin}
        disabled={loading}
        className="
          cursor-pointer w-full flex items-center justify-center gap-3
          border border-gray-300 rounded-lg
          py-3 px-4 text-sm font-medium text-gray-700
          bg-white hover:bg-gray-50
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        <svg width="20" height="20" viewBox="0 0 48 48">
          <path
            fill="#FFC107"
            d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
          />
          <path
            fill="#FF3D00"
            d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
          />
          <path
            fill="#4CAF50"
            d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.1 26.8 36 24 36c-5.3 0-9.8-3.4-11.4-8.1L6.1 33C9.4 39.5 16.2 44 24 44z"
          />
          <path
            fill="#1976D2"
            d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
          />
        </svg>

        {loading ? 'Loading...' : text}
      </button>

      {showModal && userDataFromGoogle && tempAccessToken && (
        <GoogleSignupModal
          tempAccessToken={tempAccessToken}
          googleUserData={userDataFromGoogle}
          onClose={handleModalClose}
          onComplete={handleProfileComplete}
        />
      )}
    </>
  );
}
