// Live Instagram feed wiring.
//
// Set NEXT_PUBLIC_INSTAGRAM_FEED to a public JSON feed URL and the site shows
// the live @madessaco feed; otherwise it falls back to the curated photos.
//
// Easiest source: Behold.so (free) — connect @madessaco once, copy the JSON
// feed URL. It auto-refreshes, is CORS-friendly, and needs no token in our code.
// The normalizer below also handles the official Instagram Graph API shape
// ({ data: [{ media_url, permalink, ... }] }).

export type IgPost = { image: string; permalink: string; caption?: string };

type Loose = Record<string, unknown>;

function pickImage(p: Loose): string | undefined {
  // Behold: sizes.medium.mediaUrl / mediaUrl / thumbnailUrl; Graph: media_url / thumbnail_url
  const sizes = p.sizes as Loose | undefined;
  const medium = sizes?.medium as Loose | undefined;
  return (
    (medium?.mediaUrl as string) ||
    (p.thumbnailUrl as string) ||
    (p.mediaUrl as string) ||
    (p.thumbnail_url as string) ||
    (p.media_url as string) ||
    undefined
  );
}

export function normalizeFeed(json: unknown): IgPost[] {
  const arr: Loose[] = Array.isArray(json)
    ? (json as Loose[])
    : ((json as Loose)?.posts as Loose[]) ||
      ((json as Loose)?.data as Loose[]) ||
      [];
  return arr
    .map((p) => {
      const image = pickImage(p);
      const permalink = (p.permalink as string) || (p.link as string) || "";
      if (!image) return null;
      return { image, permalink, caption: (p.caption as string) || "" };
    })
    .filter((p): p is IgPost => p !== null);
}

export async function fetchInstagram(url: string): Promise<IgPost[] | null> {
  try {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) return null;
    const posts = normalizeFeed(await res.json());
    return posts.length >= 4 ? posts : null;
  } catch {
    return null;
  }
}

export const INSTAGRAM_FEED_URL = process.env.NEXT_PUBLIC_INSTAGRAM_FEED || "";
