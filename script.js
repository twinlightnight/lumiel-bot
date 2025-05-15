
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
  displaySentencesSeparated("ルミエル", reply, "bot");
});

function appendMessage(name, text, cls) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${cls}`;
  msgDiv.innerHTML = `<strong>${name}:</strong> ${text}`;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function displaySentencesSeparated(name, text, cls) {
  const sentences = text.split(/(?<=[。！？\!\?])/).filter(s => s.trim() !== "");
  let first = true;

  sentences.forEach((sentence, index) => {
    setTimeout(() => {
      const msgDiv = document.createElement("div");
      msgDiv.className = `message ${cls}`;
      msgDiv.innerHTML = first ? `<strong>${name}:</strong> ${sentence.trim()}` : sentence.trim();
      chatWindow.appendChild(msgDiv);
      chatWindow.scrollTop = chatWindow.scrollHeight;
      first = false;
    }, 2000 + index * 5000);
  });
}
