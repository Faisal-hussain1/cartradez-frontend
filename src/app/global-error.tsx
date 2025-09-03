'use client';

import {useEffect} from 'react';
import * as Sentry from '@sentry/nextjs';
import NextError from 'next/error';
import {GlobalErrorProps} from '@/shared/interfaces/common';

export default function GlobalError({
  error,
  statusCode = 500,
}: GlobalErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <NextError statusCode={statusCode} error={error} />
      </body>
    </html>
  );
}
