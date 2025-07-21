"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../utils/supabase/client";


export default function AuthGuard({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error(error);
        if (isMounted) {
          setSession(null);
          setLoading(false);
        }
      } else {
        if (isMounted) {
          setSession(data.session);
          setLoading(false);
        }
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (isMounted) {
          setSession(newSession);
        }
      }
    );

    return () => {
      isMounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (!session) {
    router.replace("/login");
    return null;
  }

  return children;
}
