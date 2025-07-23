"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ClientMarkdownWrapper({ title, content }) {
  return (
    <div className="prose max-w-none">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
