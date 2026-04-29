import type { Metadata, Viewport } from 'next';
import { Fraunces, Instrument_Serif, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['SOFT'],
  display: 'swap',
  variable: '--font-fraunces',
});

const title = 'Drawers — Flow without distractions';
const description =
  'A macOS interface layer that gives every project its own space. Switch projects, switch worlds. Close the rest.';

export const metadata: Metadata = {
  metadataBase: new URL('https://drawers.computer'),
  title,
  description,
  icons: { icon: '/favicon.png' },
  openGraph: {
    type: 'website',
    title,
    description,
    siteName: 'Drawers',
    url: 'https://drawers.computer',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#faf1ee',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} ${fraunces.variable}`}>
      <head>
        <link rel="stylesheet" href="/devices.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
