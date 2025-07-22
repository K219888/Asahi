'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link'; // ✅ Don't forget this import


export default function SuccessClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    if (!sessionId || sessionId === 'demo') {
      setDemo(true);
      setLoading(false);
      return;
    }

    // You can fetch verification status here if needed
    fetch(`/api/checkout-session?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [sessionId]);

  if (loading) return <p className="text-center">Verifying your purchase...</p>;
  if (error) return <p className="text-center text-red-600">Error verifying session.</p>;
  if (demo) return <p className="text-center">Demo mode: No payment needed.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center text-green-600">
      <h1 className="text-2xl font-bold mb-2">✅ Payment Successful!</h1>
      <p className="mb-6">You now have full access to the eBooks.</p>

      <Link
        href="https://asahi-k3ag75cbb-k219888s-projects.vercel.app/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
