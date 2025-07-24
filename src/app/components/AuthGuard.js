"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../utils/supabase/client";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        if (isMounted) {
          router.replace("/login");
        }
        return;
      }

      if (isMounted) setSession(session);

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("has_active_subscription")
        .eq("id", session.user.id)
        .single();

      if (profileError || !profile?.has_active_subscription) {
        if (isMounted) {
          router.replace("/subscribe");
        }
        return;
      }

      if (isMounted) {
        setHasAccess(true);
        setLoading(false);
      }
    };

    load();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (isMounted) setSession(newSession);
    });

    return () => {
      isMounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Checking access...</p>
      </div>
    );
  }

  return hasAccess ? children : null;
}
