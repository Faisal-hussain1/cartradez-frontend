import type {Metadata} from 'next';

import LoginForm from '@/shared/components/pages/auth/login';
import {
  generateMetadata as buildMetadata,
} from '@/shared/utils/metadataUtils';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    pageName: 'login',
    noIndex: true,
  });
}

export default function LoginPage() {
  return <LoginForm />;
}