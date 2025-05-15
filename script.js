
const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  // ユーザーの発言をしっかり個別表示
  const userDiv = document.createElement("div");
  userDiv.className = "message user";
  userDiv.innerHTML = `<strong>あなた:</strong> ${message}`;
  chatWindow.appendChild(userDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;

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
  msgDiv.innerHTML = showLabel ? `<strong>${name}:</strong><br>` : "";
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return msgDiv;
}

function displaySentencesTyping(name, text, cls) {
  const sentences = text.split(/(?<=[。！？\!\?])/).filter(s => s.trim() !== "");
  const firstDiv = appendMessage(name, "", cls, true);

  sentences.forEach((sentence, index) => {
    setTimeout(() => {
      typeText(firstDiv, sentence.trim() + "\n");
    }, 2000 + index * 5000);
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
