"use client"
import React, {useEffect, useState} from 'react';
import DirectMessageserver from "@/app/utils/user/DirectMessageserver";
import io from "socket.io-client";
import {ChatType} from "@/models/Chat";
import saveMessageStauts2 from "@/app/utils/message/saveMessageStauts2";
import catchMessageStatus3 from "@/app/utils/message/catchMessageStatus2";
import catchMessageStatus1Status2 from "@/app/utils/message/catchMessageStaus1Status3";
import confirmUser from "@/app/utils/user/confirmUser";
import DirectMessageStatus1 from "@/app/_components/directMessageStaus/DirectMessageStatus1/DirectMessageStatus1";
import DirectMessageStatus3 from "@/app/_components/directMessageStaus/DirectMessageStatus3/DirectMessageStatus3";
import "./DMpage.css"
import saveMessageStauts1 from "@/app/utils/message/saveMessageStauts1";
import Header from "@/app/_components/header/Header";

const DirectMessage = ({params}: { params: { id?: string } }) => {
    // console.log(JSON.stringify(params));
    const detailUser = params?.id as string;
    const token = localStorage.getItem("token")
    const [partnerChatData, setPartnerChatData] = useState<ChatType | null>(null)
    const [chatData, setChatData] = useState<ChatType | undefined>(undefined)
    const [message, setMessage] = useState("")
    const [chatList, setChatList] = useState<ChatType[]>([]);
    const [status, setStatus] = useState<string>("")
    console.log(status)

    console.log(JSON.stringify(chatList))
    // console.log("保存したいデータ" + JSON.stringify(dateBasechatList))

    const socket = io("http://localhost:8080");

    useEffect(() => {
        console.log(status)
        if (status) {
            const chatresponse = async () => {
                if (status == "1" || status == "2") {
                    const catchUser = await catchMessageStatus1Status2(chatData?.ChatroomId)
                    console.log(catchUser?.chatCatchData?.currentChat)
                    setPartnerChatData(catchUser?.chatCatchData.partnerUserChat)
                } else if (status == "3") {
                    const catchUser = await catchMessageStatus3(chatData?.ChatroomId)
                    console.log(catchUser?.chatCatchData?.currentChat)
                }
            }
            chatresponse()
        }
    }, [chatData , status]);


    useEffect(() => {
        const response = async () => {
            const confirmToken = await confirmUser(token!)
            const confirmTokenParse = JSON.parse(confirmToken!)
            const tokenUser = confirmTokenParse._id
            const setUsersData = await DirectMessageserver(tokenUser, detailUser)
            if (setUsersData?.status == "newChatRoom") {
                setChatData(JSON.parse(setUsersData.newChatRoom!))
                setStatus("1")
                console.log("ステータス1")
            } else if (setUsersData?.status == "chatExists") {
                setChatData(JSON.parse(setUsersData.chatId!))
                setPartnerChatData(JSON.parse(setUsersData.partnerUser!))
                console.log("ステータス2")
                setStatus("2")
            } else if (setUsersData?.status == "chatExistsPart2") {
                console.log(setUsersData)
                setChatData(JSON.parse(setUsersData.chatId!))
                setPartnerChatData(JSON.parse(setUsersData.partnerUser!))
                setStatus("3")
                console.log("ステータス3")
            }
            // setCurrentUser(setUsersData?.currentUser?._id)
        }
        response()
    }, [detailUser, token]);


    // socket.ioに送信
    const handleSendMessage = (e: React.FormEvent<HTMLButtonElement>) => {
        // ステータス1
        if (status === "1" || status === "2") {
            console.log("そもそもどこまで来てる")
            e.preventDefault()
            socket.emit("send_message", {message: message})
            setMessage("")

            socket.on("received_message", (data) => {
                console.log("socketかラ受け取った奴" + JSON.stringify(data));
                setChatList([...chatList, data])
            })
            const SavedMessage = async () => {
                if (chatData !== undefined) {
                    const response = await saveMessageStauts1(chatData._id, chatData.currentUser!, message)
                    console.log(response)
                    setMessage("")
                }
            }
            SavedMessage()
        }
        // ステータス3
        else if (status === "3") {
            e.preventDefault()
            socket.emit("send_message", {message: message})
            setMessage("")

            socket.on("received_message", (data) => {
                console.log("socketかラ受け取った奴" + JSON.stringify(data));
                setChatList([...chatList, data])
            })
            const SavedMessageStatus2 = async () => {
                if (chatData !== undefined) {
                    const response = await saveMessageStauts2(chatData._id, chatData.partnerUser!, message)
                    // const update = await saveMessageStauts2Update(chatData?.chatId, chatData?.currentUser, message)
                    console.log(response)
                    setMessage("")
                }
            }
            SavedMessageStatus2()
        }
    }
    //     サーバーアクションでチャットを保存する

    // socket.ioから受信


    return (
        <>
            <Header/>
            <div className={"dmFreme"}>

                <div className={"PUser-top"}>
                    {/*対象ユーザー : {partnerChatData?._id}*/}
                    {partnerChatData?.username} さん
                </div>
                {/*<div>*/}
                {/*    ログインユーザー : {currentChatData?._id}*/}
                {/*    ユーザー名 : {currentChatData?.username}*/}
                {/*</div>*/}

                <div className={"userChatFrame"}>
                    <div className={"userChat"}>
                        {/*    ログインしているチャット : {currentUserChat?.map((item) => (*/}
                        {/*    <ul key={item._id}>*/}
                        {/*        <li>{item.username}</li>*/}
                        {/*    </ul>*/}
                        {/*))}*/}

                        {status == "1" || status == "2" ? <DirectMessageStatus1 chatData={chatData}
                                                                                currentUserId={chatData?.currentUser}/> :
                            <DirectMessageStatus3 chatData={chatData}
                                                  currentUserId={chatData?.partnerUser}/>}

                        {chatList.map((item, index) => (
                            <div className={"chatFrame"} key={index}>
                                <div className={"chatRightFrame"}>
                                    {/*<div className={"PIcon"}>*/}
                                    {/*    IC*/}
                                    {/*    /!*<Images src={userData?.profilePicture} alt={"ユーザーのプロフィール画像"} width={100} height={100}/>*!/*/}
                                    {/*</div>*/}
                                </div>
                                <div className={"chatRight-"}>
                                    <div className={"chatRight"}>{item?.message}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <form className={"chatBox"}>
                    <input className={"chatBox-area"} type="text" onChange={(e) => setMessage(e.target.value)}
                           value={message}/>
                    <button className={"chatBox-button"} onClick={(e) => handleSendMessage(e)}>送信</button>
                </form>

            </div>

        </>
    );
};
export default DirectMessage;
