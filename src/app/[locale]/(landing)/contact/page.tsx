import {generateMetadata} from '@/shared/utils/metadataUtils';
import ContactPage from '@/shared/components/pages/contact';

export default function Contact() {
  return <ContactPage />;
}

export const metadata = async () => await generateMetadata('contact');
