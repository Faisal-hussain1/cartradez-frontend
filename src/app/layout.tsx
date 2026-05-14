import './globals.css';
import {NodeChildrenProps} from '@/shared/interfaces/common';

export default async function RootLayout({children}: NodeChildrenProps) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
