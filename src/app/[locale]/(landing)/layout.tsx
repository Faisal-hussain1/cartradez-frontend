import Header from '@/shared/components/common/header';
import Footer from '@/shared/components/common/footer';

export default function LandingRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <meta name="google-site-verification" content="CxGxmV3WFjRbQkA-IVOziN1QTcX4sAf8CRuuDwGu3aU" />
      <main>{children}</main>
      <Footer />
    </>
  );
}
