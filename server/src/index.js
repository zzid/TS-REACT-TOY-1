const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const serverPort = 8080;

io.on("connection", (socket) => {
    console.log("a user connected");
});

http.listen(serverPort, () => {
    console.log(`listening on *:${serverPort}`);
});
