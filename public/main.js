// main.js
const messageBox = document.querySelector("#messages");
const textBox = document.querySelector("input");
const sendButton = document.querySelector("button");
var users = document.getElementById("usersOnline");
// const form = document.getElementById("form");
// var username = document.getElementById("username");
// var hfour = document.getElementById("hfour");

// let nimadir = false;

// if (nimadir === false) {
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     console.log(username.value);
//     hfour.innerText = username.value;
//     username.value = "";
//   });
//   nimadir = true;
// }

function createMessage(text, ownMessage = false) {
  const messageElement = document.createElement("div");
  messageElement.className = "chat-message";
  const subMesssageElement = document.createElement("div");
  subMesssageElement.className =
    "px-4 py-4 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600";
  if (ownMessage) {
    subMesssageElement.className += " float-right bg-blue-800 text-white";
  }
  subMesssageElement.innerText = text;
  messageElement.appendChild(subMesssageElement);

  messageBox.appendChild(messageElement);
}

const socket = io();

socket.on("connection", (socket) => {
  console.log(socket.id);
});
//Online users
socket.on("onlineUsersCount", (onlineUsers) => {
  users.innerText = onlineUsers + " online";
});

socket.on("receive-message", (message) => {
  createMessage(message);
});

sendButton.addEventListener("click", () => {
  if (textBox.value != "") {
    socket.emit("send-message", textBox.value);
    createMessage(textBox.value, true);
    textBox.value = "";
  }
});
