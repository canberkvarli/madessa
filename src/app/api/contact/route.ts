import { NextResponse } from "next/server";
import { deliver, isEmail } from "@/lib/notify";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { name, email, message, company } = body as Record<string, string>;

  if (company) return NextResponse.json({ ok: true }); // honeypot
  if (!isEmail(email) || !message?.trim()) {
    return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
  }

  const safe = (s: string) => String(s).replace(/</g, "&lt;");
  await deliver({
    subject: `New message from ${name ? safe(name) : "the website"}`,
    replyTo: email,
    html: `<p><strong>From:</strong> ${safe(name || "—")} (${safe(email)})</p>
           <p style="white-space:pre-wrap">${safe(message)}</p>`,
  });

  return NextResponse.json({ ok: true });
}
