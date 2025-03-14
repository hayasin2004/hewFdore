"use client"
import React, {useState} from 'react';
import "./DirectMessageStatus3.css"
import EmojiPickerDirectMessage from "@/app/_components/emojiPickerDirectMessage/EmojiPickerDirectMessage";

import {DirectMessageType} from "@/app/_components/directMessageStaus/DirectMessageStatus1/DirectMessageStatus1";

const DirectMessageStatus3 = (params :DirectMessageType) => {
    console.log(params?.chatData);
    const [icon, setIcon] = useState("")
    console.log(icon)
    return (
        <div>
            {/*DirectMessageStatus3*/}
            {params?.chatData?.chatMessage?.map((item) => (
                item.chatUserRole == "チャットルーム制作者" ?
                    <div className={"chatLeft-"} key={item._id}>
                        <div className={"chatLeft"}>{item?.message}</div>
                        <div className={"chatLeft"}>{item?.username}</div>
                        <EmojiPickerDirectMessage stamp={item?.messageStamp[0]?.messageStampLike}　currentUser={params?.currentUserId} commentId={item._id} setIcon={setIcon}/>

                    </div>
                    :
                    <div className={"chatRight-"} key={item._id}>
                        <div className={"chatRight"}>{item?.username}</div>
                        <div className={"chatRight"}>{item?.message}</div>
                    </div>
            ))}
        </div>
    );
}


export default DirectMessageStatus3;