"use client";

import Link from "next/link";
import supabase from "../../utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription;

    const loadUser = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
        setUser(null);
        setLoading(false);
        return;
      }

      if (data?.session?.user) {
        console.log("Loaded session user:", data.session.user);
        setUser(data.session.user);
      } else {
        console.log("No user session found");
        setUser(null);
      }

      setLoading(false);

      subscription = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
      }).data.subscription;
    };

    loadUser();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const showAllLinks =
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ===
      "your_supabase_project_url_here";

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  async function handleEbooksClick() {
    if (!user) {
      router.push("/login");
      return;
    }

    console.log("Current user ID:", user.id);

    // ✅ no need to fetch session again — it's already set
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    console.log("Supabase profile result:", profile, error);

    if (error || !profile) {
      console.error("Error fetching profile:", error, "Profile data:", profile);
      alert("No profile found or permission denied.");
      return;
    }

    console.log("Loaded profile:", profile);

    if (profile.is_admin || profile.has_active_subscription) {
      router.push("/ebooks");
      return;
    }

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
        }),
      });

      const result = await res.json();

      if (result.url) {
        window.location.href = result.url;
      } else {
        alert("Could not start checkout.");
      }
    } catch (e) {
      console.error("Checkout error:", e);
      alert("Could not start checkout. Please try again.");
    }
  }

  if (loading) {
    return (
      <nav className="bg-black text-white px-6 py-3 flex justify-between">
        <div className="flex space-x-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </div>
        <div className="text-sm">Loading...</div>
      </nav>
    );
  }

  return (
    <nav className="bg-black text-white px-6 py-3 flex justify-between">
      <div className="flex space-x-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        {(user || showAllLinks) && (
          <>
            <Link href="/chat" className="hover:underline">
              Chat
            </Link>
            <button
              onClick={handleEbooksClick}
              className="hover:underline"
            >
              E-Books
            </button>
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
          </>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-sm">
              Hi, {user.user_metadata?.username || user.email}
            </span>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : showAllLinks ? (
          <>
            <span className="text-sm text-yellow-200">
              Demo Mode
            </span>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/signup" className="hover:underline">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/signup" className="hover:underline">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
