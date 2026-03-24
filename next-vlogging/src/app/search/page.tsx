export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-muted-foreground">Showing results for <span className="text-foreground font-bold">"Tech Reviews"</span></h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0 space-y-6">
          <div className="bg-card border rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Filters</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Upload Date</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="date" /> Any time</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="date" /> Today</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="date" /> This week</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="date" /> This month</label>
                </div>
              </div>
              <div className="pt-4 border-t">
                <h4 className="font-medium text-sm mb-2">Duration</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="duration" /> Any</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="duration" /> Under 4 minutes</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="duration" /> 4 - 20 minutes</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="duration" /> Over 20 minutes</label>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-4 group cursor-pointer">
              <div className="relative w-full sm:w-72 aspect-video bg-muted rounded-xl overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-secondary/20 group-hover:bg-secondary/10 transition-colors"></div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium">10:45</div>
              </div>
              <div className="flex flex-col py-1">
                <h2 className="text-lg font-semibold line-clamp-2 leading-tight group-hover:text-primary transition-colors mb-1">Building a Dream Desk Setup 2026 - Ultimate Productivity</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>1.2M views</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                  <span>2 days ago</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-muted"></div>
                  <span className="text-sm font-medium">Alex Johnson</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">This is the ultimate dream desk setup for maximum productivity and aesthetic appeal. Featuring the latest tech and gadgets...</p>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
