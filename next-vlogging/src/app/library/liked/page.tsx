export default function LikedVideosPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Liked Videos</h1>
        <span className="text-sm bg-muted text-muted-foreground px-3 py-1 rounded-full">48 Videos</span>
      </div>
      <div className="bg-card border rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4 text-2xl">
          ❤️
        </div>
        <h2 className="text-xl font-semibold mb-2">Videos you liked will show up here</h2>
        <p className="text-muted-foreground mb-6">Like a video to save it to this list.</p>
        <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors">Start Watching</button>
      </div>
    </div>
  );
}
