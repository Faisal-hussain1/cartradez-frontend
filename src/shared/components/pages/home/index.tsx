import FullWidthContainer from '@/shared/components/common/containers/FullWidthContainer';
import translationUtilsValues from '@/shared/utils/translationsUtils';

import ProductListing from './products';

export default async function Home() {
  /* Fetch translations server-side using the locale from params. Keeping this logic server-side helps ensure the component remains a server component rather than being converted to a client component.
  If you later implement the useTranslation() hook (which runs on the client) the component would be automatically transformed into a client component.
  To maintain server-side execution, we extract the translation function (t) during the server-side render, passing the locale as the parameter*/
  const {t} = await translationUtilsValues();

  return (
    <div>
      {/* <Banner heading='Welcome to Car Tradez' /> */}
      <ProductListing />
    </div>
  );
}
