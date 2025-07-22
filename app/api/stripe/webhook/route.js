import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // or your preferred API version
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  const rawBody = await req.text()
  const signature = req.headers.get('stripe-signature')

  let event

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // ✅ Now process the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    console.log("✅ Checkout session completed:", session)

    const customerEmail =
      session.customer_email || session.customer_details?.email || null

    if (!customerEmail) {
      console.warn("⚠️ Missing customer email in session")
      return NextResponse.json({ skipped: true, reason: "No customer_email" }, { status: 200 })
    }

    const { error } = await supabase
      .from('profiles')
      .update({ has_active_subscription: true })
      .eq('email', customerEmail)

    if (error) {
      console.error('❌ Supabase update failed:', error)
      return new Response(`Supabase error: ${error.message}`, { status: 400 })
    }

    console.log('✅ Subscription updated for:', customerEmail)
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
