import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function CopyableCode({ inline, className, children }) {
  const [copied, setCopied] = useState(false);
  const code = String(children).replace(/\n$/, "");
  const language = /language-(\w+)/.exec(className || "")?.[1];

  async function handleCopy() {
    await navigator.clipboard?.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  if (inline) {
    return <code className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[0.92em] text-slate-900">{children}</code>;
  }

  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
          {language || "code"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg border border-white/10 px-2.5 py-1 text-xs font-medium text-slate-300 transition duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
        >
          {copied ? "已复制" : "复制"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6">
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}

export default function MarkdownRenderer({ content }) {
  return (
    <div className="article-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => <h1 id={slugify(children)}>{children}</h1>,
          h2: ({ children }) => <h2 id={slugify(children)}>{children}</h2>,
          h3: ({ children }) => <h3 id={slugify(children)}>{children}</h3>,
          a: ({ children, ...props }) => (
            <a {...props} target="_blank" rel="noreferrer">
              {children}
            </a>
          ),
          code: CopyableCode,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
