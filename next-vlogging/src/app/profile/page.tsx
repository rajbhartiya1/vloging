import React from 'react';
import Link from 'next/link';
import { Bell, Clock3, Heart, History, Library, LogOut, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <section className="mb-7 rounded-3xl border border-indigo-200/60 dark:border-indigo-900/40 bg-gradient-to-r from-indigo-50 via-white to-purple-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs tracking-wide uppercase text-indigo-600 dark:text-indigo-400 font-semibold">Creator Profile</p>
            <h1 className="text-3xl font-black tracking-tight mt-1">Alex Vlogger</h1>
            <p className="text-sm text-muted-foreground mt-1">user@vloghub.com</p>
          </div>
          <Button asChild className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
            <Link href="/contact" className="inline-flex items-center gap-2">
              <Sparkles size={16} /> Upgrade Creator Profile
            </Link>
          </Button>
        </div>
      </section>

      <div className="flex flex-col md:flex-row items-start gap-8">
        <aside className="w-full md:w-1/3 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 text-center shadow-sm">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden border-4 border-white dark:border-zinc-900 shadow-md ring-4 ring-indigo-100 dark:ring-indigo-950/60">
                <span className="text-4xl text-muted-foreground">👤</span>
              </div>
              <Button asChild size="icon" className="absolute bottom-0 right-0 rounded-full w-9 h-9 shadow-md bg-indigo-600 hover:bg-indigo-700 text-white">
                <Link href="/contact" aria-label="Update avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                </Link>
              </Button>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Alex Vlogger</h2>
            <p className="text-muted-foreground text-sm">@alex_vlogger</p>
            <p className="text-muted-foreground text-xs mb-4">user@vloghub.com</p>
            <Button asChild variant="outline" className="w-full rounded-full"><Link href="/contact">Edit Profile</Link></Button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 text-center shadow-sm hover:-translate-y-0.5 transition-transform">
              <p className="text-base font-bold">24</p>
              <p className="text-xs text-muted-foreground">Uploads</p>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 text-center shadow-sm hover:-translate-y-0.5 transition-transform">
              <p className="text-base font-bold">4.8K</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 text-center shadow-sm hover:-translate-y-0.5 transition-transform">
              <p className="text-base font-bold">121K</p>
              <p className="text-xs text-muted-foreground">Views</p>
            </div>
          </div>
          
          <nav className="flex flex-col gap-2 rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 shadow-sm">
            <Button asChild variant="ghost" className="justify-start w-full rounded-xl"><Link href="/library" className="inline-flex items-center gap-2"><Library size={16} /> Your Library</Link></Button>
            <Button asChild variant="ghost" className="justify-start w-full rounded-xl"><Link href="/library/history" className="inline-flex items-center gap-2"><History size={16} /> Watch History</Link></Button>
            <Button asChild variant="ghost" className="justify-start w-full rounded-xl"><Link href="/library/watch-later" className="inline-flex items-center gap-2"><Clock3 size={16} /> Watch Later</Link></Button>
            <Button asChild variant="ghost" className="justify-start w-full rounded-xl"><Link href="/library/liked" className="inline-flex items-center gap-2"><Heart size={16} /> Liked Videos</Link></Button>
            <Button asChild variant="ghost" className="justify-start w-full rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"><Link href="/login" className="inline-flex items-center gap-2"><LogOut size={16} /> Sign Out</Link></Button>
          </nav>
        </aside>
        
        <main className="w-full md:w-2/3 space-y-6">
          <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 border-b pb-4">Theme Preferences</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 dark:border-zinc-700 rounded-2xl p-4 cursor-pointer hover:border-primary hover:shadow-sm transition-all flex flex-col items-center">
                <div className="w-full h-24 bg-zinc-100 rounded-md mb-3 border flex items-center justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                </div>
                <span className="font-medium">Light Mode</span>
              </div>
              <div className="border border-primary rounded-2xl p-4 cursor-pointer shadow-sm ring-2 ring-indigo-100 dark:ring-indigo-950/50 flex flex-col items-center">
                <div className="w-full h-24 bg-zinc-950 rounded-md mb-3 border border-zinc-800 flex items-center justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                </div>
                <span className="font-medium">Dark Mode</span>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 border-b pb-4 inline-flex items-center gap-2"><Bell size={18} className="text-indigo-500" /> Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">New Subscriptions</h3>
                  <p className="text-sm text-muted-foreground">Get notified when someone subscribes to your channel.</p>
                </div>
                <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Comments & Replies</h3>
                  <p className="text-sm text-muted-foreground">Receive alerts for new comments and replies.</p>
                </div>
                <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Marketing Emails</h3>
                  <p className="text-sm text-muted-foreground">Receive news, updates, and creator tips.</p>
                </div>
                <div className="w-11 h-6 bg-muted rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow-sm border"></div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
