"use client"
import React, {useState} from 'react';
import Picker from '@emoji-mart/react'
import "./emojiPicker.css"
import productChatLike from "@/app/utils/product/productChatLike";
import purchaseChatLike from "@/app/utils/product/purchaseChatLike";

const EmojiPicker = (props) => {
    console.log(JSON.stringify(props.item))
    const [isShowPicker, setIsShowPicker] = useState<boolean>(false)
    const [icon, setIcon] = useState<string>(false)
    const showPicker = () => setIsShowPicker(!isShowPicker)
    const selectEmoji = (e: any) => {
        console.log(e)
        if (e.unified !== "") {
            const emojiCode = e.unified.split("-");
            let codesArray: string[] = []
            emojiCode.forEach((el: any) => codesArray.push("0x" + el));
            const emoji: string = String.fromCodePoint(...codesArray);
            if (props.productId && props.purchaseId == undefined) {
                const chatLike = async () => {
                    const response = await productChatLike(props.currentUser, props.productId, props.item, emoji)
                    console.log(response)
                }
                chatLike()
            } else if (props.purchaseId && props.productId !== undefined) {
                console.log("空白の出力のemoji" + emoji);
                const testCommentLike = async () => {
                    console.log(props)
                    const response = await purchaseChatLike(props.currentUserId, props.purchaseId, props.item, icon)
                    console.log(response)
                }
                testCommentLike()
            }
            setIsShowPicker(false)
            props.setIcon(emoji);
            setIcon(emoji)
        }
    }

    return (
        <div className={"comment-emojiPick"}>
            <button className={"emojiBotton"} onClick={showPicker}>+</button>
            <div style={{display: isShowPicker ? "block" : "none", position: "absolute", zIndex: 40}}
                 className={"emojiPicker"}>
                <Picker onEmojiSelect={selectEmoji}/>
            </div>
            {icon}<br/>

        </div>
    );
}


export default EmojiPicker;