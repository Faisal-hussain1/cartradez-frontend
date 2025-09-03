'use client';

import {useEffect, useState} from 'react';
import {I18nextProvider} from 'react-i18next';
import initializeTranslations, {i18nInstance} from '@/i18n';
import {TranslationsProviderProps} from '@/shared/interfaces/translations';
import GlobalLoader from '@/shared/components/common/loaders/GlobalLoader';

function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: TranslationsProviderProps) {
  // Track whether i18n has finished initializing
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    // Initialize translations asynchronously (avoid running in render)
    initializeTranslations(locale, resources, namespaces).then(() => {
      if (mounted) setReady(true); // Mark as ready once initialized
    });

    return () => {
      mounted = false; // Prevent state updates if component unmounts
    };
  }, [locale, resources, namespaces]);

  // Display loader until i18n is fully ready
  if (!ready) return <GlobalLoader />;

  // Provide i18n instance to the entire React tree
  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}

export default TranslationsProvider;
