"use client";

import { useEffect, useState } from "react";
import supabase from "../../utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleReset(e) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password updated! Please log in.");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Set a New Password</h2>
      <form onSubmit={handleReset} className="space-y-3">
        <input
          type="password"
          placeholder="New password"
          className="w-full border p-2 rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
        >
          Save New Password
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
