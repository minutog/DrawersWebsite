import type { Metadata, Viewport } from 'next';
import { Fraunces, Instrument_Serif, Inter } from 'next/font/google';
import './globals.css';
import { PostHogProvider } from './providers';

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
        {/* Preload hero-critical assets so they're ready before the user sees
            them.
            - drawer-word.png: gives the hero flip-word spacer its final width
              on first paint — otherwise the headline (width: fit-content +
              marginInline: auto) re-centers when the PNG finishes decoding,
              visually shifting the "A" left.
            - WhatIsADrawer_2.mp4: the 12 MB Drawer demo. The cycle reaches the
              Drawers step ~3s in (after Dock + Space holds), so kicking the
              download off here in parallel with JS/CSS means the bytes are
              cached by the time the <video> element mounts and fades in. */}
        <link rel="preload" as="image" href="/drawer-word.png" />
        <link rel="preload" as="video" type="video/mp4" href="/WhatIsADrawer_2.mp4" />
      </head>
      <body>
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
