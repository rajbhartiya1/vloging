import { videos, type Video } from "@/lib/data";

type ShortsSort = "trending" | "recent";

export type ShortFeedItem = Pick<Video, "id" | "title" | "ytId" | "views" | "desc" | "author" | "category" | "tags">;

export type ShortsFeedResponse = {
  data: ShortFeedItem[];
  pageInfo: {
    nextCursor: string | null;
    hasMore: boolean;
  };
};

type QueryShortsInput = {
  limit: number;
  cursor: string | null;
  category: string | null;
  sort: ShortsSort;
};

const CACHE_TTL_MS = 10_000;
const cache = new Map<string, { expiresAt: number; value: ShortsFeedResponse }>();

function encodeCursor(index: number): string {
  return Buffer.from(String(index), "utf-8").toString("base64url");
}

function decodeCursor(cursor: string | null): number {
  if (!cursor) {
    return 0;
  }

  try {
    const raw = Buffer.from(cursor, "base64url").toString("utf-8");
    const parsed = Number.parseInt(raw, 10);
    if (Number.isNaN(parsed) || parsed < 0) {
      return 0;
    }
    return parsed;
  } catch {
    return 0;
  }
}

function normalizeCategory(category: string | null): string | null {
  if (!category) {
    return null;
  }

  const trimmed = category.trim().toLowerCase();
  return trimmed.length > 0 ? trimmed : null;
}

function toShortFeedItem(video: Video): ShortFeedItem {
  return {
    id: video.id,
    title: video.title,
    ytId: video.ytId,
    views: video.views,
    desc: video.desc,
    author: video.author,
    category: video.category,
    tags: video.tags,
  };
}

function getSortedVideos(sort: ShortsSort): Video[] {
  if (sort === "recent") {
    return [...videos].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  return [...videos].sort((a, b) => b.views - a.views);
}

export function queryShortsFeed(input: QueryShortsInput): ShortsFeedResponse {
  const normalizedCategory = normalizeCategory(input.category);
  const start = decodeCursor(input.cursor);
  const cacheKey = JSON.stringify({
    limit: input.limit,
    cursor: start,
    category: normalizedCategory,
    sort: input.sort,
  });

  const cached = cache.get(cacheKey);
  const now = Date.now();
  if (cached && cached.expiresAt > now) {
    return cached.value;
  }

  const sorted = getSortedVideos(input.sort);
  const filtered = normalizedCategory
    ? sorted.filter((video) => video.category.toLowerCase() === normalizedCategory)
    : sorted;

  const page = filtered.slice(start, start + input.limit).map(toShortFeedItem);
  const nextIndex = start + page.length;
  const hasMore = nextIndex < filtered.length;

  const response: ShortsFeedResponse = {
    data: page,
    pageInfo: {
      nextCursor: hasMore ? encodeCursor(nextIndex) : null,
      hasMore,
    },
  };

  cache.set(cacheKey, {
    expiresAt: now + CACHE_TTL_MS,
    value: response,
  });

  return response;
}
