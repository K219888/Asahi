"use client";

import { useState } from "react";
import supabase from "../../utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordRequestPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email for the password reset link.");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Your email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
        >
          Send Reset Link
        </button>
      </form>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
   <Link
  href="/login"
  className="inline-block w-full text-center bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
>
  ← Back to login
</Link>

    </div>
  );
}
