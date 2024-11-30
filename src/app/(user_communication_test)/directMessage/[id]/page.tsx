"use client"
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import useUser from "@/hooks/useUser";
import DirectMessageserver from "@/app/utils/user/DirectMessageserver";
import io from "socket.io-client";
import saveMessage from "@/app/utils/message/saveMessage";
import {ChatType} from "@/models/Chat";
import {UserType} from "@/app/api/user/catchUser/route";


const DirectMessage = ({params}: { params: { id?: string } }) => {
    // console.log(JSON.stringify(params));
    const detailUser = params?.id as string;
    const {user} = useUser()
    const tokenUser = user?._id;
    console.log("currentUser", tokenUser)
    const [partnerUser, setPartnerUser] = useState<ChatType | null>(null)
    const [currentUser, setCurrentUser] = useState<ChatType | null>(null)
    const [message, setMessage] = useState("")
    const [chatList, setChatList] = useState<ChatType[]>([]);
    console.log(JSON.stringify(chatList))
    const [dateBasechatList, setDateBaseChatList] = useState<ChatType | null>(null)
    // console.log("保存したいデータ" + JSON.stringify(dateBasechatList))
    const socket = io("http://localhost:8080");

    useEffect(() => {
        const response = async () => {
            const setUsersData = await DirectMessageserver(detailUser, tokenUser)
            if (setUsersData?.newChatRoom) {
                setPartnerUser(setUsersData?.newChatRoom?.partnerUser)
                setCurrentUser(setUsersData?.newChatRoom?.currentUser)
            }
            setPartnerUser(setUsersData?.partnerUser._id)
            setCurrentUser(setUsersData?.partnerUser._id)
        }
        response()
    }, [currentUser, detailUser]);


    // socket.ioに送信
    const handleSendMessage = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        socket.emit("send_message", {message: message})
        setMessage("")
    }
    socket.on("received_message", (data) => {
        console.log("socketかラ受け取った奴" + JSON.stringify(data));
        setChatList([...chatList, data])
    })


    // socket.ioから受信


    return (
        <>
            <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>

                <p>
                    対象ユーザー : {partnerUser?.partnerUser}
                </p>
                <br/>
                <p>
                    ログインユーザー : {currentUser?.currentUser}
                </p>
            </div>
            <form>
                <input type="text" onChange={(e) => setMessage(e.target.value)} value={message}/>
                <button onClick={(e) => handleSendMessage(e)}>送信</button>
            </form>
            {chatList.map((item) => (
                <ul key={item?.message}>
                    <li>{item?.message}</li>
                </ul>
            ))}

        </>
    );
};
export default DirectMessage;
