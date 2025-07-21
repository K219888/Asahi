"use client";

import supabase from "../../utils/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      console.log("USER DATA", userData);
      console.log("USER ERROR", userError);

      if (userError || !userData?.user) {
        console.error("No user found or auth error:", userError);
        setLoading(false);
        return;
      }

      const user = userData.user;
      console.log("Logged in user ID:", user.id);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      console.log("PROFILE DATA", data);
      console.log("PROFILE ERROR", error);

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      if (!data) {
        // No profile exists yet → create it!
        const { data: insertData, error: insertError } = await supabase
          .from("profiles")
          .insert({
            id: user.id,
            email: user.email,
            has_active_subscription: false,
          })
          .select()
          .single();

        if (insertError) {
          console.error("Error inserting profile:", insertError);
          setLoading(false);
          return;
        }

        console.log("NEWLY INSERTED PROFILE:", insertData);
        setProfile(insertData);
      } else {
        setProfile(data);
      }

      setLoading(false);
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#fdfaf6] min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-xl">Loading…</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-[#fdfaf6] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">No profile found.</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfaf6] min-h-screen py-12 px-4">
      {/* Hero section */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Your Profile
        </h1>
        <p className="text-lg text-gray-600">
          View your account details below.
        </p>
      </div>

      {/* Back to home button */}
      <div className="text-center mb-10">
        <Link
          href="/"
          className="inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Profile card */}
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <p className="text-gray-500 text-sm uppercase tracking-wide mb-2">
            Email
          </p>
          <p className="text-lg font-medium text-gray-800">
            {profile.email}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm uppercase tracking-wide mb-2">
            Active Subscription
          </p>
          <p
            className={`text-lg font-medium ${
              profile.has_active_subscription
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {profile.has_active_subscription ? "✅ Yes" : "❌ No"}
          </p>
        </div>
      </div>
    </div>
  );
}
