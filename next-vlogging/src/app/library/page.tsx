import Link from 'next/link';

export default function LibraryPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/library/history" className="group">
          <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl">
                ⏳
              </div>
              <div>
                <h2 className="text-xl font-semibold">History</h2>
                <p className="text-sm text-muted-foreground">Recent videos you've watched</p>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/library/watch-later" className="group">
          <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-xl">
                📥
              </div>
              <div>
                <h2 className="text-xl font-semibold">Watch Later</h2>
                <p className="text-sm text-muted-foreground">Videos saved for another time</p>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/library/liked" className="group">
          <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center text-xl">
                ❤️
              </div>
              <div>
                <h2 className="text-xl font-semibold">Liked Videos</h2>
                <p className="text-sm text-muted-foreground">Videos you've shown love to</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
