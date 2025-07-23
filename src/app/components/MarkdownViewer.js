import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownViewer({ title, content }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose">
        {content}
      </ReactMarkdown>
    </div>
  );
}

