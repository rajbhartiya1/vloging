import { Button } from '@/components/ui/Button';

export default function HistoryPage() {
  const dummyHistory = [
    { id: 1, title: 'I Spent 100 Days in The Desert', author: 'Desert Fox', views: '2M', progress: 85, duration: '15:20', thumb: 'https://images.unsplash.com/photo-1549488344-c0201ad1594e?q=80&w=640' },
    { id: 2, title: 'Best Street Food in Tokyo 🍜', author: 'Foodie Travels', views: '500K', progress: 30, duration: '12:05', thumb: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=640' },
    { id: 3, title: 'Coding an AI in 24 Hours', author: 'Tech Bro', views: '1.2M', progress: 100, duration: '24:00', thumb: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=640' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <span className="text-primary bg-primary/10 p-2 rounded-lg text-2xl">⏳</span> History
        </h1>
        <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10 mt-4 sm:mt-0">
          Clear History
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {dummyHistory.map((video) => (
          <div key={video.id} className="group flex flex-col sm:flex-row gap-4 bg-card border rounded-2xl p-3 shadow-sm hover:shadow-md transition-all sm:items-center">
            <div className="relative w-full sm:w-64 h-36 flex-shrink-0 rounded-xl overflow-hidden bg-muted">
              <img src={video.thumb} alt={video.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium">
                {video.duration}
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30">
                <div className="h-full bg-red-500" style={{ width: `${video.progress}%` }}></div>
              </div>
            </div>
            <div className="flex flex-col flex-grow py-2">
              <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-2">{video.title}</h3>
              <p className="text-muted-foreground text-sm mb-2 hover:text-foreground cursor-pointer">{video.author}</p>
              <p className="text-muted-foreground text-xs">{video.views} views • Watched {(video.progress < 100) ? 'partially' : 'completely'}</p>
            </div>
            <Button variant="ghost" size="icon" className="self-start sm:self-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xl">✖</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}