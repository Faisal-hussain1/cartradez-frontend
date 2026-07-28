// import {Metadata} from 'next';
// import translationUtilsValues from './translationsUtils';
// import {BRANDING} from '@/shared/constants/general';

// export const generateMetadata = async (
//   pageName: string = 'mainPageTitle'
// ): Promise<Metadata> => {
//   const {t} = await translationUtilsValues();
//   const {websiteName, websiteDescription, faviconPath} = await BRANDING();

//   return {
//     title: `${websiteName}${
//       pageName !== 'mainPageTitle' ? ` - ${t(`${pageName}.title`)}` : ''
//     }`,
//     description:
//       pageName !== 'mainPageTitle'
//         ? t(`${pageName}.description`)
//         : websiteDescription,
//     icons: {
//       icon: [
//         {
//           media: '(prefers-color-scheme: light)',
//           url: faviconPath,
//           href: faviconPath,
//         },
//         {
//           media: '(prefers-color-scheme: dark)',
//           url: faviconPath,
//           href: faviconPath,
//         },
//       ],
//     },
//   };
// };


import type { Metadata } from 'next';
import translationUtilsValues from './translationsUtils';
import { BRANDING } from '@/shared/constants/general';
import { SEO_CONFIG, SEOPageName } from '@/shared/seo/seo-config';
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cartradez.com';

type MetadataInput =
  | string
  | {
      pageName?: string;
      title?: string;
      description?: string;
      path?: string;
      image?: string;
      keywords?: string[];
      noIndex?: boolean;
    };

const isSEOConfigPage = (pageName: string): pageName is SEOPageName => {
  return pageName in SEO_CONFIG;
};

const makeAbsoluteUrl = (value: string) => {
  if (!value) return SITE_URL;
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  return new URL(value, SITE_URL).toString();
};

export const generateMetadata = async (
  input: MetadataInput = 'mainPageTitle'
): Promise<Metadata> => {
  const options = typeof input === 'string' ? { pageName: input } : input;

  const pageName = options.pageName || 'mainPageTitle';

  const { t } = await translationUtilsValues();
  const { websiteName, websiteDescription, faviconPath } = await BRANDING();

  const seoConfig = isSEOConfigPage(pageName) ? SEO_CONFIG[pageName] : null;

  const titleFromConfig = options.title || seoConfig?.title;
  const descriptionFromConfig = options.description || seoConfig?.description;

  const finalTitle =
    titleFromConfig ||
    (pageName !== 'mainPageTitle'
      ? `${t(`${pageName}.title`)} | ${websiteName}`
      : websiteName);

  const finalDescription =
    descriptionFromConfig ||
    (pageName !== 'mainPageTitle'
      ? t(`${pageName}.description`)
      : websiteDescription);

  const finalPath = options.path || seoConfig?.path;
  const finalImage = options.image || seoConfig?.image || '/images/og/home.jpg';
  const finalKeywords = options.keywords || seoConfig?.keywords || [];

  const fullUrl = finalPath ? makeAbsoluteUrl(finalPath) : undefined;
  const imageUrl = makeAbsoluteUrl(finalImage);

  return {
    metadataBase: new URL(SITE_URL),

    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,

   ...(finalPath && {
  alternates: {
    canonical: finalPath,
  },
}),

    robots: options.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },

    openGraph: {
      title: finalTitle,
      description: finalDescription,
      ...(fullUrl && {url: fullUrl}),
      siteName: websiteName,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [imageUrl],
    },

    icons: {
      icon: [
        {
          media: '(prefers-color-scheme: light)',
          url: faviconPath,
          href: faviconPath,
        },
        {
          media: '(prefers-color-scheme: dark)',
          url: faviconPath,
          href: faviconPath,
        },
      ],
    },
  };
};