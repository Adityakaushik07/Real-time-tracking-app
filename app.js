const express = require("express");
const app = express();
const path = require("path");

const http = require("http");

const socket = require("socket.io");
const server = http.createServer(app);
const io = socket(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection" , (socket)=>{
  socket.on("send-location",(data)=>{
    io.emit("receive-location",{id : socket.id , ...data})
  })
    socket.on("disconnect",()=>{
      io.emit("user-disconnect",socket.id)
    })
})

app.get("/", function (req, res) {
  res.render("index");
});

server.listen(3000);



