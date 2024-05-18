import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import AppHeader from '@/components/header/AppHeader';

export const metadata: Metadata = {
  title: 'Connect Up',
  description: 'Connect with similar business minds',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <AppHeader />
          <main className='container mx-auto p-10'>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
