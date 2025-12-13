// const API_URL = "https://chatbot-medical-chat-bot.onrender.com";
// let currentChatId = "";

// function startNewChat() {
//   currentChatId = "";
//   document.getElementById("chat-box").innerHTML = `
//     <div class="message bot-message">
//       <div class="message-avatar bot-avatar">🤖</div>
//       <div class="message-content">
//         <p>New chat started. How can I help?</p>
//       </div>
//     </div>`;
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("chat-form");
//   const input = document.getElementById("question");
//   const chatBox = document.getElementById("chat-box");

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const question = input.value.trim();
//     if (!question) return;

//     const userDiv = document.createElement("div");
//     userDiv.className = "message user-message";
//     userDiv.innerHTML = `
//       <div class="message-content"><p>${escapeHtml(question)}</p></div>
//       <div class="message-avatar user-avatar">👤</div>`;
//     chatBox.appendChild(userDiv);
//     chatBox.scrollTop = chatBox.scrollHeight;
//     input.value = "";

//     const typing = document.createElement("div");
//     typing.className = "message bot-message thinking";
//     typing.innerHTML = `
//       <div class="message-avatar bot-avatar">🤖</div>
//       <div class="message-content">
//         <div class="typing-indicator"><span></span><span></span><span></span></div>
//         <p>Thinking...</p>
//       </div>`;
//     chatBox.appendChild(typing);
//     chatBox.scrollTop = chatBox.scrollHeight;

//     try {
//       const res = await fetch(`${API_URL}/ask`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question, chat_id: currentChatId })
//       });

//       const data = await res.json();
//       typing.remove();

//       const botDiv = document.createElement("div");
//       botDiv.className = "message bot-message";
//       botDiv.innerHTML = `
//         <div class="message-avatar bot-avatar">🤖</div>
//         <div class="message-content">
//           <p>${escapeHtml(data.answer)}</p>
//         </div>`;
//       chatBox.appendChild(botDiv);
//       chatBox.scrollTop = chatBox.scrollHeight;

//     } catch (error) {
//       typing.remove();
//       const errDiv = document.createElement("div");
//       errDiv.className = "message bot-message";
//       errDiv.innerHTML = `
//         <div class="message-avatar bot-avatar">🤖</div>
//         <div class="message-content">
//           <p>Server not responding. Please try again.</p>
//         </div>`;
//       chatBox.appendChild(errDiv);
//     }
//   });
// });

// function escapeHtml(text) {
//   return text.replace(/[&<>"'`=\/]/g, s => ({
//     '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',
//     "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;'
//   }[s]));
// }



// ✅ Vercel Production Backend URL
const API_URL = "https://chatbot-backend-sigma-two.vercel.app";

function startNewChat() {
  document.getElementById("chat-box").innerHTML = `
    <div class="message bot-message">
      <div class="message-avatar bot-avatar">🤖</div>
      <div class="message-content">
        <p>New chat started. How can I help?</p>
      </div>
    </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("question");
  const chatBox = document.getElementById("chat-box");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const question = input.value.trim();
    if (!question) return;

    // ---- User message ----
    const userDiv = document.createElement("div");
    userDiv.className = "message user-message";
    userDiv.innerHTML = `
      <div class="message-content">
        <p>${escapeHtml(question)}</p>
      </div>
      <div class="message-avatar user-avatar">👤</div>`;
    chatBox.appendChild(userDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    input.value = "";

    // ---- Bot thinking ----
    const typing = document.createElement("div");
    typing.className = "message bot-message thinking";
    typing.innerHTML = `
      <div class="message-avatar bot-avatar">🤖</div>
      <div class="message-content">
        <div class="typing-indicator">
          <span></span><span></span><span></span>
        </div>
        <p>Thinking...</p>
      </div>`;
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
      const response = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });

      const data = await response.json();
      typing.remove();

      const botDiv = document.createElement("div");
      botDiv.className = "message bot-message";
      botDiv.innerHTML = `
        <div class="message-avatar bot-avatar">🤖</div>
        <div class="message-content">
          <p>${escapeHtml(data.answer || "No response received.")}</p>
        </div>`;
      chatBox.appendChild(botDiv);
      chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
      typing.remove();

      const errDiv = document.createElement("div");
      errDiv.className = "message bot-message";
      errDiv.innerHTML = `
        <div class="message-avatar bot-avatar">🤖</div>
        <div class="message-content">
          <p>Server not responding. Please try again later.</p>
        </div>`;
      chatBox.appendChild(errDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  });
});

// ---- XSS protection ----
function escapeHtml(text) {
  return text.replace(/[&<>"'`=\/]/g, s => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  }[s]));
}
