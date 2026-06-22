import './globals.css';
import type {Metadata} from 'next';
import {NodeChildrenProps} from '@/shared/interfaces/common';

export const metadata: Metadata = {
  verification: {
    google: 'CxGxmV3WFjRbQkA-IVOziN1QTcX4sAf8CRuuDwGu3aU',
  },
};

export default async function RootLayout({children}: NodeChildrenProps) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
