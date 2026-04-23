"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Activity, BookmarkCheck, Heart, History } from "lucide-react";

import { fetchTrackingSnapshot, getTrackingClientId, type TrackingSnapshot } from "@/lib/trackingClient";
import { getVideoById } from "@/lib/data";
import { Button } from "@/components/ui/button";

type HistoryRow = {
  videoId: string;
  title: string;
  progress: number;
  timestamp: number;
};

export default function TrackingDashboardPage() {
  const [snapshot, setSnapshot] = useState<TrackingSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [clientId, setClientId] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    async function loadSnapshot() {
      setIsLoading(true);
      const id = getTrackingClientId();
      const data = await fetchTrackingSnapshot();

      if (!isMounted) {
        return;
      }

      setClientId(id);
      setSnapshot(data);
      setIsLoading(false);
    }

    void loadSnapshot();

    return () => {
      isMounted = false;
    };
  }, []);

  const historyRows = useMemo<HistoryRow[]>(() => {
    if (!snapshot) {
      return [];
    }

    return Object.values(snapshot.history)
      .map((row) => {
        const video = getVideoById(row.videoId);
        return {
          videoId: row.videoId,
          title: video?.title || `Video #${row.videoId}`,
          progress: row.progress,
          timestamp: row.timestamp,
        };
      })
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [snapshot]);

  const likedRows = useMemo(() => {
    if (!snapshot) {
      return [];
    }

    return Object.entries(snapshot.likes)
      .filter(([, value]) => value === "like" || value === "dislike")
      .map(([videoId, value]) => {
        const video = getVideoById(videoId);
        return {
          videoId,
          title: video?.title || `Video #${videoId}`,
          interaction: value,
        };
      });
  }, [snapshot]);

  const watchLaterRows = useMemo(() => {
    if (!snapshot) {
      return [];
    }

    return snapshot.watchLater.map((videoId) => {
      const video = getVideoById(videoId);
      return {
        videoId,
        title: video?.title || `Video #${videoId}`,
      };
    });
  }, [snapshot]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
      <section className="rounded-3xl border border-emerald-200/60 dark:border-emerald-900/40 bg-gradient-to-r from-emerald-50 via-white to-cyan-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs tracking-wide uppercase text-emerald-700 dark:text-emerald-400 font-semibold">Backend Tracking</p>
            <h1 className="text-3xl font-black tracking-tight mt-1">Tracking Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-2">Realtime snapshot from Django backend for this browser client.</p>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/profile">Back to Profile</Link>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
          <p className="text-xs uppercase text-muted-foreground mb-2 inline-flex items-center gap-2"><History size={14} /> History Entries</p>
          <p className="text-3xl font-bold">{historyRows.length}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
          <p className="text-xs uppercase text-muted-foreground mb-2 inline-flex items-center gap-2"><Heart size={14} /> Reactions</p>
          <p className="text-3xl font-bold">{likedRows.length}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
          <p className="text-xs uppercase text-muted-foreground mb-2 inline-flex items-center gap-2"><BookmarkCheck size={14} /> Watch Later</p>
          <p className="text-3xl font-bold">{watchLaterRows.length}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
        <p className="text-xs uppercase text-muted-foreground mb-2 inline-flex items-center gap-2"><Activity size={14} /> Client ID</p>
        <p className="text-sm break-all text-gray-700 dark:text-gray-300">{clientId || "Loading client id..."}</p>
      </section>

      {isLoading ? (
        <section className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 text-center text-muted-foreground shadow-sm">
          Loading tracking data...
        </section>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <section className="xl:col-span-2 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Recent Watch History</h2>
            <div className="space-y-3">
              {historyRows.length === 0 ? (
                <p className="text-sm text-muted-foreground">No watch history tracked yet.</p>
              ) : (
                historyRows.slice(0, 10).map((item) => (
                  <div key={item.videoId} className="rounded-xl border border-gray-100 dark:border-zinc-800 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium leading-tight">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">Video ID: {item.videoId}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleString()}</p>
                    </div>
                    <div className="mt-3">
                      <div className="h-2 rounded-full bg-gray-100 dark:bg-zinc-800 overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${Math.round(item.progress * 100)}%` }} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Progress: {Math.round(item.progress * 100)}%</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <div className="space-y-4">
            <section className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Watch Later</h2>
              <div className="space-y-2">
                {watchLaterRows.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No saved videos yet.</p>
                ) : (
                  watchLaterRows.slice(0, 8).map((item) => (
                    <p key={item.videoId} className="text-sm border-b border-gray-100 dark:border-zinc-800 pb-2 last:border-0">{item.title}</p>
                  ))
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Likes and Dislikes</h2>
              <div className="space-y-2">
                {likedRows.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No reactions yet.</p>
                ) : (
                  likedRows.slice(0, 8).map((item) => (
                    <div key={item.videoId} className="flex items-center justify-between text-sm border-b border-gray-100 dark:border-zinc-800 pb-2 last:border-0">
                      <span className="pr-2">{item.title}</span>
                      <span className={item.interaction === "like" ? "text-emerald-600" : "text-rose-600"}>{item.interaction}</span>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
