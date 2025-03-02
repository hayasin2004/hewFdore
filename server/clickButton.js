import  {Server} from "socket.io";


const clickButton = (server) => {
    let isButtonDisabled = false;

    const io = new Server(server, {
        cors: {
            origin: ["https://hew-fdore.vercel.app"],
        }
    })

    io.on("clickButtonEvent", () => {
        isButtonDisabled = true;
        console.log("来ました押されました。")
        io.emit("update", {isButtonDisabled});
    })

}

module.exports = {clickButton}