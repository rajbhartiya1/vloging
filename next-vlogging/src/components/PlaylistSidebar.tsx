import React from 'react';
import Link from 'next/link';
import { Badge } from './ui/badge';

const mockEpisodes = [
  { id: 1, title: 'Preparing for the Journey', duration: '12:40', active: true, thumb: 'bg-indigo-300' },
  { id: 2, title: 'Arrival in Kyoto', duration: '15:20', active: false, thumb: 'bg-indigo-400' },
  { id: 3, title: 'The Hidden Temples', duration: '18:05', active: false, thumb: 'bg-indigo-500' },
  { id: 4, title: 'Street Food Tour', duration: '14:30', active: false, thumb: 'bg-indigo-600' },
  { id: 5, title: 'Train Ride to Osaka', duration: '20:10', active: false, thumb: 'bg-indigo-700' },
];

export default function PlaylistSidebar() {
  return (
    <div className="w-full bg-card border border-border rounded-xl overflow-hidden flex flex-col h-[500px] lg:h-full shadow-sm">
      <div className="p-4 border-b border-border bg-muted/20">
        <h3 className="font-bold text-lg">Up Next</h3>
        <p className="text-sm text-muted-foreground mt-1">Autoplay is ON</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {mockEpisodes.map((ep, index) => (
          <Link 
            key={ep.id} 
            href={`#ep-${ep.id}`}
            className={`flex items-start gap-4 p-4 border-b border-border transition-colors hover:bg-muted/40 cursor-pointer ${ep.active ? 'bg-muted/60' : ''}`}
          >
            <div className="text-sm font-medium text-muted-foreground mt-2 w-4 text-center">
              {ep.active ? '▶' : index + 1}
            </div>
            
            <div className={`w-32 aspect-video rounded-md overflow-hidden shrink-0 ${ep.thumb} relative group`}>
              <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                {ep.duration}
              </span>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white drop-shadow-md">▶</span>
              </div>
            </div>

            <div className="flex flex-col gap-1 pr-2">
              <h4 className={`text-sm font-semibold line-clamp-2 leading-snug ${ep.active ? 'text-primary' : 'text-foreground'}`}>
                {ep.title}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-1">VlogHub Creator</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
