import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchTrackingSnapshot, sendTrackingEvent } from '@/lib/trackingClient';

export interface WatchHistoryEntry {
  videoId: string;
  timestamp: number;
  progress: number; // 0 to 1
}

interface UserDataStore {
  // Watch History
  history: Record<string, WatchHistoryEntry>;
  addToHistory: (videoId: string, progress?: number) => void;
  getHistoryProgress: (videoId: string) => number | null;

  // Watch Later Queue
  watchLater: string[];
  toggleWatchLater: (videoId: string) => void;
  isInWatchLater: (videoId: string) => boolean;

  // Interactions (Likes/Dislikes)
  likes: Record<string, 'like' | 'dislike' | null>;
  setInteraction: (videoId: string, type: 'like' | 'dislike' | null) => void;
  getInteraction: (videoId: string) => 'like' | 'dislike' | null;
  syncFromBackend: () => Promise<void>;
}

export const useUserDataStore = create<UserDataStore>()(
  persist(
    (set, get) => ({
      history: {},
      addToHistory: (videoId, progress = 0.5) => {
        const boundedProgress = Math.max(0, Math.min(1, progress));
        set((state) => ({
          history: {
            ...state.history,
            [videoId]: { videoId, timestamp: Date.now(), progress: boundedProgress }
          }
        }));
        void sendTrackingEvent({
          videoId,
          eventType: 'watch_progress',
          progress: boundedProgress,
        });
      },
      getHistoryProgress: (videoId) => {
        return get().history[videoId]?.progress || null;
      },

      watchLater: [],
      toggleWatchLater: (videoId) => set((state) => {
        const index = state.watchLater.indexOf(videoId);
        const inWatchLater = index === -1;
        void sendTrackingEvent({
          videoId,
          eventType: 'watch_later',
          inWatchLater,
        });

        if (index > -1) {
          return { watchLater: state.watchLater.filter(id => id !== videoId) };
        }

        return { watchLater: [...state.watchLater, videoId] };
      }),
      isInWatchLater: (videoId) => get().watchLater.includes(videoId),

      likes: {},
      setInteraction: (videoId, type) => set((state) => {
        const nextInteraction = state.likes[videoId] === type ? null : type;
        void sendTrackingEvent({
          videoId,
          eventType: 'interaction',
          interaction: nextInteraction,
        });

        return {
          likes: {
            ...state.likes,
            [videoId]: nextInteraction
          }
        };
      }),
      getInteraction: (videoId) => get().likes[videoId] || null,
      syncFromBackend: async () => {
        const snapshot = await fetchTrackingSnapshot();
        if (!snapshot) {
          return;
        }

        set((state) => ({
          history: {
            ...state.history,
            ...snapshot.history,
          },
          watchLater: snapshot.watchLater,
          likes: {
            ...state.likes,
            ...snapshot.likes,
          },
        }));
      },
    }),
    {
      name: 'vloghub-user-data',
    }
  )
);
