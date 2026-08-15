import type {Metadata} from 'next';

import ForgotPasswordForm from '@/shared/components/pages/auth/forgotPassword';
import {
  generateMetadata as buildMetadata,
} from '@/shared/utils/metadataUtils';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    pageName: 'forgotPassword',
    noIndex: true,
  });
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}