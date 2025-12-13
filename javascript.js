// javascript.js

const API_URL = "https://chatbot-medical-chat-bot.onrender.com";

function sendQuestion(userInput) {
  fetch(`${API_URL}/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question: userInput
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.answer) {
      showAnswer(data.answer);
    } else {
      showAnswer("No response received from server.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    showAnswer("Server is not responding. Please try again later.");
  });
}
