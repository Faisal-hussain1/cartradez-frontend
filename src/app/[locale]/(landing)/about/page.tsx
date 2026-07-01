import type { Metadata } from 'next';
import AboutUs from '@/shared/components/pages/aboutUs/index';
import { generateMetadata as buildMetadata } from '@/shared/utils/metadataUtils';

export default function Page() {
  return <AboutUs />;
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    pageName: 'about',
  });
}