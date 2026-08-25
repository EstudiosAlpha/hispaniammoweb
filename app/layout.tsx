import type { Metadata } from 'next';
import { Cinzel, Inter } from 'next/font/google';
import './globals.css';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import { asset } from './lib/assets';

const display = Cinzel({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
});

const body = Inter({
  variable: '--font-body',
  subsets: ['latin'],
});

const SITE_TITLE = 'HispaniaMMO — MMORPG medieval de la Hispania legendaria';
const SITE_DESCRIPTION =
  'MMORPG ambientado en una Hispania medieval y fantástica. 6 linajes, 18 ramas y 60 profesiones hasta nivel 75, asedios de castillo, clanes, alianzas y PvP.';

// Cambia esta dirección por el dominio definitivo cuando publiques la web.
// Sirve para que la imagen de portada se vea al compartir el enlace.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hispaniammo.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s · HispaniaMMO',
  },
  description: SITE_DESCRIPTION,
  icons: { icon: asset('/favicon.svg') },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'HispaniaMMO',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: asset('/og.png'), width: 1536, height: 864, alt: 'HispaniaMMO' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [asset('/og.png')],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
