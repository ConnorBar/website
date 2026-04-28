import { getAppleMusicRecentlyPlayed } from "@/lib/widgets";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getAppleMusicRecentlyPlayed();
  return NextResponse.json(data);
  // return NextResponse.json(data, {
  //   headers: {
  //     "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
  //   },
  // });
}
