import LoginForm from '@/shared/components/pages/auth/login';
import {generateMetadata} from '@/shared/utils/metadataUtils';

export default function LoginPage() {
  return <LoginForm />;
}

export const metadata = async () => await generateMetadata('login');
