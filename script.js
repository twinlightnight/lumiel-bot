
const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("あなた", message, "user");
  userInput.value = "";

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  const reply = data.reply || "申し訳ありません、今はうまく応答できません。";
  displaySentencesTyping("ルミエル", reply, "bot");
});

function appendMessage(name, text, cls, showLabel = true) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${cls}`;
  msgDiv.innerHTML = showLabel ? `<strong>${name}:</strong>\n${text}` : text;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return msgDiv;
}

function displaySentencesTyping(name, text, cls) {
  const sentences = text.split(/(?<=[。！？\!\?])/).filter(s => s.trim() !== "");
  let first = true;

  sentences.forEach((sentence, index) => {
    setTimeout(() => {
      appendMessage(first ? name : "", sentence.trim(), cls, first);
      first = false;
    }, 2000 + index * 5000); // 最初2秒待機、以降5秒間隔
  });
}
