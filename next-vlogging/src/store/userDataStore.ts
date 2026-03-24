import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
}

export const useUserDataStore = create<UserDataStore>()(
  persist(
    (set, get) => ({
      history: {},
      addToHistory: (videoId, progress = 0.5) => set((state) => ({
        history: {
          ...state.history,
          [videoId]: { videoId, timestamp: Date.now(), progress }
        }
      })),
      getHistoryProgress: (videoId) => {
        return get().history[videoId]?.progress || null;
      },

      watchLater: [],
      toggleWatchLater: (videoId) => set((state) => {
        const index = state.watchLater.indexOf(videoId);
        if (index > -1) {
          return { watchLater: state.watchLater.filter(id => id !== videoId) };
        } else {
          return { watchLater: [...state.watchLater, videoId] };
        }
      }),
      isInWatchLater: (videoId) => get().watchLater.includes(videoId),

      likes: {},
      setInteraction: (videoId, type) => set((state) => ({
        likes: {
          ...state.likes,
          [videoId]: state.likes[videoId] === type ? null : type
        }
      })),
      getInteraction: (videoId) => get().likes[videoId] || null,
    }),
    {
      name: 'vloghub-user-data',
    }
  )
);
