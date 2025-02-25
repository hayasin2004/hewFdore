import  {Server} from "socket.io";


const clickButton = (server) => {
    let isButtonDisabled = false;

    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:3000"],
        }
    })

    io.on("clickButtonEvent", () => {
        isButtonDisabled = true;
        console.log("来ました押されました。")
        io.emit("update", {isButtonDisabled});
    })

}

module.exports = {clickButton}