"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { NowPlayingData } from "@/lib/widgets";

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [open, setOpen] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const prevTitleRef = useRef<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js-cdn.music.apple.com/musickit/v3/musickit.js";
    script.async = true;
    script.onload = async () => {
      try {
        // @ts-expect-error MusicKit loaded via CDN
        await window.MusicKit.configure({
          developerToken: process.env.NEXT_PUBLIC_APPLE_MUSIC_DEVELOPER_TOKEN,
          app: { name: "cobars.space", build: "1.0" },
        });
      } catch { }
    };
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/now-playing");
        if (!res.ok) return;
        const next = await res.json() as NowPlayingData;

        // Try to get real-time playback state from MusicKit JS
        try {
          // @ts-expect-error MusicKit loaded via CDN
          const mk = window.MusicKit?.getInstance?.();
          if (mk) {
            // Only upgrade to playing — never downgrade Redis result
            if (mk.isPlaying) next.isPlaying = true;
            if (mk.isPlaying && mk.nowPlayingItem) {
              const nowTitle = mk.nowPlayingItem.attributes?.name;
              if (nowTitle && nowTitle !== next.current?.title) {
                // MusicKit knows about a song the server doesn't yet — trust it
                next.current = {
                  title: nowTitle,
                  artist: mk.nowPlayingItem.attributes?.artistName ?? "",
                  albumArt: mk.nowPlayingItem.attributes?.artwork?.url
                    ?.replace("{w}", "64").replace("{h}", "64"),
                  url: mk.nowPlayingItem.attributes?.url ?? "",
                };
              }
            }
          }
        } catch { }

        const nextTitle = next?.current?.title ?? null;
        if (prevTitleRef.current !== null && prevTitleRef.current !== nextTitle) {
          setAnimKey((k) => k + 1);
        }
        prevTitleRef.current = nextTitle;
        setData(next);
      } catch { }
    }
    load();
    const interval = setInterval(load, 10_000);
    // const interval = setInterval(load, 30_000); // playing w cacheing
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!data?.current) return <div className="w-[200px]" />;

  const { isPlaying, current, recent } = data;

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes soundbar {
          0%, 100% { height: 3px; }
          50%       { height: 10px; }
        }
        .now-playing-text {
          animation: slideInRight 0.3s ease forwards;
        }
        .bar1 { animation: soundbar 0.9s ease-in-out infinite; }
        .bar2 { animation: soundbar 0.9s ease-in-out infinite 0.2s; }
        .bar3 { animation: soundbar 0.9s ease-in-out infinite 0.4s; }
      `}</style>

      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors hover:bg-white/10"
        >
          {/* Sound bar or static dot */}
          {isPlaying ? (
            <span className="flex items-end gap-[2px] h-[10px] shrink-0">
              <span className="bar1 w-[2px] rounded-full bg-green-400 inline-block" />
              <span className="bar2 w-[2px] rounded-full bg-green-400 inline-block" />
              <span className="bar3 w-[2px] rounded-full bg-green-400 inline-block" />
            </span>
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-gray-600 shrink-0" />
          )}

          <span className="text-gray-400 text-xs">♪</span>

          {/* Swipe-in text on song change */}
          <span
            key={animKey}
            className="now-playing-text flex items-center gap-1.5 overflow-hidden"
          >
            <span className="text-xs text-gray-300 max-w-[120px] truncate">
              {current.title}
            </span>
            <span className="text-xs text-gray-600 hidden md:inline">—</span>
            <span className="text-xs text-gray-500 max-w-[80px] truncate hidden md:inline">
              {current.artist}
            </span>
          </span>
        </button>

        {open && (
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-xl overflow-hidden z-50 border border-white/10"
            style={{ backgroundColor: "#1c1c1e", boxShadow: "0 16px 40px rgba(0,0,0,0.6)" }}
          >
            <p className="mono text-xs text-gray-600 px-4 pt-3 pb-2 uppercase tracking-widest">
              Recent tracks
            </p>
            {recent.map((t, i) => (
              <a
                key={i}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2.5 transition-colors group"
                style={{ backgroundColor: "transparent" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {t.albumArt ? (
                  <Image
                    src={t.albumArt}
                    alt={t.title}
                    width={32}
                    height={32}
                    className="rounded shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded shrink-0 bg-white/10 flex items-center justify-center text-xs text-gray-500">
                    ♪
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-200 truncate group-hover:text-white transition-colors">
                    {t.title}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{t.artist}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {i === 0 && isPlaying && (
                    <span className="flex items-end gap-[2px] h-[10px]">
                      <span className="bar1 w-[2px] rounded-full bg-green-400 inline-block" />
                      <span className="bar2 w-[2px] rounded-full bg-green-400 inline-block" />
                      <span className="bar3 w-[2px] rounded-full bg-green-400 inline-block" />
                    </span>
                  )}
                  <span className="text-gray-600 group-hover:text-gray-400 transition-colors text-xs">↗</span>
                </div>
              </a>
            ))}
            <div className="px-4 py-2 border-t border-white/5">
              <span className="mono text-xs text-gray-600">via apple music</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
