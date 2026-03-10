import {Fragment} from 'react';
import {ToastContainer, Slide} from 'react-toastify';
import {NuqsAdapter} from 'nuqs/adapters/next/app';
import initializeTranslations from '@/i18n';
import {i18nConfig, i18nNamespaces} from '@/i18nConfig';
import AuthGuard from '@/shared/components/layout/guards/authGuard';
import SuspenseWrapper from '@/shared/components/layout/SuspenseWrapper';
import {generateMetadata} from '@/shared/utils/metadataUtils';
import {
  ReduxProvider,
  TranslationsProvider,
  ReactQueryProvider,
} from '@/shared/providers';
import 'react-toastify/dist/ReactToastify.css';
import {RootLayoutProps} from '@/shared/interfaces/common';

export function generateStaticParams() {
  return i18nConfig.locales.map((locale: string) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params,
}: RootLayoutProps) {
  const {locale} = await params;
  const {resources} = await initializeTranslations(locale);

  return (
    <Fragment>
      <ReduxProvider>
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
          <ReactQueryProvider>
            <AuthGuard>
              <NuqsAdapter>
                <SuspenseWrapper>{children}</SuspenseWrapper>
              </NuqsAdapter>
            </AuthGuard>
          </ReactQueryProvider>
        </TranslationsProvider>
      </ReduxProvider>
      <ToastContainer
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover={false}
        draggable={false}
        transition={Slide}
        theme='light'
        icon={false}
      />
    </Fragment>
  );
}

export const metadata = async () => await generateMetadata();