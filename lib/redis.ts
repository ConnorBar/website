import { createClient } from "redis";

const redis = createClient({ url: process.env.WEBSITE_REDIS_URL });

redis.on("error", (err) => console.error("[Redis] client error:", err));

export async function getRedis() {
  if (!redis.isOpen) {
    console.log("[Redis] connecting...");
    await redis.connect();
  }
  return redis;
}
