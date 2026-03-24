import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import MobileBottomNav from '@/components/MobileBottomNav';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'VlogHub - Best Vlogs & Lifestyle Content',
  description: 'Discover trending vlogs in Travel, Tech, Lifestyle.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geistSans.variable + " " + geistMono.variable + " min-h-screen flex flex-col bg-slate-50 dark:bg-[#07070a] text-gray-900 dark:text-gray-100 antialiased overflow-x-hidden relative"}>
        {/* Ambient background glows */}
        <div className="fixed top-0 left-1/4 w-[1000px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none opacity-50 dark:opacity-20 animate-pulse" />
        <div className="fixed bottom-0 right-1/4 w-[800px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none opacity-50 dark:opacity-20 translate-x-1/2 translate-y-1/2" />
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-24 md:pb-12">
            {children}
          </main>
          <footer className="bg-gray-800 dark:bg-zinc-900 text-white text-center py-6 mt-auto hidden md:block">
            <p>&copy; {new Date().getFullYear()} VlogHub. All rights reserved.</p>
          </footer>
          <MobileBottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
