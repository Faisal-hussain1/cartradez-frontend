import type {Metadata} from 'next';

import {HandleUnverifiedLogin} from '@/shared/components/pages/auth/unverifiedLogin';
import {
  generateMetadata as buildMetadata,
} from '@/shared/utils/metadataUtils';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    pageName: 'unverifiedLogin',
    noIndex: true,
  });
}

export default function UnVerifiedLoginAttemptPage() {
  return <HandleUnverifiedLogin />;
}