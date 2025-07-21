"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../utils/supabase/client";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  async function handleSignUp(e) {
  e.preventDefault();
  setError(null);

  // First, try signing in to see if user exists
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (!signInError) {
    setError("This email is already registered. Please log in instead.");
    return;
  }

  if (
  signInError &&
  signInError.message &&
  signInError.message.toLowerCase().includes("invalid login credentials")
)
 {
    // User not found, safe to sign up
    const { data: signUpData, error: signUpError } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      });

    if (signUpError) {
      console.log("Supabase signUp error:", signUpError.message);
      setError(signUpError.message);
      return;
    }

    alert("Sign up successful! Please check your email and confirm your account before logging in.");
router.push("/login");
  } else {
    // Some other error
    setError(signInError.message);
  }
}




  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      <form onSubmit={handleSignUp} className="space-y-3">
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
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
        >
          Sign Up
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}