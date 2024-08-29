import React from 'react';
import Image from "next/image";
import "./chat.css"
const Chat = () => {

    return (
        <>
                <div id="chat">
                        <Image src="/images/charcoal_pro_def.png" width={23} height={2} alt="アイコン"/>
                        <label htmlFor="msg" style={{display: "none"}}>問い合わせフォーム</label>
                        <input type="text" name="msg" id="msg" placeholder="出品者へのお問い合わせはこちらから"/>
                </div>
        </>

    );
}


export default Chat;