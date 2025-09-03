import RegisterForm from '@/shared/components/pages/auth/register';
import {generateMetadata} from '@/shared/utils/metadataUtils';

export default function Register() {
  return <RegisterForm />;
}

export const metadata = async () => await generateMetadata('register');
