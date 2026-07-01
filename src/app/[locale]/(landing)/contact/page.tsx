import type { Metadata } from 'next';
import { generateMetadata as buildMetadata } from '@/shared/utils/metadataUtils';
import ContactPage from '@/shared/components/pages/contact';

export default function Contact() {
  return <ContactPage />;
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    pageName: 'contact',
  });
}