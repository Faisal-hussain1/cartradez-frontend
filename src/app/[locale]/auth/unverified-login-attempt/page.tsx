import {HandleUnverifiedLogin} from '@/shared/components/pages/auth/unverifiedLogin';
import {generateMetadata} from '@/shared/utils/metadataUtils';

export default function UnVerifiedLoginAttemptPage() {
  return <HandleUnverifiedLogin />;
}

export const metadata = async () => await generateMetadata('unverifiedLogin');
