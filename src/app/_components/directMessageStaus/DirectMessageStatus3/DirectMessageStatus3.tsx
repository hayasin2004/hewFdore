"use client"
import React, {useState} from 'react';
import "./DirectMessageStatus3.css"
import EmojiPicker from "@/app/_components/emojiPicker/EmojiPicker";
import EmojiPickerDirectMessage from "@/app/_components/emojiPickerDirectMessage/EmojiPickerDirectMessage";

const DirectMessageStatus3 = (params) => {
    console.log(params?.chatData);
    const [icon, setIcon] = useState("")
    console.log(icon)
    return (
        <div>
            {/*DirectMessageStatus3*/}
            {params?.chatData?.map((item) => (
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