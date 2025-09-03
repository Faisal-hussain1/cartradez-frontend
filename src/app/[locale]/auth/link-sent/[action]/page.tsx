import {generateMetadata} from '@/shared/utils/metadataUtils';
import ActionMessage from '@/shared/components/pages/auth/linkSent';
import {LinkSentPageProps} from '@/shared/interfaces/auth';

export default async function LinkSentPage({params}: LinkSentPageProps) {
  const {action} = await params;

  return <ActionMessage action={action} />;
}

export const metadata = async () => await generateMetadata('linkSent');
