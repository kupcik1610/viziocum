import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import SiteChrome from './components/SiteChrome';

export const metadata: Metadata = {
  title: 'Glaukómová a neurooftalmologická ambulancia Banská Bystrica',
  description:
    'Oftalmologická glaukómová a neurooftalmologická ambulancia Banská Bystrica — MUDr. Mária Praženicová. Neštátne nezmluvné zdravotnícke zariadenie.',
  icons: { icon: '/images/viziocum_logo2.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk" dir="ltr">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <SiteChrome />
      </body>
    </html>
  );
}
