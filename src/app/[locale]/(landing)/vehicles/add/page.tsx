import type {Metadata} from 'next';

import AddVehicleForm from '@/shared/components/pages/landing/addVehicle';
import {
  generateMetadata as buildMetadata,
} from '@/shared/utils/metadataUtils';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    pageName: 'addVehicles',
    noIndex: true,
  });
}

export default function Page() {
  return <AddVehicleForm />;
}