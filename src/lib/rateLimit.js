/**
 * Simple in-memory sliding-window rate limiter.
 *
 * Suitable for Next.js serverless (Vercel) — each function instance tracks its
 * own window. On a single-instance dev server it is exact; in a distributed
 * serverless environment it limits "per instance" rather than globally, which
 * is still a meaningful defence against scripted abuse.
 *
 * Usage:
 *   import { rateLimit } from "@/lib/rateLimit";
 *   const { limited, remaining } = rateLimit(request, { limit: 5, windowMs: 60_000 });
 *   if (limited) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
 */

const store = new Map(); // ip -> number[]  (timestamps of recent requests)

/**
 * @param {Request} request   - The incoming Next.js Request object
 * @param {{ limit: number, windowMs: number }} options
 *   limit    - Max requests allowed within the window (default: 5)
 *   windowMs - Rolling window in milliseconds        (default: 60_000 = 1 min)
 * @returns {{ limited: boolean, remaining: number, resetMs: number }}
 */
export function rateLimit(request, { limit = 5, windowMs = 60_000 } = {}) {
  // Resolve client IP from standard proxy headers (Vercel sets x-forwarded-for)
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

  const now = Date.now();
  const windowStart = now - windowMs;

  // Retrieve and prune expired timestamps
  const timestamps = (store.get(ip) || []).filter((t) => t > windowStart);

  if (timestamps.length >= limit) {
    // Oldest timestamp tells us when the window resets
    const resetMs = timestamps[0] + windowMs - now;
    return { limited: true, remaining: 0, resetMs };
  }

  // Record this request
  timestamps.push(now);
  store.set(ip, timestamps);

  // Periodically prune the store to avoid unbounded memory growth
  if (store.size > 10_000) {
    for (const [key, val] of store) {
      if (val.every((t) => t <= windowStart)) store.delete(key);
    }
  }

  return { limited: false, remaining: limit - timestamps.length, resetMs: 0 };
}
