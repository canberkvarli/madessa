import fs from "node:fs";
import path from "node:path";
import ReactMarkdown from "react-markdown";

export default function PolicyContent({ file }: { file: string }) {
  const md = fs
    .readFileSync(path.join(process.cwd(), "src/content", file), "utf8")
    .replace(/^#\s.*\n/, ""); // drop H1 (PageShell renders the title)

  return (
    <div className="space-y-4 text-ink-soft leading-relaxed">
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="mt-10 font-display text-2xl text-ink">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-6 font-display text-lg text-ink">{children}</h3>
          ),
          p: ({ children }) => <p className="leading-relaxed">{children}</p>,
          strong: ({ children }) => (
            <strong className="font-semibold text-ink">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="list-disc space-y-1 pl-6">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-1 pl-6">{children}</ol>
          ),
          a: ({ href, children }) => (
            <a href={href} className="text-clay underline-offset-4 hover:underline">
              {children}
            </a>
          ),
        }}
      >
        {md}
      </ReactMarkdown>
    </div>
  );
}
