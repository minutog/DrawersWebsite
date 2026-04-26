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

export const metadata: Metadata = {
  title: 'Drawers — Flow without distractions',
  description:
    'A macOS interface layer that gives every project its own space. Switch projects, switch worlds. Close the rest.',
  icons: { icon: '/favicon.png' },
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
