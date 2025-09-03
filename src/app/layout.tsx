import './globals.css';
import {Inter} from 'next/font/google';
import {NodeChildrenProps} from '@/shared/interfaces/common';

const inter = Inter({subsets: ['latin']});

export default async function RootLayout({children}: NodeChildrenProps) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
