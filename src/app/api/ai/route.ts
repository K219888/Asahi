import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // must be set in .env.local
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received prompt:", body.prompt); // ✅ DEBUG LOG

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: body.prompt }],
    });

    return NextResponse.json({ response: completion.choices[0].message.content });
  } catch (err) {
    console.error("API error:", err); // ✅ DEBUG ERROR
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
