// For app directory (Next.js 13+)
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get('session_id');

  if (!session_id) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }
try {
  const session = await stripe.checkout.sessions.retrieve(session_id)
  return NextResponse.json({ success: true, session }) // include 'success'
} catch {
  return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 })
}


}
