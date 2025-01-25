"use client"
import React, {useState} from 'react';
import Picker from '@emoji-mart/react'
import "./emojiPicker.css"
const EmojiPicker = (props) => {

    const [isShowPicker, setIsShowPicker] = useState<boolean>(false)
    const [icon, setIcon] = useState<string>(false)
    const showPicker = () => setIsShowPicker(!isShowPicker)
    const selectEmoji = (e : any) => {
        const emojiCode= e.unified.split("-");
        let codesArray : string[] = []
        emojiCode.forEach((el :any) =>codesArray.push("0x" + el));
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