// app/ebooks/[slug]/page.js
import supabase from "../../../utils/supabase/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Link from "next/link";

export default async function EbookPage({ params }) {
  const { slug } = params;

  const { data, error } = await supabase
    .from("ebooks")
    .select("title, content")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Supabase error:", error.message);
    return <div>⚠️ Error loading ebook: {error.message}</div>;
  }

  if (!data) {
    return <div>📕 No ebook found.</div>;
  }

  return (
    <main className="prose prose-base lg:prose-lg max-w-3xl mx-auto px-6 py-12 space-y-6">
      <Link
        href="/ebooks"
        className="inline-block text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        ← Back to eBooks
      </Link>

      <h1>{data.title}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {data.content}
      </ReactMarkdown>
    </main>
  );
}
