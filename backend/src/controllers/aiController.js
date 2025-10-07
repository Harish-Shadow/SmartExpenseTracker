// src/controllers/aiController.js
import fetch from "node-fetch";

const HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1";

export async function chatWithAIController(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: message,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.7,
          return_full_text: false,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HF API error: ${errorText}`);
    }

    const data = await response.json();
    const text =
      data?.[0]?.generated_text ||
      data?.generated_text ||
      "Sorry, I couldn’t generate a response.";

    res.json({ reply: text });
  } catch (err) {
    console.error("DeepSeek error:", err);
    res.status(500).json({ error: err.message });
  }
}
