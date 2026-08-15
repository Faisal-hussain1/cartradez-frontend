import type {Metadata} from 'next';

import ActionMessage from '@/shared/components/pages/auth/linkSent';
import {
  generateMetadata as buildMetadata,
} from '@/shared/utils/metadataUtils';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    pageName: 'linkSent',
    noIndex: true,
  });
}

export default function LinkSentPage() {
  return <ActionMessage />;
}