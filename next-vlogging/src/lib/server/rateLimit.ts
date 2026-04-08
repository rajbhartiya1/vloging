type RateLimiterEntry = {
  count: number;
  resetAt: number;
};

type RateLimiterOptions = {
  max: number;
  windowMs: number;
};

const store = new Map<string, RateLimiterEntry>();

function getClientIdentifier(forwardedFor: string | null, userAgent: string | null): string {
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";
  const ua = userAgent || "na";
  return `${ip}:${ua}`;
}

export function consumeRateLimitToken(
  bucketName: string,
  options: RateLimiterOptions,
  forwardedFor: string | null,
  userAgent: string | null
): { allowed: boolean; remaining: number; retryAfterMs: number } {
  const now = Date.now();
  const id = getClientIdentifier(forwardedFor, userAgent);
  const key = `${bucketName}:${id}`;
  const current = store.get(key);

  if (!current || now >= current.resetAt) {
    store.set(key, {
      count: 1,
      resetAt: now + options.windowMs,
    });

    return {
      allowed: true,
      remaining: options.max - 1,
      retryAfterMs: 0,
    };
  }

  if (current.count >= options.max) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: Math.max(current.resetAt - now, 0),
    };
  }

  current.count += 1;
  store.set(key, current);

  return {
    allowed: true,
    remaining: options.max - current.count,
    retryAfterMs: 0,
  };
}
