"use client"
import React, {useEffect, useState} from 'react';
import Picker from '@emoji-mart/react'
import "./emojiPicker.css"
import {ProductCommentType} from "@/models/ProductComment";
import productChatLike from "@/app/utils/product/productChatLike";
export interface EmojiSelectEventType {
    unified: string;
    // 他の必要なプロパティがあれば追加
}
const EmojiPicker = ({props}: { props: { currentUser: string, productId: string, stamp: string, item: string } }) => {
    const [isShowPicker, setIsShowPicker] = useState<boolean>(false)
    const [icon, setIcon] = useState<ProductCommentType | null>(null)
    const [existIcon, setExistIcon] = useState<boolean>(false)
    console.log(existIcon, !existIcon)
    useEffect(() => {
        if (props.stamp !== undefined && props.stamp !== null) {
            setExistIcon(!existIcon)
            setIcon(props.stamp!)
            console.log(existIcon)
        }
    }, [props ,existIcon]);

    const showPicker = () => setIsShowPicker(!isShowPicker)
    const selectEmoji = (e: EmojiSelectEventType) => {
        console.log(e)
        if (e.unified !== "") {
            const emojiCode = e.unified.split("-");
            const codesArray: string[] = []
            emojiCode.forEach((el: string) => codesArray.push("0x" + el));
            const emoji: string = String.fromCodePoint(...codesArray);
            console.log("空白の出力のemoji" + emoji);
            const testCommentLike = async () => {
                console.log(props.currentUser)
                const response = await productChatLike(props.currentUser, props.productId, props.item, emoji)
                console.log(response)
                console.log("そうにゅう処理")
            }
            testCommentLike()
            setIsShowPicker(false)
            setExistIcon(!existIcon)
            setIcon(emoji);
        }
    }


    const deleteStamp = async () => {
        const response = await productChatLike(props.currentUser, props.productId, props.item, icon)
        console.log("消す処理")
        console.log(response)
        setIcon("")
        setExistIcon(!existIcon)
    }


    return (
        <>
            {props.stamp == undefined ? (
                existIcon ?
                    <div key={props.item}>
                        <div className={"comment-emoji-rig"} onClick={deleteStamp}>
                            {icon}
                        </div>
                    </div>
                    : <div className={"comment-emojiPick"}>
                        <div>
                            <button className={"emojiButton"} onClick={showPicker}>+</button>
                            <div
                                style={{display: isShowPicker ? "block" : "none", position: "absolute", zIndex: 40}}
                                className={"emojiPicker"}>
                                <Picker onEmojiSelect={selectEmoji}/>
                            </div>
                        </div>
                    </div>

            ) : (
                existIcon ? (
                        <div key={props.item}>
                            <div className={"comment-emoji-lef"} onClick={deleteStamp}>
                                {icon}
                            </div>
                        </div>
                    )
                    : (
                        <div className={"comment-emojiPick"}>
                            <div>
                                <button className={"emojiButton"} onClick={showPicker}>+</button>
                                <div
                                    style={{display: isShowPicker ? "block" : "none", position: "absolute", zIndex: 40}}
                                    className={"emojiPicker"}>
                                    <Picker onEmojiSelect={selectEmoji}/>
                                </div>
                            </div>
                        </div>
                    )

            )

            }
        </>

    )
        ;
}


export default EmojiPicker;