import {generateMetadata} from '@/shared/utils/metadataUtils';
import DashboardContent from '@/shared/components/pages/dashboard';

export default function Dashboard() {
  return <DashboardContent />;
}

export const metadata = async () => await generateMetadata('dashboard');
