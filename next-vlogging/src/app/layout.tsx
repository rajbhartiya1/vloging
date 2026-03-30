import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
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

const FOOTER_YEAR = 2026;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={geistSans.variable + " " + geistMono.variable + " min-h-screen flex flex-col bg-slate-50 dark:bg-[#07070a] text-gray-900 dark:text-gray-100 antialiased overflow-x-hidden relative"}>
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
          <footer className="bg-gray-800 dark:bg-zinc-900 text-white mt-auto border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
              <div className="col-span-2 md:col-span-1">
                <p className="text-lg font-bold mb-3">VlogHub</p>
                <p className="text-gray-300">Discover trending vlogs, live streams, shorts, and creator communities in one place.</p>
              </div>
              <div>
                <p className="font-semibold mb-3">Explore</p>
                <ul className="space-y-2 text-gray-300">
                  <li><Link href="/shorts" className="hover:text-white transition-colors">Shorts</Link></li>
                  <li><Link href="/live" className="hover:text-white transition-colors">Live</Link></li>
                  <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
                  <li><Link href="/shop" className="hover:text-white transition-colors">Shop</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-3">Library</p>
                <ul className="space-y-2 text-gray-300">
                  <li><Link href="/library" className="hover:text-white transition-colors">Library Home</Link></li>
                  <li><Link href="/library/history" className="hover:text-white transition-colors">History</Link></li>
                  <li><Link href="/library/watch-later" className="hover:text-white transition-colors">Watch Later</Link></li>
                  <li><Link href="/library/liked" className="hover:text-white transition-colors">Liked Videos</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-3">Company</p>
                <ul className="space-y-2 text-gray-300">
                  <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 py-4 px-4 text-center text-xs text-gray-300">
              <p>&copy; {FOOTER_YEAR} VlogHub. All rights reserved.</p>
            </div>
          </footer>
          <MobileBottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
