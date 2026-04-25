// ── Shared types ─────────────────────────────────────────────────────────────

export type Track = {
  title: string;
  artist: string;
  albumArt?: string;
  url: string;
};

export type NowPlayingData = {
  isPlaying: boolean;
  current: Track | null;
  recent: Track[];
};

// ── Spotify ──────────────────────────────────────────────────────────────────

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_RECENT_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=5";

async function getSpotifyToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  const data = await res.json();
  return data.access_token;
}

export async function getSpotifyNowPlaying(): Promise<NowPlayingData> {
  try {
    const token = await getSpotifyToken();
    const headers = { Authorization: `Bearer ${token}` };

    const [nowRes, recentRes] = await Promise.all([
      fetch(SPOTIFY_NOW_PLAYING_URL, { headers, cache: "no-store" }),
      fetch(SPOTIFY_RECENT_URL, { headers, cache: "no-store" }),
    ]);

    // Build recent tracks from history
    const recentData = recentRes.ok ? await recentRes.json() : null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recent: Track[] = (recentData?.items ?? []).map((item: any) => ({
      title: item.track.name,
      artist: item.track.artists.map((a: any) => a.name).join(", "),
      albumArt: item.track.album.images[1]?.url,
      url: item.track.external_urls.spotify,
    }));

    // Check if something is actively playing
    if (nowRes.status === 204 || !nowRes.ok) {
      return { isPlaying: false, current: recent[0] ?? null, recent };
    }

    const nowData = await nowRes.json();
    if (!nowData?.item) {
      return { isPlaying: false, current: recent[0] ?? null, recent };
    }

    const current: Track = {
      title: nowData.item.name,
      artist: nowData.item.artists.map((a: any) => a.name).join(", "),
      albumArt: nowData.item.album.images[1]?.url,
      url: nowData.item.external_urls.spotify,
    };

    // Prepend current track to recent if not already there
    const recentWithCurrent = [
      current,
      ...recent.filter((t) => t.title !== current.title),
    ].slice(0, 5);

    return { isPlaying: true, current, recent: recentWithCurrent };
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    return { isPlaying: false, current: null, recent: [] };
  }
}

// ── Apple Music ──────────────────────────────────────────────────────────────

const PLAY_BUFFER_MS = 12_000; // 12s buffer for network delay + poll lag
const REDIS_KEY = "nowplaying:current";

type CachedTrack = {
  title: string;
  seenAt: number;
  durationInMillis: number;
};

export async function getAppleMusicRecentlyPlayed(): Promise<NowPlayingData> {
  const developerToken = process.env.APPLE_MUSIC_DEVELOPER_TOKEN;
  const musicUserToken = process.env.APPLE_MUSIC_USER_TOKEN;

  if (!developerToken || !musicUserToken) {
    return { isPlaying: false, current: null, recent: [] };
  }

  const headers = {
    Authorization: `Bearer ${developerToken}`,
    "Music-User-Token": musicUserToken,
  };

  try {
    const recentRes = await fetch(
      "https://api.music.apple.com/v1/me/recent/played/tracks?limit=5",
      { headers, cache: "no-store" }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapAppleTrack = (item: any): Track => ({
      title: item.attributes.name,
      artist: item.attributes.artistName,
      albumArt: item.attributes.artwork
        ? item.attributes.artwork.url.replace("{w}", "64").replace("{h}", "64")
        : undefined,
      url: item.attributes.url
        ?? `https://music.apple.com/search?term=${encodeURIComponent(item.attributes.artistName + " " + item.attributes.name)}`,
    });

    const recentData = recentRes.ok ? await recentRes.json() : null;
    const recent: Track[] = (recentData?.data ?? []).map(mapAppleTrack);

    const firstTrack = recentData?.data?.[0];
    if (!firstTrack) return { isPlaying: false, current: null, recent: [] };

    const firstTitle: string = firstTrack.attributes.name;
    const durationInMillis: number = firstTrack.attributes.durationInMillis ?? 0;

    // Redis-backed isPlaying heuristic
    let isPlaying = false;
    try {
      const { getRedis } = await import("@/lib/redis");
      const redis = await getRedis();
      const raw = await redis.get(REDIS_KEY);
      const cached: CachedTrack | null = raw ? JSON.parse(raw) : null;

      if (!cached || cached.title !== firstTitle) {
        const entry: CachedTrack = { title: firstTitle, seenAt: Date.now(), durationInMillis };
        await redis.set(REDIS_KEY, JSON.stringify(entry), { EX: 3600 });
        isPlaying = true;
      } else {
        isPlaying = Date.now() - cached.seenAt < cached.durationInMillis + PLAY_BUFFER_MS;
      }
    } catch (e) {
      console.error("[Redis] isPlaying check failed:", e);
    }

    console.log("[NowPlaying] isPlaying:", isPlaying, "| title:", firstTitle);
    return { isPlaying, current: mapAppleTrack(firstTrack), recent };
  } catch (error) {
    console.error("Error fetching Apple Music data:", error);
    return { isPlaying: false, current: null, recent: [] };
  }
}

