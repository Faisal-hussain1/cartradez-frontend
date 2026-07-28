import type {Metadata} from 'next';

import Faq from '@/shared/components/pages/landing/faq';
import {
  generateMetadata as buildMetadata,
} from '@/shared/utils/metadataUtils';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('faq');
}

export default function FaqPage() {
  return <Faq />;
}   