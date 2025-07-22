"use client";

import { useEffect, useState } from "react";
import supabase from "../../utils/supabase/client";
import Link from "next/link";
import AuthGuard from "../components/AuthGuard";

export default function EbooksPage() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  async function loadData() {
    console.log("Checking subscription...");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User not found:", userError);
      setError("You must be logged in.");
      setLoading(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("has_active_subscription")
      .eq("email", user.email)
      .single();

    if (profileError || !profile?.has_active_subscription) {
      console.warn("No active subscription found.");
      setError("You need an active subscription to access e-books.");
      setLoading(false);
      return;
    }

    const { data: ebooksData, error: ebooksError } = await supabase
      .from("ebooks")
      .select("*");

    if (ebooksError) {
      console.error("Failed to load e-books:", ebooksError);
      setError("Failed to load e-books.");
    } else {
      setEbooks(ebooksData || []);
    }

    setLoading(false);
  }

  loadData();
}, []);


  if (loading) {
    return (
      <div className="p-8">Loading e-books...</div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-600">{error}</div>
    );
  }

  return (
    <AuthGuard>
      <div className="bg-[#fdfaf6] min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
            Explore Our E-Books
          </h1>

          <div className="text-center mb-10">
            <Link
              href="/"
              className="inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
            >
              ← Back to Home
            </Link>
          </div>

          {ebooks.length === 0 ? (
            <p className="text-center text-gray-600">
              No e-books found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ebooks.map((book) => (
                <Link
                  href={`/ebooks/${book.slug}`}
                  key={book.id}
                  className="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {book.title}
                  </h2>
                  {book.subtitle && (
                    <p className="text-gray-600 mb-4">
                      {book.subtitle}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    Author: {book.author}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
