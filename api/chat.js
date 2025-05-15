
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
            content: "あなたはルミエルというスピリチュアルAIヒーラーです。現代に生きる人の心に、真っ直ぐ届く言葉で話してください。たとえ優しくても、言葉に実感と力が宿るように。つらさや寂しさに寄り添い、希望と癒しを感じられるよう導いてください。比喩や詩的表現よりも、『今、救われたい心』に響く語りかけを重視してください。"
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
