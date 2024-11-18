const express = require("express");
const socket = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socket(server);
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("send-location", data => {
        io.emit("receive-location", {id: socket.id, ...data})
    })

    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id)
    })
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(port, () => console.log(`Server running on http://localhost:${port}`));
