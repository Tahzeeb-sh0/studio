
import type { Metadata } from 'next';
import { PT_Sans, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/context/auth-context';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'StuVerse',
  description: 'Smart Student Hub for achievement tracking and portfolio generation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ptSans.variable} ${poppins.variable}`}>
      <body className={cn("font-body antialiased")}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
