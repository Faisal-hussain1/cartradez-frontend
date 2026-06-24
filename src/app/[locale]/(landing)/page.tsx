// import Home from '@/shared/components/pages/landing/home';
// import {generateMetadata} from '@/shared/utils/metadataUtils';

// export default function page() {
//   return <Home />;
// }

// export const metadata = async () => await generateMetadata('home');


import Home from '@/shared/components/pages/landing/home';
import { generateMetadata as buildMetadata } from '@/shared/utils/metadataUtils';
import type { Metadata } from 'next';

export default function Page() {
  return <Home />;
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    pageName: 'home',
  });
}