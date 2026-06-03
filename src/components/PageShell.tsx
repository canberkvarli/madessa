import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";
import Footer from "./Footer";
import Reveal from "./Reveal";

export default function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main id="main">
        <section className="relative overflow-hidden px-6 pb-10 pt-14 lg:px-10 lg:pt-20">
          <div className="pointer-events-none absolute -top-24 right-0 -z-10 h-80 w-80 rounded-full bg-blush/40 blur-3xl" />
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-clay">
              {eyebrow}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight sm:text-6xl">
              {title}
            </h1>
            {intro && (
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
                {intro}
              </p>
            )}
          </Reveal>
        </section>
        <div className="mx-auto max-w-3xl px-6 pb-24 lg:px-10">{children}</div>
      </main>
      <Footer />
    </>
  );
}
