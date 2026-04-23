"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun, Menu, X, User, Search, Heart, Clock, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchOverlay from "./SearchOverlay";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useUserDataStore } from "@/store/userDataStore";

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const syncFromBackend = useUserDataStore((state) => state.syncFromBackend);
  
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Note: Implementing minimal fake auth just for UI, replace with real auth later.
  const [user, setUser] = useState<{ email: string, name: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    if (document.cookie.includes("vloghub_auth=true")) {
      const rawUser = localStorage.getItem("vloghub_user");
      if (rawUser) {
        try {
          const parsed = JSON.parse(rawUser) as { email?: string; name?: string };
          setUser({
            email: parsed.email || "user@vloghub.com",
            name: parsed.name || "Raj Vlogger",
          });
        } catch {
          setUser({ email: "user@vloghub.com", name: "Raj Vlogger" });
        }
      } else {
        setUser({ email: "user@vloghub.com", name: "Raj Vlogger" });
      }
      void syncFromBackend();
    }
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [syncFromBackend]);

  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen);
  const handleLogout = () => {
    document.cookie = "vloghub_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("vloghub_user");
    setUser(null);
    window.location.href = "/login";
  };
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/shorts", label: "Shorts" },
    { href: "/live", label: "Live" },
    { href: "/library", label: "Library" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 border-b border-transparent ${isScrolled ? "bg-white/70 dark:bg-black/70 backdrop-blur-xl border-gray-200 dark:border-white/10 shadow-sm" : "bg-transparent"} py-3`}>
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
          <div className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl filter drop-shadow-sm">🎥</span> VlogHub
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-2 font-medium">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`px-4 py-2 flex items-center justify-center rounded-full transition-all text-sm font-bold shadow-sm ${isActive ? "bg-indigo-600 dark:bg-indigo-500 text-white shadow-indigo-200 dark:shadow-none hover:bg-indigo-700" : "bg-white/50 dark:bg-white/5 hover:bg-indigo-50 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 hover:-translate-y-0.5"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            
            <li className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2 hidden lg:block"></li>

            <li>
              <Button variant="ghost" size="icon" className="rounded-full rounded-full w-10 h-10" onClick={() => setIsSearchOpen(true)}>
                <Search size={18} />
              </Button>
            </li>

            {mounted && (
              <li>
                <Button variant="ghost" size="icon" className="rounded-full w-10 h-10" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </Button>
              </li>
            )}
            
            {user ? (
              <li className="ml-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full px-0 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all border border-gray-200 dark:border-zinc-800">
                      <User size={20} className="text-gray-700 dark:text-gray-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-xl" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer flex items-center"><User className="mr-2 h-4 w-4" /> Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/library/liked" className="cursor-pointer flex items-center"><Heart className="mr-2 h-4 w-4" /> Liked Vlogs</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/tracking" className="cursor-pointer flex items-center"><Activity className="mr-2 h-4 w-4" /> Tracking Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/library/watch-later" className="cursor-pointer flex items-center"><Clock className="mr-2 h-4 w-4" /> Watch Later</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400 cursor-pointer flex items-center">
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ) : (
              <li className="ml-2">
                <Button onClick={toggleAuthModal} className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all" size="sm">
                  <User size={16} className="mr-2" /> Sign In
                </Button>
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed inset-x-0 top-[72px] z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-gray-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
          >
            <ul className="flex flex-col p-4 gap-2 font-bold">
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link 
                    href={item.href} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className={`block p-4 rounded-xl transition-all ${pathname === item.href ? "bg-indigo-600 text-white" : "hover:bg-gray-100 dark:hover:bg-zinc-900 text-gray-800 dark:text-gray-200"}`}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              
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
                  setUser({ email: "test@vloghub.com", name: "New User" });
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
