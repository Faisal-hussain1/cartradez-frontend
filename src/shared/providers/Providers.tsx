'use client';

import { ReactNode } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import AuthGuard from '@/shared/components/layout/guards/authGuard';
import SuspenseWrapper from '@/shared/components/layout/SuspenseWrapper';
import {
  ReduxProvider,
  ReactQueryProvider,
} from '@/shared/providers';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <ReactQueryProvider>
        <AuthGuard>
          <NuqsAdapter>
            <SuspenseWrapper>{children}</SuspenseWrapper>
          </NuqsAdapter>
        </AuthGuard>
      </ReactQueryProvider>
    </ReduxProvider>
  );
}