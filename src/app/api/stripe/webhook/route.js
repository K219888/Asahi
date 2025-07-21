import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  const rawBody = await req.text()

  try {
    const body = JSON.parse(rawBody)

    console.log("✅ Webhook received:", body.type)

    if (body.type === "checkout.session.completed") {
      const session = body.data.object

      console.log("✅ Checkout session completed:", session)

      const customerEmail =
        session.customer_email || session.customer_details?.email || null

      if (!customerEmail) {
        console.warn("⚠️ Webhook received session without customer_email. Skipping.")
        return NextResponse.json(
          { skipped: true, reason: "No customer_email" },
          { status: 200 }
        )
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          has_active_subscription: true,
        })
        .eq("email", customerEmail)

      if (error) {
        console.error("❌ Supabase update error:", error)
        return new Response(`Supabase error: ${error.message}`, { status: 400 })
      }

      console.log("✅ Updated subscription for:", customerEmail)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (err) {
    console.error("❌ Webhook error:", err)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }
}
