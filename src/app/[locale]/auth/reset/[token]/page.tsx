import type {Metadata} from 'next';

import ResetPasswordHandler from '@/shared/components/pages/auth/resetPassword';
import {ResetPasswordPageProps} from '@/shared/interfaces/auth';
import {
  generateMetadata as buildMetadata,
} from '@/shared/utils/metadataUtils';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    pageName: 'reset',
    noIndex: true,
  });
}

export default async function ResetPassword({
  params,
}: ResetPasswordPageProps) {
  const {token} = await params;

  return <ResetPasswordHandler token={token} />;
}