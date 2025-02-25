"use client"
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Picker from '@emoji-mart/react';
import "./emojiPicker.css";
import productChatLike from "@/app/utils/product/productChatLike";

export interface EmojiSelectEventType {
    unified: string;
    // 他の必要なプロパティがあれば追加
}

interface EmojiPickerProps {
    currentUser?: string;
    productId?: string;
    stamp?: string; // ここで stamp を optional にします
    item?: string;
    setIcon: Dispatch<SetStateAction<string>>;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({
                                                     stamp,
                                                     currentUser,
                                                     productId,
                                                     item,
                                                     setIcon,
                                                 }) => {
    const [isShowPicker, setIsShowPicker] = useState<boolean>(false);
    const [icon, setIconState] = useState<string | null>(null);
    const [existIcon, setExistIcon] = useState<boolean>(false);

    useEffect(() => {
        if (stamp !== undefined && stamp !== null) {
            setExistIcon(true);
            setIconState(stamp);
        }
    }, [stamp]);

    const showPicker = () => setIsShowPicker(!isShowPicker);

    const selectEmoji = (e: EmojiSelectEventType) => {
        if (e.unified !== "") {
            const emojiCode = e.unified.split("-");
            const codesArray: string[] = [];
            emojiCode.forEach((el: string) => codesArray.push("0x" + el));
            const emoji: string = String.fromCodePoint(...codesArray);

            const testCommentLike = async () => {
                const response = await productChatLike(currentUser, productId, item, emoji);
                console.log(response);
            };
            testCommentLike();
            setIsShowPicker(false);
            setExistIcon(true);
            setIconState(emoji);
            setIcon(emoji);
        }
    };

    const deleteStamp = async () => {
        const response = await productChatLike(currentUser, productId, item, icon);
        setIconState(null);
        setExistIcon(false);
        console.log(response)
    };

    return (
        <>
            {stamp === undefined ? (
                existIcon ? (
                    <div key={item}>
                        <div className={"comment-emoji-rig"} onClick={deleteStamp}>
                            {icon}
                        </div>
                    </div>
                ) : (
                    <div className={"comment-emojiPick"}>
                        <button className={"emojiButton"} onClick={showPicker}>+</button>
                        {isShowPicker && (
                            <div className={"emojiPicker"}>
                                <Picker onEmojiSelect={selectEmoji}/>
                            </div>
                        )}
                    </div>
                )
            ) : (
                existIcon ? (
                    <div key={item}>
                        <div className={"comment-emoji-lef"} onClick={deleteStamp}>
                            {icon}
                        </div>
                    </div>
                ) : (
                    <div className={"comment-emojiPick"}>
                        <button className={"emojiButton"} onClick={showPicker}>+</button>
                        {isShowPicker && (
                            <div className={"emojiPicker"}>
                                <Picker onEmojiSelect={selectEmoji}/>
                            </div>
                        )}
                    </div>
                )
            )}
        </>
    );
};

export default EmojiPicker;
