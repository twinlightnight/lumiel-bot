
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
  msgDiv.innerHTML = showLabel ? `<strong>${name}:</strong> ` : "";
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return msgDiv;
}

function displaySentencesTyping(name, text, cls) {
  const sentences = text.split(/(?<=[。！？\!\?])/).filter(s => s.trim() !== "");
  const firstDiv = appendMessage(name, "", cls, true);

  sentences.forEach((sentence, index) => {
    setTimeout(() => {
      typeText(firstDiv, sentence.trim() + " ");
    }, 2000 + index * 5000); // 最初は2秒後、以降5秒ごとに
  });
}

function typeText(element, text) {
  let i = 0;
  const interval = setInterval(() => {
    element.innerHTML += text.charAt(i);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 60);
}
