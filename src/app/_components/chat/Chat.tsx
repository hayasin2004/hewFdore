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
import sendProductChatMessage from "@/app/utils/product/sendProductChatMessage";

const Chat = (props: { paramsProductData: string }) => {
    const [chatMessage, setChatMessage] = useState<string>("")
    const [buyerChatMessageList, setBuyerChatMessageList] = useState<productCommentType[] | null>([])

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
                }
                if (response?.buyerChatMessage) {
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
            const sendChatResponse = await sendProductChatMessage(productId, currentUser, chatMessage)
            console.log(sendChatResponse)
        }
        // if (CheckChatRoomResponse !== null){
        //     console.log(CheckChatRoomResponse)
        // }
    }

    const testCommentLike = async(item : string | null) => {
        console.log(item)
        const response = await productChatLike(currentUser ,productId , item)
        console.log(response)
    }

    return (
        <>
            <p>出品者の投稿</p>
            {listingChatMessageList?.map((item, index) => (
                <ul key={index}>
                    質問者Id : {item.senderUserId} <br/>
                    質問者名前 : {item.listingMessage} <br/>
                    メッセージ内容 : {item?._id} <br/>
                    <button onClick={() => testCommentLike(item?._id)}>
                        いいね : {item?.buyerMessageLike?.length}
                    </button>
                </ul>
            ))}
            <p>閲覧者の投稿</p>
            {buyerChatMessageList?.map((item, index) => (
                <ul key={index}>
                    質問者Id : {item.senderUserId} <br/>
                    質問者名前 : {item.buyerMessage} <br/>
                    メッセージ内容 : {item?._id} <br/>
                    <button onClick={() => testCommentLike(item?._id)}>
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