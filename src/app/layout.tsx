import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/style/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'My App Ecommerce',
  description:
    'A streamlined e-commerce platform built for fast browsing and secure Stripe payments.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-hk" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <div className="flex min-h-screen items-center justify-center font-san">
            <main className="min-h-screen w-full">{children}</main>
          </div>
          <Toaster richColors expand={true} />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
