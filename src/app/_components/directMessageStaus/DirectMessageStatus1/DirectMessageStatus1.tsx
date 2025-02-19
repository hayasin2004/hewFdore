"use client"
import React, {useState} from 'react';
import "./DirectMessageStatus1.css"　
import EmojiPickerDirectMessage from "@/app/_components/emojiPickerDirectMessage/EmojiPickerDirectMessage";

const DirectMessageStatus1 = (params) => {
    console.log(params?.chatData);
    const [icon, setIcon] = useState("")
    console.log(icon)
    return (
        <div>
            DirectMessageStatus1
            {params?.chatData?.map((item) => (
                item.chatUserRole == "チャットルームを作成された側" ?
                    <div className={"chatLeft-"} key={item._id}>
                        <div className={"chatLeft"}>{item?.message}</div>
                        <div className={"chatLeft"}>{item?.senderUserId}</div>
                        <EmojiPickerDirectMessage stamp={item?.messageStamp[0]?.messageStampLike}　currentUser={params?.currentUserId} commentId={item._id} setIcon={setIcon}/>

                    </div>
                    :
                    <div className={"chatRight-"} key={item._id}>
                        {/*<div className={"chatRight"}>{item?.senderUserId}</div>*/}
                        <div className={"chatRight"}>{item?.message}</div>
                    </div>
            ))}
        </div>
    );
}


export default DirectMessageStatus1;