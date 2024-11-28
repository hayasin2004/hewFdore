"use client"
import Register from "@/app/(auth)/register/page";
import Login from "@/app/(auth)/login/page";
// import Toppage from "./toppage/page";
import NewToppage from "@/app/newToppage/page";
import Toppage_top_slideshow from "@/app/_components/toppage_top_slideshow/Toppage_top_slideshow";
import Header from "@/app/_components/header/Header";
import Toppage from "@/app/toppage/page";
import Product from "@/app/product/[id]/page";
import SearchProductResult from "@/app/searchResult/page";

import io from "socket.io-client";
import {useState} from "react";

export default function Home() {
    const [message, setMessage] = useState("")
    const [chatList, setChatList] = useState([])
    const socket = io("http://localhost:8080");
    // socket.ioに送信
    const handleSendMessage = (e: HTMLButtonElement) => {
        socket.emit("send_message", {message: message})
        setMessage("")
    }

    // socket.ioから受信
    socket.on("received_message", (data) => {
        console.log("socketかラ受け取った奴" + JSON.stringify(data));
        setChatList([...chatList  , data])
    })


    return (
        <main>
            <input type="text" onChange={(e) => setMessage(e.target.value)} value={message}/>
            <button onClick={(e) => handleSendMessage(e)}>送信</button>

            {/*{chatList.map((item) => (*/}
            {/*    <ul key={item}>*/}
            {/*       <li>{chatList.data}</li>*/}
            {/*    </ul>*/}
            {/*))}*/}

            {/*<div>*/}
            {/*    <SearchProductResult/>*/}
            {/*    /!*<Toppage />*!/*/}
            {/*    /!*<Login />*!/*/}
            {/*    /!**!/*/}
            {/*</div>*/}
        </main>
    );
}
