const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const {clickButton} = require("./clickButton");
const PORT = 8080

try {

    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:3000"],
        }
    })
    let isButtonDisabled = false


    io.on("connection", (socket) => {
        console.log("clientと接続中")

        // ダイレクトメッセージの設定
        // clientからの受信
        socket.on("send_message", (data) => {
            console.log("送られてきたやつ" + data)

            // clientに送信
            io.emit("received_message", data);
            console.log(data)
        })


        socket.on("clickButtonEvent" ,() => {
            isButtonDisabled = true;
            io.emit("update", isButtonDisabled);
            console.log("きてた")
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
