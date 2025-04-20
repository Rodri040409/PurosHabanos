import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
import '@/styles/colors.css';

import { siteConfig } from '@/constant/config';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/images/logo.png', // ✅ Nuevo ícono basado en tu logo
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [
      {
        url: `${siteConfig.url}/images/og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Puros Orquídea - Elegancia en cada fumada',
      },
    ],
    type: 'website',
    locale: 'es_MX',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
    creator: '@purosorquidea',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es' className='scroll-smooth antialiased'>
      <head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='theme-color' content='#0C0F14' />
        <meta name='author' content='Puros Orquídea' />

        {/* ✅ Íconos personalizados con logo */}
        <link rel='icon' href='/images/logo.png' type='image/png' />
        <link rel='apple-touch-icon' href='/images/logo.png' />
        <link rel='shortcut icon' href='/images/logo.png' />

        {/* Fuentes */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Arapey:ital@0;1&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700;900&display=swap'
          rel='stylesheet'
        />

        {/* Swiper (si lo usas) */}
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css'
        />
      </head>
      <body className='bg-[#0C0F14] text-white selection:bg-[#C89B3C]/60'>
        {children}
      </body>
    </html>
  );
}
