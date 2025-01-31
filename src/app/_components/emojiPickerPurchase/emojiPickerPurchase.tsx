"use client"
import React, {useState} from 'react';
import Picker from '@emoji-mart/react'
import "./emojiPickerPurchase.css"
import productChatLike from "@/app/utils/product/productChatLike";
import purchaseChatLike from "@/app/utils/product/purchaseChatLike";

const EmojiPickerPurchase = (props) => {
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
            console.log("空白の出力のemoji" + emoji);
            const testCommentLike = async () => {
                console.log(props)
                const response = await purchaseChatLike(props.currentUser, props.purchaseId, props.item, icon)
                console.log(response)
            }
            testCommentLike()
            setIsShowPicker(false)
            props.setIcon(emoji);
            setIcon(emoji)
        }
    }

    return (
        <div>
            <button onClick={showPicker}>💛</button>
            <div style={{display: isShowPicker ? "block" : "none", position: "absolute", zIndex: 40}}
                 className={"emojiPicker"}>
                <Picker onEmojiSelect={selectEmoji}/>
            </div>
            {icon}<br/>


        </div>
    );
}


export default EmojiPickerPurchase;