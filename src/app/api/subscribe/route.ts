import { NextResponse } from "next/server";
import { deliver, isEmail } from "@/lib/notify";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { email, company } = body as Record<string, string>;

  if (company) return NextResponse.json({ ok: true }); // honeypot
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  await deliver({
    subject: "New newsletter signup ✿",
    html: `<p>New 10%-off signup: <strong>${String(email).replace(/</g, "&lt;")}</strong></p>`,
  });

  return NextResponse.json({ ok: true });
}
