"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ProjectMarkdownProps = {
  content: string;
};

export default function ProjectMarkdown({ content }: ProjectMarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <h1 className="text-xl font-bold text-white mt-4 mb-2">{children}</h1>,
        h2: ({ children }) => <h2 className="text-lg font-semibold text-white mt-4 mb-2">{children}</h2>,
        h3: ({ children }) => <h3 className="text-base font-semibold text-purple-300 mt-3 mb-1">{children}</h3>,
        p: ({ children }) => <p className="mb-3 text-white/70">{children}</p>,
        ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1 text-white/70">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1 text-white/70">{children}</ol>,
        li: ({ children }) => <li className="ml-2">{children}</li>,
        strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
        em: ({ children }) => <em className="text-purple-300 italic">{children}</em>,
        code: ({ children, className }) =>
          className ? (
            <code className="block bg-black/40 border border-white/10 rounded p-3 my-2 text-xs font-mono text-green-300 overflow-x-auto whitespace-pre">
              {children}
            </code>
          ) : (
            <code className="bg-white/10 rounded px-1.5 py-0.5 text-xs font-mono text-purple-200">{children}</code>
          ),
        pre: ({ children }) => <>{children}</>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-purple-500 pl-3 my-2 text-white/50 italic">{children}</blockquote>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-3">
            <table className="w-full text-xs border-collapse">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-white/10 px-3 py-1.5 text-left text-white font-semibold bg-white/5">{children}</th>
        ),
        td: ({ children }) => <td className="border border-white/10 px-3 py-1.5 text-white/60">{children}</td>,
        a: ({ children, href }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-purple-400 underline hover:text-purple-300">
            {children}
          </a>
        ),
        hr: () => <hr className="border-white/10 my-4" />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
