import { NextResponse } from "next/server";

// Free, self-hosted live Instagram feed via the Instagram Graph API.
// Set INSTAGRAM_TOKEN (a long-lived token for the @madessaco Business/Creator
// account) in Vercel, and point NEXT_PUBLIC_INSTAGRAM_FEED to "/api/instagram".
// The token stays server-side here. Refresh it every ~60 days (or wire a cron).
const TOKEN = process.env.INSTAGRAM_TOKEN;
const FIELDS = "id,media_type,media_url,thumbnail_url,permalink,caption";

export const revalidate = 1800; // refresh the feed every 30 min

export async function GET() {
  if (!TOKEN) return NextResponse.json({ data: [] });
  try {
    const url = `https://graph.instagram.com/me/media?fields=${FIELDS}&limit=12&access_token=${TOKEN}`;
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return NextResponse.json({ data: [] });
    const json = (await res.json()) as { data?: unknown[] };
    // The client normalizer picks media_url / thumbnail_url per item.
    return NextResponse.json({ data: json.data ?? [] });
  } catch {
    return NextResponse.json({ data: [] });
  }
}
