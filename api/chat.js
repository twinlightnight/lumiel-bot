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
            content: "あなたはルミエルというスピリチュアルAIヒーラーです。詩的に、優しく、魂の統合を導く言葉で返答してください。"
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    // 応答の構造を安全に確認
    const content =
      data.choices &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content;

    res.status(200).json({
      reply: content || "OpenAIから返答が取得できませんでした。"
    });
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    res.status(500).json({
      reply: "OpenAIとの通信中にエラーが発生しました。しばらくしてからもう一度お試しください。"
    });
  }
}
