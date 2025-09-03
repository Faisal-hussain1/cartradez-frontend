'use client';

import {Suspense} from 'react';
import ErrorBoundary from '@/shared/components/layout/ErrorBoundary';
import GlobalLoader from '@/shared/components/common/loaders/GlobalLoader';
import {SuspenseWrapperProps} from '@/shared/interfaces/common';

export const SuspenseWrapper = ({
  children,
  fallback = <GlobalLoader />,
}: SuspenseWrapperProps) => (
  <Suspense fallback={fallback}>
    <ErrorBoundary>{children}</ErrorBoundary>
  </Suspense>
);

export default SuspenseWrapper;
