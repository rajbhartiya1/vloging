import React from 'react';
import TheatrePlayer from '@/components/TheatrePlayer';
import LiveChatWindow from '@/components/LiveChatWindow';
import SuperChatTicker from '@/components/SuperChatTicker';

export default function LivePage() {
  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main Content Area */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <TheatrePlayer />
          
          <div className="flex flex-col gap-2 p-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Exploring Tokyo at Night! 🌃 [LIVE]</h1>
            <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border-2 border-red-500 p-0.5">
                  <div className="w-full h-full bg-muted rounded-full overflow-hidden">
                    {/* fallback avatar */}
                    <div className="w-full h-full bg-gradient-to-tr from-blue-400 to-emerald-400"></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight text-foreground">Raj Creator</h3>
                  <p className="text-sm text-muted-foreground">1.2M Subscribers</p>
                </div>
                <button className="ml-4 bg-foreground text-background px-4 py-1.5 rounded-full font-semibold text-sm hover:opacity-90 transition">
                  Join
                </button>
              </div>

              <div className="flex items-center gap-2 bg-muted/50 rounded-full px-1 py-1 border border-border/50 shadow-sm">
                <button className="px-4 py-1.5 hover:bg-muted rounded-full transition text-sm font-medium flex items-center gap-2">
                  👍 12K
                </button>
                <div className="w-px h-4 bg-border"></div>
                <button className="px-4 py-1.5 hover:bg-muted rounded-full transition text-sm font-medium">
                  👎
                </button>
                <button className="px-4 py-1.5 hover:bg-muted rounded-full transition text-sm font-medium flex items-center gap-2">
                  ↪ Share
                </button>
              </div>
            </div>

            <SuperChatTicker />
            
            <div className="bg-muted/30 border border-border rounded-xl p-4 mt-2 text-sm leading-relaxed text-foreground/80">
              <span className="font-medium text-foreground block mb-1">Streaming started 2 hours ago</span>
              Thanks for joining the stream today! Drop a comment in the chat, dropping some merch soon if we hit 15k consecutive viewers. Enjoy! Be polite.
            </div>
          </div>
        </div>

        {/* Sidebar / Chat */}
        <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 h-[600px] lg:h-[calc(100vh-8rem)] sticky top-24">
          <LiveChatWindow />
        </div>

      </div>
    </div>
  );
}
