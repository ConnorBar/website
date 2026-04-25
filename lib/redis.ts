import { createClient } from "redis";

const redis = createClient({
  url: process.env.WEBSITE_REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 50, 2000),
    keepAlive: true,
    keepAliveInitialDelay: 5000,
  },
});

redis.on("error", (err) => {
  // ECONNRESET is expected on idle connections — client will auto-reconnect
  if ((err as NodeJS.ErrnoException).code !== "ECONNRESET") {
    console.error("[Redis] client error:", err);
  }
});

export async function getRedis() {
  if (!redis.isOpen) {
    await redis.connect();
  }
  return redis;
}
