import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found — Madessa",
};

export default function NotFound() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main
        id="main"
        className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
      >
        <div className="pointer-events-none absolute -z-10 h-72 w-72 rounded-full bg-blush/40 blur-3xl" />
        <p className="font-display text-[7rem] leading-none text-clay/30">404</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">
          This little one wandered off
        </h1>
        <p className="mt-4 max-w-md text-ink-soft">
          The page you&apos;re looking for isn&apos;t here. Let&apos;s get you
          back to something lovely.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/"
            className="rounded-full bg-ink px-7 py-3.5 text-sm tracking-wide text-paper transition-all duration-300 hover:bg-clay hover:scale-[1.03]"
          >
            Back home
          </a>
          <a href="/#shop" className="text-sm tracking-wide underline-offset-4 hover:underline">
            Browse the collection →
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
