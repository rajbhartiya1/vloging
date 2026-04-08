import { NextRequest } from "next/server";

import { consumeRateLimitToken } from "@/lib/server/rateLimit";
import { enqueueShortsEvent, shortsSupportedEvents } from "@/lib/server/shortsTaskQueue";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ShortsEventRequest = {
  videoId?: string;
  eventType?: string;
  metadata?: Record<string, unknown>;
};

export async function POST(request: NextRequest) {
  const gate = consumeRateLimitToken(
    "shorts-events",
    { max: 40, windowMs: 10_000 },
    request.headers.get("x-forwarded-for"),
    request.headers.get("user-agent")
  );

  if (!gate.allowed) {
    return Response.json(
      { error: "Too many event requests. Please retry shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(gate.retryAfterMs / 1000)),
        },
      }
    );
  }

  let payload: ShortsEventRequest;
  try {
    payload = (await request.json()) as ShortsEventRequest;
  } catch {
    return Response.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const videoId = payload.videoId?.trim();
  const eventType = payload.eventType?.trim();

  if (!videoId || !eventType || !shortsSupportedEvents.includes(eventType as (typeof shortsSupportedEvents)[number])) {
    return Response.json(
      {
        error: "Invalid event payload.",
        supportedEvents: shortsSupportedEvents,
      },
      { status: 400 }
    );
  }

  const taskId = enqueueShortsEvent({
    videoId,
    eventType: eventType as (typeof shortsSupportedEvents)[number],
    metadata: payload.metadata,
  });

  return Response.json(
    {
      taskId,
      status: "queued",
      statusUrl: `/api/shorts/events/${taskId}`,
      rateLimitRemaining: gate.remaining,
    },
    { status: 202 }
  );
}
