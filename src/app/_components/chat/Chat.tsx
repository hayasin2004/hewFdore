"use client"
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import "./chat.css"
import Images from "next/image";
import useUser from "@/hooks/useUser";
import productSendComment from "@/app/utils/product/productSendComment";
import getProductChatMessage from "@/app/utils/product/getChatMessage";
import {productCommentType} from "@/models/ProductComment";
import productChatLike from "@/app/utils/product/productChatLike";

const Chat = (props: { paramsProductData: string }) => {
    const [chatMessage, setChatMessage] = useState<string>("")
    const [buyerChatMessageList, setBuyerChatMessageList] = useState<productCommentType[] | null>([])
    console.log(buyerChatMessageList)
    const [listingChatMessageList, setListingChatMessageList] = useState<productCommentType[] | null>([])
    console.log(listingChatMessageList)
    const {user} = useUser()
    console.log(chatMessage)
    const productId = props.paramsProductData
    const currentUser = user?.userId

    // サイトレンダリング時にチャット履歴取得してくる処理
    useEffect(() => {
        const getProductChatFunction = async () => {
            if (currentUser !== undefined) {
                const response = await getProductChatMessage(currentUser, productId)
                if (response?.listingChatMessage) {
                    setListingChatMessageList(JSON.parse(response.listingChatMessage))
                } else if (response?.buyerChatMessage) {
                    setBuyerChatMessageList(JSON.parse(response.buyerChatMessage))
                } else {
                    console.log("この商品にコメントはありません")
                    setBuyerChatMessageList(null)
                    setListingChatMessageList(null)
                }
            }
        }
        getProductChatFunction()
    }, [currentUser])


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

    const testCommentLike = async(item : string | null) => {
        const commentId = item?._id
        const response = await productChatLike(currentUser ,productId , commentId)
    }

    return (
        <>
            {buyerChatMessageList?.map((item, index) => (
                <ul key={index}>
                    質問者Id : {item.senderUserId} <br/>
                    質問者名前 : {item.buyerUsername} <br/>
                    メッセージ内容 : {item.buyerMessage} <br/>
                    <button onClick={() => testCommentLike(item)}>
                        いいね : {item?.buyerMessageLike?.length}
                    </button>
                </ul>
            ))}
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