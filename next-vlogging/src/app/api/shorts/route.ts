import { NextRequest } from "next/server";

import { queryShortsFeed } from "@/lib/server/shortsRepository";
import { consumeRateLimitToken } from "@/lib/server/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_LIMIT = 5;
const MAX_LIMIT = 12;

function parseLimit(value: string | null): number {
  if (!value) {
    return DEFAULT_LIMIT;
  }

  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return DEFAULT_LIMIT;
  }

  return Math.min(parsed, MAX_LIMIT);
}

export async function GET(request: NextRequest) {
  const gate = consumeRateLimitToken(
    "shorts-feed",
    { max: 70, windowMs: 10_000 },
    request.headers.get("x-forwarded-for"),
    request.headers.get("user-agent")
  );

  if (!gate.allowed) {
    return Response.json(
      { error: "Rate limit exceeded. Please retry shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(gate.retryAfterMs / 1000)),
        },
      }
    );
  }

  const params = request.nextUrl.searchParams;
  const limit = parseLimit(params.get("limit"));
  const cursor = params.get("cursor");
  const category = params.get("category");
  const sortRaw = params.get("sort");
  const sort = sortRaw === "recent" ? "recent" : "trending";

  const result = queryShortsFeed({
    limit,
    cursor,
    category,
    sort,
  });

  return Response.json(
    {
      ...result,
      meta: {
        rateLimitRemaining: gate.remaining,
      },
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=15, stale-while-revalidate=60",
      },
    }
  );
}
