import type { Metadata } from 'next';
import Header from '@/shared/components/common/header';
import Footer from '@/shared/components/common/footer';

export const metadata: Metadata = {
  verification: {
    google: 'CxGxmV3WFjRbQkA-IVOziN1QTcX4sAf8CRuuDwGu3aU',
  },
};

export default function LandingRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}