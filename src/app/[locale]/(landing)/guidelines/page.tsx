import type {Metadata} from 'next';

import Guidelines from '@/shared/components/pages/landing/guidelines';
import {
  generateMetadata as buildMetadata,
} from '@/shared/utils/metadataUtils';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('guidelines');
}

export default function GuidelinesPage() {
  return <Guidelines />;
}