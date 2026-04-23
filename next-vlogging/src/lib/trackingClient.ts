const TRACKING_CLIENT_ID_KEY = "vloghub_tracking_client_id";
const DJANGO_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE || "http://127.0.0.1:8000";

export type TrackingEventPayload = {
  videoId: string;
  eventType: "watch_progress" | "interaction" | "watch_later";
  progress?: number;
  interaction?: "like" | "dislike" | null;
  inWatchLater?: boolean;
};

export type TrackingSnapshot = {
  history: Record<string, { videoId: string; timestamp: number; progress: number }>;
  watchLater: string[];
  likes: Record<string, "like" | "dislike" | null>;
};

export function getTrackingClientId(): string {
  if (typeof window === "undefined") {
    return "server";
  }

  const existing = localStorage.getItem(TRACKING_CLIENT_ID_KEY);
  if (existing) {
    return existing;
  }

  const generated = `cid_${Math.random().toString(36).slice(2)}_${Date.now()}`;
  localStorage.setItem(TRACKING_CLIENT_ID_KEY, generated);
  return generated;
}

export async function sendTrackingEvent(payload: TrackingEventPayload): Promise<void> {
  if (typeof window === "undefined") {
    return;
  }

  const clientId = getTrackingClientId();

  try {
    await fetch(`${DJANGO_BASE_URL}/api/tracking/event/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client-Id": clientId,
      },
      body: JSON.stringify(payload),
    });
  } catch {
    // Best-effort tracking: ignore network errors in UI flow.
  }
}

export async function fetchTrackingSnapshot(): Promise<TrackingSnapshot | null> {
  if (typeof window === "undefined") {
    return null;
  }

  const clientId = getTrackingClientId();

  try {
    const response = await fetch(`${DJANGO_BASE_URL}/api/tracking/snapshot/?client_id=${encodeURIComponent(clientId)}`, {
      method: "GET",
      headers: {
        "X-Client-Id": clientId,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const payload = await response.json();
    return payload?.data ?? null;
  } catch {
    return null;
  }
}
