var express = require("express");
var socket = require("socket.io");

// App setup
var app = express();
var server = app.listen(4000, () => {
  console.log("listening to requests on port 4000");
});

// Static files, middleware serving public folder
app.use(express.static("public"));

// Socket setup
// Pass express to socket
var io = socket(server);

io.on("connection", socket => {
  //socket variable is specific to client
  console.log("made socket connection with id<<<< ", socket.id);

  // handle chat event
  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", data => {
    socket.broadcast.emit("typing", data); //emit to every other client
  });
});
