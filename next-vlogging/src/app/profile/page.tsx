import React from 'react';
import { Button } from '@/components/ui/Button';

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <aside className="w-full md:w-1/3 space-y-6">
          <div className="bg-card border rounded-2xl p-6 text-center shadow-sm">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden border-4 border-background shadow-md">
                <span className="text-4xl text-muted-foreground">👤</span>
              </div>
              <Button size="icon" className="absolute bottom-0 right-0 rounded-full w-8 h-8 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </Button>
            </div>
            <h1 className="text-2xl font-bold">Alex Johnson</h1>
            <p className="text-muted-foreground text-sm mb-4">@alexj_vlogs</p>
            <Button variant="outline" className="w-full">Edit Profile</Button>
          </div>
          
          <nav className="flex flex-col gap-2">
            <Button variant="ghost" className="justify-start w-full">Account Settings</Button>
            <Button variant="ghost" className="justify-start w-full">Channel Analytics</Button>
            <Button variant="ghost" className="justify-start w-full">Revenue & Payouts</Button>
            <Button variant="ghost" className="justify-start w-full text-destructive hover:bg-destructive/10 hover:text-destructive">Sign Out</Button>
          </nav>
        </aside>
        
        <main className="w-full md:w-2/3 space-y-6">
          <section className="bg-card border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 border-b pb-4">Theme Preferences</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-xl p-4 cursor-pointer hover:border-primary transition-colors flex flex-col items-center">
                <div className="w-full h-24 bg-zinc-100 rounded-md mb-3 border flex items-center justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                </div>
                <span className="font-medium">Light Mode</span>
              </div>
              <div className="border border-primary rounded-xl p-4 cursor-pointer flex flex-col items-center">
                <div className="w-full h-24 bg-zinc-950 rounded-md mb-3 border border-zinc-800 flex items-center justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                </div>
                <span className="font-medium">Dark Mode</span>
              </div>
            </div>
          </section>

          <section className="bg-card border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 border-b pb-4">Notification Preferences</h2>
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