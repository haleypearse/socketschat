// script loaded by client via html

//make connection using io loaded from cdn
var socket = io.connect("http://localhost:4000");

//query DOM
var message = document.getElementById("message");
var handle = document.getElementById("handle");
var button = document.getElementById("send");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");

var emitchat = () => {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
  message.value = "";
};

//emit events
button.addEventListener("click", () => {
  if (message.value != "") {
    emitchat();
  }
});

message.addEventListener("keyup", e => {
  console.log("message keyup" + e.keyCode);
  if (e.keyCode == 13) {
    emitchat();
  } // enter key
  socket.emit("typing", {
    handle: handle.value,
    messageisempty: message.value == ""
  });
});

//listen for events
socket.on("chat", data => {
  console.log("socket.on chat");
  output.innerHTML +=
    "<p><strong>" + data.handle + " </strong>" + data.message + "</p>";
});

socket.on("typing", data => {
  console.log("socket.on typing");
  feedback.innerHTML = data.messageisempty // show "is typing" and remove when deleted
    ? ""
    : "<p><em>" + data.handle + " is typing a message..." + "</em></p>";
  console.log("data.messageisempty = " + data.messageisempty);
});
