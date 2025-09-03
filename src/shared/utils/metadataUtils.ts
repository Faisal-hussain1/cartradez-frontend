import {Metadata} from 'next';
import translationUtilsValues from './translationsUtils';
import {BRANDING} from '@/shared/constants/general';

export const generateMetadata = async (
  pageName: string = 'mainPageTitle'
): Promise<Metadata> => {
  const {t} = await translationUtilsValues();
  const {websiteName, websiteDescription, faviconPath} = await BRANDING();

  return {
    title: `${websiteName}${
      pageName !== 'mainPageTitle' ? ` - ${t(`${pageName}.title`)}` : ''
    }`,
    description:
      pageName !== 'mainPageTitle'
        ? t(`${pageName}.description`)
        : websiteDescription,
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
