"use client"
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import useUser from "@/hooks/useUser";
import DirectMessageserver from "@/app/utils/user/DirectMessageserver";
import io from "socket.io-client";
import {ChatType} from "@/app/page";
import saveMessage from "@/app/utils/message/saveMessage";

const DirectMessage = ({params}: { params: { id?: string } }) => {
    console.log(params);
    const detailUser = params?.id as string;
    console.log(detailUser)
    const {user} = useUser()
    const currentUser = user?._id;
    console.log(user?._id);
    const response = async () => {
        const MessageDate = await DirectMessageserver(detailUser, currentUser)
    }
    response()
    const [message, setMessage] = useState("")
    const [chatList, setChatList] = useState<ChatType[]>([])
    const [dateBasechatList, setDateBaseChatList] = useState<ChatType>()
    console.log("保存したいデータ"+JSON.stringify(dateBasechatList))
    const socket = io("http://localhost:8080");
    // socket.ioに送信
    const handleSendMessage = (e: HTMLButtonElement) => {
        socket.emit("send_message", {message: message})
        setMessage("")
    }

    // socket.ioから受信
    socket.on("received_message", (data) => {
        console.log("socketかラ受け取った奴" + JSON.stringify(data));
        const messageSave = async (data: string, currentUser: string, detailUser: string) => {
            try {

                const Responsemessage = await saveMessage(data, currentUser, detailUser)
                const resultCurrentUserMessage = Responsemessage?.messageData
                console.log(resultCurrentUserMessage)
                setDateBaseChatList([ ...dateBasechatList , resultCurrentUserMessage])
            } catch (err) {
                console.log(err)
            }
        }
        setChatList([...chatList, data])
        messageSave(data, currentUser, detailUser)
    })


    return (
        <>
            <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>

                <p>
                    対象ユーザー : {params.id}
                </p>
                <br/>
                <p>
                    ログインユーザー : {user?._id} , {user?.username}
                </p>
            </div>

            <input type="text" onChange={(e) => setMessage(e.target.value)} value={message}
                   placeholder={"currentUser"}/>
            <button onClick={(e) => handleSendMessage(e)}>送信</button>
            {dateBasechatList?.currentUserChat}
            {/*{dateBasechatList.map((item) => (*/}
            {/*    <ul key={item.currentUser}>*/}
            {/*        <li>{item?.currentUser.message}</li>*/}
            {/*    </ul>*/}
            {/*))}*/}

        </>
    );
};

export default DirectMessage;