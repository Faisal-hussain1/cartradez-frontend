// eslint-disable-next-line @typescript-eslint/no-require-imports
const {withSentryConfig} = require('@sentry/nextjs');
const isProduction = process.env.NEXT_PUBLIC_ENV === 'production';
const nextConfig = {
  turbopack: {
    // Configure how specific file types (like SVGs) should be processed
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'], // Import SVGs directly as React components
        as: '*.js',
      },
    },
    // File extensions that Turbopack will resolve automatically when importing modules
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },
  images: {
    unoptimized: !isProduction,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.AWS_BUCKET_HOSTNAME,
      },
    ],
  },
};
module.exports = nextConfig;
module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    authToken: process.env.SENTRY_AUTH_TOKEN,
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
);
