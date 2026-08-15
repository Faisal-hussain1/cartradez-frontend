import type {Metadata} from 'next';

import UserVerificationHandler from '@/shared/components/pages/auth/verify';
import {VerifyPageProps} from '@/shared/interfaces/auth';
import {
  generateMetadata as buildMetadata,
} from '@/shared/utils/metadataUtils';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    pageName: 'verify',
    noIndex: true,
  });
}

export default async function VerifyPage({
  params,
}: VerifyPageProps) {
  const {token} = await params;

  return <UserVerificationHandler token={token} />;
}