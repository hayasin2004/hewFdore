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
import EmojiPicker from "@/app/_components/emojiPicker/EmojiPicker";

const Chat = (props: { paramsProductData: string }) => {
    const [chatMessage, setChatMessage] = useState<string>("")
    const [buyerChatMessageList, setBuyerChatMessageList] = useState<productCommentType[] | null>([])
    const [loginUserData, setLoginUserData] = useState()
    const [icon, setIcon] = useState("")
    const [ChatMessageList, setChatMessageList] = useState<productCommentType[] | null>([])
    console.log("渡ってきた" + JSON.stringify(ChatMessageList?.map((item) => console.log(item?.chatUserRole == "購入者"))))

    console.log(chatMessage)
    const user = useUser()
    const productId = props.paramsProductData
    const currentUser = loginUserData?._id
    useEffect(() => {
        if (user !== undefined) {
            const userParse = JSON.parse(user)
            setLoginUserData(JSON.parse(userParse))
        }
    }, [user]);

    // サイトレンダリング時にチャット履歴取得してくる処理
    useEffect(() => {
        const getProductChatFunction = async () => {　
                const response = await getProductChatMessage(productId)
                if (response?.listingChatMessage !== undefined) {
                    const responseParse = JSON.parse(JSON.stringify(response))
                    console.log(responseParse?.listingChatMessage)
                    setChatMessageList(JSON.parse(response.listingChatMessage))
                }
                if (response?.buyerChatMessage) {
                    setBuyerChatMessageList(JSON.parse(response.buyerChatMessage))
                } else {
                    console.log("この商品にコメントはありません")
                    setBuyerChatMessageList(null)
                    setChatMessageList(null)
                }　
        }
        getProductChatFunction()
    }, [])


    const submitChatMessage = async () => {
        if (chatMessage == ""){
            console.log("空白のままでは送れません")
            window.alert("空白のままでは送れません")
            return null
        }
        if (currentUser == undefined || currentUser == null ) {
            window.alert("メッセージはログインしてから送信できます。")
            return null
        }
        // const CheckChatRoomResponse : string | null =await CreateChatMessageRoom(productId, currentUser)
        if (chatMessage !== null && chatMessage !== undefined) {
            const sendChatResponse = await sendProductChatMessage(productId, currentUser, chatMessage)
            console.log(sendChatResponse)
        }
        // if (CheckChatRoomResponse !== null){
        //     console.log(CheckChatRoomResponse)
        // }
    }

    const testCommentLike = async (item: string | null, icon: string | null) => {
        console.log(item)
        const response = await productChatLike(currentUser, productId, item, icon)
        console.log(response)
    }

    return (
        <div className={"comment-areaFrame"}>
            <p>チャットメッセージ</p>
            {ChatMessageList?.map((item, index) => (
                item?.chatUserRole === "出品者" ? (
                    <div className="comment-sec-lef" key={index}>
                        <div className="comment-user-lef">
                            <Images
                                src={"/images/sampleIcon.jpg"} style={{borderRadius: "50px"}} width={50} height={50}
                                alt={"サンプルユーザーアイコン"}/>
                            {item?.listingChatMessage !== undefined ? item?.listingChatMessage[0]?.senderUserId : ""} さん<br/>
                        </div>
                        <div className="comment-area-lef">

                            メッセージ内容: {item?.listingChatMessage !== undefined ? item?.listingChatMessage[0]?.listingMessage : ""}
                            メッセージ内容: {item?.listingChatMessage[0]?.listingMessageStamp[0]?.listingMessageStampLike ? item?.listingChatMessage[0]?.listingMessageStamp[0]?.listingMessageStampLike : "無理―"}
                            <br/>
                            <EmojiPicker item={item} setIcon={setIcon}/>
                            <button id="good" onClick={() => testCommentLike(item?.listingChatMessage[0]?._id, icon)}>
                                ♡{item?.listingChatMessage[0]?.listingMessageStamp?.length}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="comment-sec-rig" key={index}>
                        <div className="comment-user-rig">
                            <Images
                                src={"/images/sampleIcon.jpg"} style={{borderRadius: "50px"}} width={50} height={50}
                                alt={"サンプルユーザーアイコン"}/>
                            {item?.buyerChatMessage[0]?.senderUserId} さん<br/>
                        </div>
                        <div className="comment-area-rig">
                            メッセージ内容: {item?.buyerChatMessage[0]?.buyerMessage} <br/>
                            スタンプ: {item?.buyerChatMessage[0]?.buyerMessageStamp[0]?.buyerMessageStampLike ? item?.buyerChatMessage[0]?.buyerMessageStamp[0]?.buyerMessageStampLike : "無理―"}

                            <EmojiPicker setIcon={setIcon}/>
                            <button id="good" onClick={() => testCommentLike(item?.buyerChatMessage[0]?._id, icon)}>
                                ♡{item?.buyerChatMessage[0]?.buyerMessageStamp?.length}
                            </button>
                        </div>
                    </div>
                )
            ))}

            {/* 送信フォーム */}
            <div className="Productchat">
                <Images id={"usericon"}
                        src={"/images/sampleIcon.jpg"} style={{borderRadius: "50px"}} width={50} height={50}
                        alt={"サンプルユーザーアイコン"}/>

                <label htmlFor="msg" style={{display: "none"}}>問い合わせフォーム</label>

                <textarea name="msg" id="msg" onChange={(e) => {
                    setChatMessage(e.target.value)
                }} placeholder="出品者へのお問い合わせはこちらから"/>
                <button onClick={submitChatMessage} type={"submit"}>
                    <img id={"sendMsg"} height={30} src={"/images/mail_1.svg"} width={30}/>
                </button>
            </div>
        </div>
    );


    // return (
    //     <>
    //         <div className={"comment-areaFrame"}>
    //             <p>出品者の投稿</p>
    //             {ChatMessageList?.map((item, index) => (
    //                 <div className={"comment-sec-lef"}>
    //                     <div className={"comment-user-lef"}>
    //                         <Images
    //                             src={"/images/sampleIcon.jpg"} style={{borderRadius: "50px"}} width={50} height={50}
    //                             alt={"サンプルユーザーアイコン"}/>
    //                         {item?.listingChatMessage[0]?.senderUserId} さん<br/>
    //                     </div>
    //                     <div className={"comment-area-lef"} key={index}>
    //                         {/*質問者Id : {item.senderUserId} <br/>*/}
    //
    //                         メッセージ内容 : {item?.listingChatMessage[0]?.listingMessage} <br/>
    //                         <EmojiPicker setIcon={setIcon}/>
    //                         <button id={"good"} onClick={() => testCommentLike(item?._id, icon)}>
    //                             ♡{item?.listingMessageLike?.length}
    //                         </button>
    //                     </div>
    //                 </div>
    //
    //             ))}
    //
    //
    //             <p>閲覧者の投稿</p>
    //             {ChatMessageList?.map((item, index) => (
    //                 <div className={"comment-sec-rig"}>
    //
    //                     <div className={"comment-area-rig"} key={index}>
    //                         {/*{item.senderUserId} <br/>*/}
    //
    //                         メッセージ内容 : {item?.buyerChatMessage[0]?.buyerMessage} <br/>
    //                         <EmojiPicker setIcon={setIcon}/>
    //                         <button id={"good"} onClick={() => testCommentLike(item?._id, icon)}>
    //                             送信{item?.buyerMessageLike?.length}
    //                         </button>
    //                     </div>
    //                 </div>
    //
    //             ))}
    //             {/*{props.paramsProductData}*/}
    //
    //             <div className="Productchat">
    //                 <Images id={"usericon"}
    //                         src={"/images/sampleIcon.jpg"} style={{borderRadius: "50px"}} width={50} height={50}
    //                         alt={"サンプルユーザーアイコン"}/>
    //
    //                 <label htmlFor="msg" style={{display: "none"}}>問い合わせフォーム</label>
    //
    //                 <textarea name="msg" id="msg" onChange={(e) => {
    //                     setChatMessage(e.target.value)
    //                 }} placeholder="出品者へのお問い合わせはこちらから"/>
    //                 {/*<input type="submit" formTarget={"msg"}/>*/}
    //                 <button onClick={submitChatMessage} type={"submit"}>
    //                     <img id={"sendMsg"} height={30} src={"/images/mail_1.svg"} width={30}/>
    //                 </button>
    //             </div>
    //         </div>
    //
    //
    //     </>
    //
    // );
}


export default Chat;