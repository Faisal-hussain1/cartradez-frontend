import {i18nConfig, i18nNamespaces} from '@/i18nConfig';
import {createInstance} from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import {initReactI18next} from 'react-i18next/initReactI18next';

export const i18nInstance = createInstance();

export default async function initializeTranslations(
  locale: string,
  resources: Record<string, any> | null = null,
  namespaces: string[] = i18nNamespaces
) {
  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/locales/${language}/${namespace}.json`)
      )
    );
  }

  await i18nInstance.init({
    /* debug: true, // i18next will log information to help resolve possible issues */
    lng: locale,
    resources: resources || undefined,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces,
    fallbackNS: namespaces,
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
    returnObjects: true,
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
}
