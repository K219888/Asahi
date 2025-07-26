"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    const user = data.user;

    if (!user?.email_confirmed_at) {
      setError("Please verify your email before logging in.");
      await supabase.auth.signOut();
      return;
    }

    // ✅ Persist session so middleware sees you as logged in
    if (data.session) {
      await supabase.auth.setSession(data.session);
    }

    router.push("/chat");
  }

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>

      <form onSubmit={handleLogin} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
        >
          Log In
        </button>
      </form>

      <Link
        href="/reset-password-request"
        className="inline-block w-full text-center bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
      >
        Forgot your password?
      </Link>

      <Link
        href="/signup"
        className="inline-block w-full text-center bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
      >
        Sign Up
      </Link>
    </div>
  );
}
