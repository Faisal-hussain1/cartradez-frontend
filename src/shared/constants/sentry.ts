const getValidSentryDsn = () => {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN?.trim();

  if (!dsn) return undefined;

  try {
    const parsedDsn = new URL(dsn);
    const projectId = parsedDsn.pathname.split('/').filter(Boolean).pop();

    if (
      !['http:', 'https:'].includes(parsedDsn.protocol) ||
      !parsedDsn.hostname ||
      !parsedDsn.username ||
      !projectId
    ) {
      return undefined;
    }

    return dsn;
  } catch {
    return undefined;
  }
};

export const commonSentryConfigurations = {
  // An invalid deployment variable must not break or pollute the live client.
  dsn: getValidSentryDsn(),

  environment: process.env.NEXT_PUBLIC_ENV,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
};

export const clientSentryConfigurations = {
  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,
};

export const sentryReplayConfigurations = {
  maskAllText: true,
  blockAllMedia: true,
};
