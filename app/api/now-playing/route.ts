import { getAppleMusicRecentlyPlayed } from "@/lib/widgets";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getAppleMusicRecentlyPlayed();
  return NextResponse.json(data);
}
