import { getAppleMusicRecentlyPlayed } from "@/lib/widgets";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // this tells nextjs to fetch instead of using cache

export async function GET() {
  const data = await getAppleMusicRecentlyPlayed();
  return NextResponse.json(data);
}
