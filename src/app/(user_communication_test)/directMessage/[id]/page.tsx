"use client"
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import useUser from "@/hooks/useUser";
import DirectMessageserver from "@/app/utils/user/DirectMessageserver";
import io from "socket.io-client";
import {ChatType} from "@/models/Chat";
import {UserType} from "@/app/api/user/catchUser/route";
import saveMessageStauts1 from "@/app/utils/message/saveMessageStauts1";
import saveMessageStauts2 from "@/app/utils/message/saveMessageStauts2" ;
import saveMessageStauts2Update from "@/app/utils/message/saveMessageStauts2Update";
import saveMessageStauts1Update from "@/app/utils/message/saveMessageStauts1Update";
import catchMessageStatus3 from "@/app/utils/message/catchMessageStatus2";
import catchMessageStatus1Status2 from "@/app/utils/message/catchMessageStaus1Status3";
import confirmUser from "@/app/utils/user/confirmUser";
import {JsConfigPathsPlugin} from "next/dist/build/webpack/plugins/jsconfig-paths-plugin";


const DirectMessage = ({params}: { params: { id?: string } }) => {
    // console.log(JSON.stringify(params));
    const detailUser = params?.id as string;
    const token = localStorage.getItem("token")
    const [chatData, setChatData] = useState<ChatType|UserType | null>(null)
    const [currentChatData, setCurrentChatData] = useState<ChatType|UserType | null>([])
    const [partnerChatData, setPartnerChatData] = useState<ChatType|UserType | null>([])
    console.log("currentChatData" + currentChatData , "partnerChatData" + partnerChatData )
    const [currentUser, setCurrentUser] = useState<ChatType|UserType | null>(null)
    console.log(JSON.stringify(chatData))
    const [message, setMessage] = useState("")
    const [chatList, setChatList] = useState<ChatType[]>([]);
    const [status, setStatus] = useState("")

    const [currentUserChat, setCurrentUserChat] = useState([])
    const [partnerUserChat, setPartnerChat] = useState([])

    console.log(JSON.stringify(chatList))
    const [dateBasechatList, setDateBaseChatList] = useState<ChatType | null>(null)
    // console.log("保存したいデータ" + JSON.stringify(dateBasechatList))

    const socket = io("http://localhost:8080");

    useEffect(() => {
        console.log(status)
        if (status) {
            const chatresponse = async () => {
                if (status == "1" || status == "2") {
                    const catchUser = await catchMessageStatus1Status2(chatData?.chatId)
                    console.log(catchUser?.chatCatchData?.currentChat)
                    setCurrentUserChat(catchUser?.chatCatchData.currentChat)
                    setPartnerChat(catchUser?.chatCatchData.partnerUserChat)
                } else if (status == "3") {
                    const catchUser = await catchMessageStatus3(chatData?.chatId)
                    console.log(catchUser?.chatCatchData?.currentChat)
                    setCurrentUserChat(catchUser?.chatCatchData.currentChat)
                    setPartnerChat(catchUser?.chatCatchData.partnerUserChat)
                }
            }
                chatresponse()
        }
    }, [chatData]);


    useEffect(() => {
        const response = async () => {
            const confirmToken = await confirmUser(token)
            const confirmTokenParse = JSON.parse(confirmToken)
            const tokenUser = confirmTokenParse._id
            const setUsersData = await DirectMessageserver(tokenUser, detailUser)
            if (setUsersData?.status == "newChatRoom") {
                setChatData(setUsersData)
                setStatus("1")
                console.log("ステータス1")
            } else if (setUsersData?.status == "chatExists") {
                setChatData(JSON.parse(setUsersData?.chatId))
                setCurrentChatData(JSON.parse(setUsersData?.currentUser))
                setPartnerChatData(JSON.parse(setUsersData?.partnerUser))
                console.log("ステータス2")
                setStatus("2")
            } else if (setUsersData?.status == "chatExistsPart2") {
                console.log(setUsersData)
                setChatData(JSON.parse(setUsersData?.chatId))
                setCurrentChatData(JSON.parse(setUsersData?.currentUser))
                setPartnerChatData(JSON.parse(setUsersData?.partnerUser))
                setStatus("3")
                console.log("ステータス3")
            }
            // setCurrentUser(setUsersData?.currentUser?._id)
        }
        response()
    }, [currentUser, detailUser, token]);


    // socket.ioに送信
    const handleSendMessage = (e: React.FormEvent<HTMLButtonElement>) => {

        // ステータス1
        if (status === "1" || status === "2") {
            e.preventDefault()
            socket.emit("send_message", {message: message})
            setMessage("")

            socket.on("received_message", (data) => {
                console.log("socketかラ受け取った奴" + JSON.stringify(data));
                setChatList([...chatList, data])
            })
            const SavedMessage = async () => {
                // const response = await saveMessageStauts1(chatData?._id, chatData?.currentUser, message)
                const update = await saveMessageStauts1Update(chatData?.chatId, chatData?.currentUser, message)

                console.log(update)
                setMessage("")
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
                const response = await saveMessageStauts2(chatData?._id, chatData?.partnerUser, message)
                // const update = await saveMessageStauts2Update(chatData?.chatId, chatData?.currentUser, message)
                console.log(response)
                setMessage("")
            }
            SavedMessageStatus2()
        }
    }
    //     サーバーアクションでチャットを保存する

    // socket.ioから受信


    return (
        <>
            <div className={"dmFreme"}>

                <div className={"PUser-top"}>
                    {/*対象ユーザー : {partnerChatData?._id}*/}
                    {partnerChatData?.username} さん{status}
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

                        {status == 1 || status ==2 ? <DirectMessageStatus1 chatData={chatData?.chatMessage} /> : <DirectMessageStatus3 chatData={chatData?.chatMessage}/> }

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
                    <input className={"chatBox-area"} type="text" onChange={(e) => setMessage(e.target.value)} value={message}/>
                    <button className={"chatBox-button"} onClick={(e) => handleSendMessage(e)}>送信</button>
                </form>

            </div>

        </>
    );
};
export default DirectMessage;
