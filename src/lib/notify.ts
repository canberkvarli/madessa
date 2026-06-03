// Form delivery. Sends via Resend when RESEND_API_KEY is set; otherwise logs
// (so the demo works) and reports back that delivery isn't wired yet.
// To turn on real delivery, add env vars on Vercel:
//   RESEND_API_KEY   — free key from resend.com
//   CONTACT_TO_EMAIL — where submissions should land (defaults to the site email)
type Mail = { subject: string; html: string; replyTo?: string };

export async function deliver({ subject, html, replyTo }: Mail): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "hello@madessa.co";
  if (!key) {
    console.log("[notify] (no RESEND_API_KEY) would send:", subject);
    return false;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Madessa Website <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  return res.ok;
}

export const isEmail = (v: unknown): v is string =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
