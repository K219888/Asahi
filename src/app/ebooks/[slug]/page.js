import supabase from "../../../utils/supabase/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Link from "next/link";

export default async function EbookPage({ params }) {
  const { slug } = params;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user?.email) {
    return <div>⚠️ You must be logged in to view this ebook.</div>;
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("has_active_subscription")
    .eq("email", session.user.email)
    .single();

  if (profileError || !profile?.has_active_subscription) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-red-600">🔒 Access Denied</h2>
        <p className="text-gray-700 mt-2">You need an active subscription to view this eBook.</p>
        <Link href="/pricing" className="text-blue-600 underline mt-4 inline-block">
          Subscribe Now
        </Link>
      </div>
    );
  }

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
