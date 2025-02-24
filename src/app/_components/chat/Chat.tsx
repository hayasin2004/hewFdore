"use client"
import React, {useEffect, useState} from 'react';

import "./chat.css"
import useUser from "@/hooks/useUser";
 import getProductChatMessage from "@/app/utils/product/getChatMessage";
import {ProductCommentType} from "@/models/ProductComment";
 import sendProductChatMessage from "@/app/utils/product/sendProductChatMessage";
import EmojiPicker from "@/app/_components/emojiPicker/EmojiPicker";
import {UserType} from "@/app/api/user/catchUser/route";
import Images from "next/image";

const Chat = (props: { paramsProductData: string }) => {
    const [chatMessage, setChatMessage] = useState<string>("")
    const [loginUserData, setLoginUserData] = useState<UserType | null>()
    const [icon, setIcon] = useState("")
    const [ChatMessageList, setChatMessageList] = useState<ProductCommentType[] | null>([])
    console.log("渡ってきた" + JSON.stringify(ChatMessageList?.map((item) => console.log(item?.chatUserRole == "購入者"))))

    console.log(icon,chatMessage)
　

    const token = localStorage.getItem("token");
    const user = useUser(token)
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
                }  else {
                    console.log("この商品にコメントはありません")
                    setChatMessageList(null)
                }　
        }
        getProductChatFunction()
    }, [productId])


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

    return (
        <div className={"comment-areaFrame"}>
            <p>チャットメッセージ</p>
            {ChatMessageList?.map((item, index) => (
                item?.chatUserRole === "出品者" ? (
                    <div className="comment-sec-lef" key={index}>
                        <div className="comment-user-lef">

                            <svg style={{color: "#000", marginTop: "10px"}} xmlns="http://www.w3.org/2000/svg"
                                 width={50} height={50}
                                 viewBox="0 0 24 24">
                                <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                                    <path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0Zm-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z"/>
                                    <path
                                        d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1ZM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0 1 12.065 14a8.984 8.984 0 0 1 7.092 3.458A9 9 0 1 0 3 12Zm9 9a8.963 8.963 0 0 1-5.672-2.012A6.992 6.992 0 0 1 12.065 16a6.991 6.991 0 0 1 5.689 2.92A8.964 8.964 0 0 1 12 21Z"/>
                                </g>
                            </svg>
                            {item?.listingChatMessage[0]?.listingUsername} さん<br/>
                            {/*{item?.listingChatMessage !== undefined ? item?.listingChatMessage[0]?.senderUserName : ""} さん<br/>*/}
                        </div>
                        <div className="comment-area-lef">
                            メッセージ内容: {item?.listingChatMessage !== undefined ? item?.listingChatMessage[0]?.listingMessage : ""}
                            {/*メッセージ内容: {item?.listingChatMessage !== undefined ? item?.listingChatMessage[0]?.listingMessage : ""}*/}
                            <br/>
                            <EmojiPicker
                                stamp={item?.listingChatMessage[0]?.listingMessageStamp[0]?.listingMessageStampLike}
                                currentUser={currentUser} productId={productId} item={item?.listingChatMessage[0]?._id}
                                setIcon={setIcon}/>
                        </div>
                    </div>
                ) : (
                    <div className="comment-sec-rig" key={index}>
                        <div className="comment-user-rig">
                            <svg style={{color: "#000", marginTop: "10px"}} xmlns="http://www.w3.org/2000/svg"
                                 width={50} height={50}
                                 viewBox="0 0 24 24">
                                <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                                    <path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0Zm-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z"/>
                                    <path
                                        d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1ZM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0 1 12.065 14a8.984 8.984 0 0 1 7.092 3.458A9 9 0 1 0 3 12Zm9 9a8.963 8.963 0 0 1-5.672-2.012A6.992 6.992 0 0 1 12.065 16a6.991 6.991 0 0 1 5.689 2.92A8.964 8.964 0 0 1 12 21Z"/>
                                </g>
                            </svg>
                            {item?.buyerChatMessage[0]?.buyerUsername} さん<br/>
                        </div>
                        <div className="comment-area-rig">
                            メッセージ内容:{item?.buyerChatMessage[0]?.buyerMessage} <br/>
                            <EmojiPicker stamp={item?.buyerChatMessage[0]?.buyerMessageStamp[0]?.buyerMessageStampLike}
                                         currentUser={currentUser} productId={productId}
                                         item={item?.buyerChatMessage[0]?._id} setIcon={setIcon}/>
                        </div>
                    </div>
                )
            ))}

            {/* 送信フォーム */}
            <div className="Productchat">

                <svg style={{color: "#000", marginTop: "10px"}} xmlns="http://www.w3.org/2000/svg" width={50}
                     height={50}
                     viewBox="0 0 24 24">
                    <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                        <path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0Zm-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z"/>
                        <path
                            d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1ZM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0 1 12.065 14a8.984 8.984 0 0 1 7.092 3.458A9 9 0 1 0 3 12Zm9 9a8.963 8.963 0 0 1-5.672-2.012A6.992 6.992 0 0 1 12.065 16a6.991 6.991 0 0 1 5.689 2.92A8.964 8.964 0 0 1 12 21Z"/>
                    </g>
                </svg>

                <label htmlFor="msg" style={{display: "none"}}>問い合わせフォーム</label>

                <textarea name="msg" id="msg" onChange={(e) => {
                    setChatMessage(e.target.value)
                }} placeholder="出品者へのお問い合わせはこちらから"/>
                <button onClick={submitChatMessage} type={"submit"}>
                    <Images id={"sendMsg"} height={30} src={"/images/mail_1.svg"} width={30}/>
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
    //                         <EmojiPickerPurchase setIcon={setIcon}/>
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
    //                         <EmojiPickerPurchase setIcon={setIcon}/>
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