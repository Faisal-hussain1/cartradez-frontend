import {ReactNode} from 'react';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginError {
  error?: {
    type?: string;
    email?: string;
  };
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface LinkSentPageProps {
  params: Promise<{action: string}>;
}

export interface ResetPasswordPageProps {
  params: Promise<{token: string}>;
}

export interface ResetPasswordPayload {
  password: string;
  confirmPassword: string;
}

export interface VerifyPageProps {
  params: Promise<{token: string}>;
}

export interface VerificationMessageProps {
  message?: string;
  unsuccessful?: ReactNode;
  successful?: ReactNode;
  email?: string;
}

export interface AuthFormHeadingProps {
  heading: string;
}
