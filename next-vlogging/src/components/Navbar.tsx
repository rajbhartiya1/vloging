"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, User, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchOverlay from "./SearchOverlay";

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Note: Implementing minimal fake auth just for UI, replace with real auth later.
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen);
  const handleLogout = () => setUser(null);

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "glass" : "bg-transparent"} py-4`}>
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
          <div className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            <Link href="/">🚀 VlogHub</Link>
          </div>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6 font-medium">
            <li><Link href="/" className="hover:text-indigo-500 transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-indigo-500 transition-colors">About</Link></li>
            <li><Link href="/contact" className="hover:text-indigo-500 transition-colors">Contact</Link></li>
            
            <li className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2"></li>

            <li>
              <button 
                onClick={() => setIsSearchOpen(true)} 
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors flex items-center justify-center text-gray-700 dark:text-gray-300"
              >
                <Search size={20} />
              </button>
            </li>

            {mounted && (
              <li>
                <button 
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </li>
            )}
            
            {user ? (
              <li className="flex items-center gap-4">
                <span className="text-sm border border-gray-200 dark:border-gray-800 px-3 py-1.5 rounded-full">{user.email}</span>
                <button onClick={handleLogout} className="text-sm bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-full hover:opacity-90 transition-opacity">Logout</button>
              </li>
            ) : (
              <li>
                <button onClick={toggleAuthModal} className="text-sm bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full transition-colors flex items-center gap-2">
                  <User size={16} /> Sign In
                </button>
              </li>
            )}
          </ul>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <button 
              onClick={() => setIsSearchOpen(true)} 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <Search size={20} />
            </button>
            {mounted && (
              <button 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-x-0 top-[72px] z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg border-b border-gray-200 dark:border-zinc-800 shadow-xl"
          >
            <ul className="flex flex-col p-4 gap-4 font-medium">
              <li><Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900">Home</Link></li>
              <li><Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900">About</Link></li>
              <li><Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900">Contact</Link></li>
              
              <li className="h-px bg-gray-200 dark:bg-zinc-800 my-2"></li>
              
              {user ? (
                <>
                  <li className="p-2 text-sm text-gray-500 dark:text-gray-400">Signed in as {user.email}</li>
                  <li><button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full text-left p-2 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30">Logout</button></li>
                </>
              ) : (
                <li>
                  <button onClick={() => { toggleAuthModal(); setIsMobileMenuOpen(false); }} className="w-full bg-indigo-500 text-white p-3 rounded-xl flex justify-center items-center gap-2">
                    <User size={18} /> Sign In / Register
                  </button>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Auth Modal */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000] p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 dark:border dark:border-zinc-800 p-8 rounded-3xl max-w-sm w-full shadow-2xl relative"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-extrabold tracking-tight">{isLogin ? "Welcome back" : "Join VlogHub"}</h3>
                <button onClick={toggleAuthModal} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors bg-gray-100 dark:bg-zinc-800 p-2 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <form className="flex flex-col gap-5" onSubmit={(e) => {
                  e.preventDefault();
                  setUser({ email: "test@vloghub.com" });
                  toggleAuthModal();
              }}>
                <div className="space-y-4">
                  <input type="email" placeholder="Email address" required className="p-4 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-2xl w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" />
                  <input type="password" placeholder="Password" required className="p-4 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-2xl w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" />
                  {!isLogin && <input type="text" placeholder="Full Name" required className="p-4 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-2xl w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" />}
                </div>
                
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-4 rounded-2xl mt-4 transition-all active:scale-[0.98]">
                  {isLogin ? "Sign In" : "Create Account"}
                </button>
                <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-indigo-600 dark:text-indigo-400 font-medium py-2 px-4 rounded-xl transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-950/30">
                  {isLogin ? "Need an account? Register" : "Already have an account? Sign In"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
