import Header from '@/shared/components/common/header';
import Footer from '@/shared/components/common/footer';
import {GoogleAnalytics} from '@next/third-parties/google';
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
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
  <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
)}
    </>
  );
}
