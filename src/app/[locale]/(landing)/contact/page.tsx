// import UnderDevelopment from '@/shared/components/pages/underDevelopment';

// const Contact = () => <UnderDevelopment />;

// export default Contact;
import {generateMetadata} from '@/shared/utils/metadataUtils';
import ContactPage from '@/shared/components/pages/dashboard/contact';

export default function Contact() {
  return <ContactPage />;
}

export const metadata = async () => await generateMetadata('contact');
