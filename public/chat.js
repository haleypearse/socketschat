//make connection
var socket = io.connect("http://localhost:4000");

//query DOM
var message = document.getElementById("message");
var handle = document.getElementById("handle");
var button = document.getElementById("send");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");

//emit events
button.addEventListener("click", function() {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
});

message.addEventListener("keypress", function() {
  socket.emit("typing", handle.value);
});

//listen for events
socket.on("chat", function(data) {
  output.innerHTML +=
    "<p><strong>" + data.handle + " </strong>" + data.message + "</p>";
});