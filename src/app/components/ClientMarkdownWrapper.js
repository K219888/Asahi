"use client";
import MarkdownViewer from "./MarkdownViewer";

export default function ClientMarkdownWrapper({ title, content }) {
  return <MarkdownViewer title={title} content={content} />;
}
