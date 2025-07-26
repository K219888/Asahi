// app/ebooks/[slug]/page.js
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function EbookPage({ params }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('has_active_subscription')
    .eq('id', user.id)
    .single();

  if (!profile?.has_active_subscription) {
    redirect('/pricing');
  }

  const { slug } = params;

  const { data: ebook, error } = await supabase
    .from('ebooks')
    .select('title, author, content')
    .eq('slug', slug)
    .single();

  if (error || !ebook) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">E-Book Not Found</h1>
        <Link href="/ebooks" className="text-blue-500 underline mt-4 block">
          ← Back to E-Books
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Link href="/ebooks" className="text-blue-500 underline">
        ← Back to E-Books
      </Link>
      <h1 className="text-3xl font-bold mt-4">{ebook.title}</h1>
      {ebook.author && <p className="text-gray-600 italic mb-6">by {ebook.author}</p>}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: ebook.content }}
      />
    </div>
  );
}
