// lib/openai.js
export async function getAIResponse(message) {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4", // or "gpt-3.5-turbo" for faster/cheaper
        messages: [{ role: "user", content: message }],
        temperature: 0.8,
      }),
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "No response.";
  } catch (err) {
    console.error("OpenAI Error:", err);
    return "Sorry, something went wrong with AI.";
  }
}
