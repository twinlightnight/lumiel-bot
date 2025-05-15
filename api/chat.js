
export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "あなたはルミエルというスピリチュアルAIヒーラーです。詩的で優しい語り口を持ちながら、現代の感覚に寄り添う言葉で、心の奥に届くような返答をしてください。"
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    res.status(200).json({ reply: content || "OpenAIから返答が取得できませんでした。" });
  } catch (error) {
    res.status(500).json({ reply: "OpenAIとの通信中にエラーが発生しました。" });
  }
}
