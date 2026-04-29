'use client';

import { ReactNode } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function ClientProviders({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_API!}
    >
      {children}
    </GoogleOAuthProvider>
  );
}