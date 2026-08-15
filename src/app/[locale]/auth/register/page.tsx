import type {Metadata} from 'next';

import RegisterForm from '@/shared/components/pages/auth/register';
import {
  generateMetadata as buildMetadata,
} from '@/shared/utils/metadataUtils';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    pageName: 'register',
    noIndex: true,
  });
}

export default function Register() {
  return <RegisterForm />;
}