'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const isDemo = searchParams.get("demo") === "true";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sessionId) {
      // Here you could verify the payment with your backend
      // For now, we'll just show success
      setLoading(false);
    } else {
      setError("No session ID found");
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-4">Payment Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/ebooks"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Back to E-Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-green-600 text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-4">
          {isDemo ? "Demo Payment Successful!" : "Payment Successful!"}
        </h1>
        {isDemo && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            <p className="text-sm">
              🎭 <strong>Demo Mode:</strong> This is a simulated payment. In production, 
              you would be redirected to Stripe&rsquo;s checkout page.

            </p>
          </div>
        )}
        <p className="text-gray-600 mb-6">
          {isDemo 
            ? "Demo completed successfully! You now have full access to all e-books."
            : "Thank you for your purchase. You now have full access to all e-books."
          }
        </p>
        <div className="space-x-4">
          <Link
            href="/ebooks"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Browse E-Books
          </Link>
          <Link
            href="/profile"
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
} 