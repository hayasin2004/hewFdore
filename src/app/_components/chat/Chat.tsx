"use client"
import React, {useState} from 'react';
import Image from "next/image";
import "./chat.css"
import Images from "next/image";
import useUser from "@/hooks/useUser";
import productSendComment from "@/app/utils/product/productSendComment";

const Chat = (props: { paramsProductData: string }) => {
    const [chatMessage, setChatMessage] = useState<string>("")
    const [buyerChatMessageList, setBuyerChatMessageList] = useState<string[] | null>([])
    const [listingChatMessageList, setListingChatMessageList] = useState<string[] | null>([])
    const {user} = useUser()
    console.log(chatMessage)
    const productId = props.paramsProductData
    const submitChatMessage = async () => {

        const currentUser = await user?.userId
        // const CheckChatRoomResponse : string | null =await CreateChatMessageRoom(productId, currentUser)
        if (chatMessage !== null && chatMessage !== undefined) {
            const sendChatResponse = await productSendComment(productId, currentUser, chatMessage)
            console.log(sendChatResponse)
        }
        // if (CheckChatRoomResponse !== null){
        //     console.log(CheckChatRoomResponse)
        // }
    }
    return (
        <>
            {props.paramsProductData}
            <div className="Productchat">
                <Images
                    src={"/images/sampleIcon.jpg"} style={{borderRadius: "50px"}} width={50} height={50}
                    alt={"サンプルユーザーアイコン"}/>
                <label htmlFor="msg" style={{display: "none"}}>問い合わせフォーム</label>
                <input type="text" name="msg" id="msg" onChange={(e) => {
                    setChatMessage(e.target.value)
                }} placeholder="出品者へのお問い合わせはこちらから"/>
                {/*<input type="submit" formTarget={"msg"}/>*/}
                <button onClick={submitChatMessage} type={"submit"}>
                    <img id={"sendMsg"} height={30} src={"/images/mail_1.svg"} width={30}/>
                </button>
            </div>
        </>

    );
}


export default Chat;