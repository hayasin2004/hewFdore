"use client"
import React, {useState} from 'react';
import Picker from '@emoji-mart/react'
import "./emojiPicker.css"
const EmojiPicker = (props) => {

    const [isShowPicker, setIsShowPicker] = useState<boolean>(false)
    const [icon, setIcon] = useState<boolean>(false)
    const showPicker = () => setIsShowPicker(!isShowPicker)
    const selectEmoji = (e: React.FormEvent<HTMLButtonElement> ) => {
        const emojiCode= e.unified.split("-");
        const codesArray : number[] = []
        emojiCode.forEach((el :string) =>codesArray.push("0x" + el));
        const emoji :string = String.fromCodePoint(...codesArray);
        console.log("emoji" + emoji);
        setIsShowPicker(false)
        props.setIcon(emoji);
        setIcon(emoji)
    }

    return (
        <div>
            <button onClick={showPicker}>💛</button>
            <div style={{display : isShowPicker ? "block" : "none" ,position : "absolute" , zIndex : 40}} className={"emojiPicker"}>
                <Picker onEmojiSelect={selectEmoji}/>
            </div>
            {icon}<br/>


        </div>
    );
}


export default EmojiPicker;