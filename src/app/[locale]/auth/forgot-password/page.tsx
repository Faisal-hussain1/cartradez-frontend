import ForgotPasswordForm from '@/shared/components/pages/auth/forgotPassword';
import {generateMetadata} from '@/shared/utils/metadataUtils';

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}

export const metadata = async () => await generateMetadata('forgotPassword');
