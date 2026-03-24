export default function WatchLaterPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Watch Later</h1>
        <span className="text-sm bg-muted text-muted-foreground px-3 py-1 rounded-full">12 Videos</span>
      </div>
      <div className="bg-card border rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">⏳</span>
        </div>
        <h2 className="text-xl font-semibold mb-2">No videos saved yet</h2>
        <p className="text-muted-foreground mb-6">Videos you add to Watch Later will appear here.</p>
        <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors">Explore Videos</button>
      </div>
    </div>
  );
}
