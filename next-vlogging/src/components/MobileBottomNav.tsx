"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, User, Hash } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileBottomNav() {
  const pathname = usePathname();

  type NavItem = {
    name: string;
    href: string;
    icon: typeof Home;
    special?: boolean;
  };

  const navItems: NavItem[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "Shorts", href: "/shorts", icon: Compass },
    // { name: "Community", href: "/community", icon: Hash, special: true },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-lg border-t border-gray-200 dark:border-zinc-800 pb-safe">
      <nav className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.special) {
            return (
              <Link key={item.name} href={item.href} className="relative -top-5 flex flex-col items-center justify-center">
                <div className="bg-indigo-600 text-white p-4 rounded-full shadow-lg shadow-indigo-500/30 hover:scale-105 transition-transform">
                  <Icon size={24} />
                </div>
              </Link>
            )
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 gap-1 transition-colors",
                isActive ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              )}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className={cn(isActive && "drop-shadow-sm")} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
