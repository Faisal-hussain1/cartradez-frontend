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
      <main>{children}</main>
      <Footer />
    </>
  );
}
