const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const PORT = 8080

try {

    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:3000" ],
        }
    })


    io.on("connection", (socket) => {
        console.log("clientと接続中")
        // clientからの受信
        socket.on("send_message", (data) => {
            console.log("送られてきたやつ" + data)

            // clientに送信
            io.emit("received_message", data);
            console.log(data)
        })
    })


    // socket.on("disconnect", () => {
    //     console.log("socketとclientのせつぞくがきれました")
    // })


    server.listen(PORT, () => {
        console.log("Server started on port 8080")
    })
} catch (err) {
    console.log(err)
}
