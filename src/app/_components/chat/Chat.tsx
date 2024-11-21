import React from 'react';
import Image from "next/image";
import "./chat.css"
import Images from "next/image";
const Chat = () => {

    return (
        <>
                <div id="chat">
                    <Images
                        src={"/images/sampleIcon.jpg"} style={{borderRadius: "50px"}} width={50} height={50}
                        alt={"サンプルユーザーアイコン"}/>
                        <label htmlFor="msg" style={{display: "none"}}>問い合わせフォーム</label>
                        <input type="text" name="msg" id="msg" placeholder="出品者へのお問い合わせはこちらから"/>
                        <input type="submit" formTarget={"msg"}/>
                </div>
        </>

    );
}


export default Chat;