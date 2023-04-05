import { Ratelimit } from "@upstash/ratelimit";
import redis from "@/lib/redis";

// Allow 3 requests, every 60 seconds
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(20, "60 s"),
      analytics: false,
    })
  : undefined;

export default ratelimit;
