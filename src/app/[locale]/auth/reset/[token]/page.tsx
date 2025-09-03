import ResetPasswordHandler from '@/shared/components/pages/auth/resetPassword';
import {ResetPasswordPageProps} from '@/shared/interfaces/auth';
import {generateMetadata} from '@/shared/utils/metadataUtils';

export default async function ResetPassword({params}: ResetPasswordPageProps) {
  const {token} = await params;

  return <ResetPasswordHandler token={token} />;
}

export const metadata = async () => await generateMetadata('reset');
