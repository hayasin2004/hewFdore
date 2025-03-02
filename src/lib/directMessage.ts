import express from "express";
import http from "http";
import {Server} from "socket.io";
const PORT = 8081

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000","https://hew-fdore.vercel.app"],
    }
})


io.on("connection", (socket) => {
    //console.log("clientと接続中")
    socket.on("disconnect", () => {
        //console.log("socketとclientのせつぞくがきれました")
    })
})

server.listen(PORT, () => {
    //console.log("Server started on port 8080")
})