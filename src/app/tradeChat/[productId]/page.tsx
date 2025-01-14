"use client"
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import "./trade.css"
import Header from "@/app/_components/header/Header";
import Chat from "@/app/_components/chat/Chat";
import {Rating, Typography} from "@mui/material";
import tradeProduct from "@/app/utils/product/tradeProduct";
import io from "socket.io-client";
import {ChatType} from "@/models/Chat";
import TradeProductMessageServer from "@/app/utils/user/TradeProductMessageServer";
import tradeProductCatchMessageStatus2 from "@/app/utils/message/tradeProductCatchMessageStatus2";
import tradeProductCatchMessageStatus1 from "@/app/utils/message/tradeProductCatchMessageStatus1";
import savePurchaseProductMessageStauts2 from "@/app/utils/message/savePurchaseProductMessageStauts2";
import savePurchaseProductMessageStatus1 from "@/app/utils/message/savePurchaseProductMessageStauts1";
import useUser from "@/hooks/useUser";
import {Purchase} from "@/models/Purchase";
import PurchaseChat from "@/app/_components/purchaseChat/PurchaseChat";
import Images from "next/image";
import userProfile from "@/app/utils/user/userProfile";
import savePurchaseProductMessageStatus2 from "@/app/utils/message/tradeProductCatchMessageStatus2";
import savePurchaseProductMessageStatus2Update from "@/app/utils/message/savePurchaseProductMessageStatus2Update";
import tradeEnd from "@/app/utils/product/tradeEnd";
import confirmTradeStatus from "@/app/utils/product/confirmTradeStatus";

const ListingComplete = ({params}: { params: { id: string | null } }) => {
    const [reviewValue, setReviewValue] = React.useState<number | null>(1);
    const [productData, setProductData] = useState<string | null>(null)
    const [chatData, setChatData] = useState<ChatType | null>(null)
    const [message, setMessage] = useState("")
    const [chatList, setChatList] = useState<ChatType[]>([]);
    const [status, setStatus] = useState("")
    const [tradeStatus, setTradeStatus] = useState<number>(0)
    const [buyerIdChat, setBuyerIdChat] = useState<string | null>([])
    const [sellerIdChat, setSellerIdChat] = useState<string[] | null>([])
    const [lastChat, setLastChat] = useState<string | null>("")
    const [sellerLastChat, setSellerLastChat] = useState<string | null>("")
    const [sellerUserReview, setSellerUserReview] = useState<string | null>(null)
    const [buyerUserReview, setBuyerUserReview] = useState<string | null>(null)
    console.log("出品者の最終評価" + sellerUserReview)
    const [buyerLastChat, setBuyerLastChat] = useState<string | null>("")
    const [currentUserId, setCurrentUserId] = useState<string | null>("")
    console.log(sellerIdChat, buyerLastChat)
    const [currentUserData, setCurrentUserData] = useState()
    console.log(JSON.stringify(currentUserData))
    const [partnerUserData, setPartnerUserData] = useState()
    console.log(partnerUserData)
    const {user} = useUser()

    console.log(productData)
    const purchaseId = JSON.parse(JSON.stringify(params.productId))
    useEffect(() => {
        const purchase = async () => {
            const response = await tradeProduct(purchaseId);
            const tradeStatus = await confirmTradeStatus(purchaseId);
            console.log(tradeStatus)
            if (tradeStatus !== undefined) {
                const tradeStatusParse = JSON.parse(JSON.stringify(tradeStatus))
                if (tradeStatusParse !== undefined) {
                    console.log("トレードの今のログ" + tradeStatusParse.sellerUserLastChat)
                    setTradeStatus(tradeStatusParse?.tradeStatus)
                    setSellerLastChat(JSON.parse(tradeStatusParse?.sellerUserLastChat))
                    setBuyerLastChat(JSON.parse(tradeStatusParse?.buyerUserLastChat))
                    setSellerUserReview(JSON.parse(tradeStatusParse.sellerUserReview))
                    setBuyerUserReview(tradeStatusParse.buyerUserReview)
                }
            }
            setProductData(JSON.parse(response));
            console.log(response)
        }
        purchase()
    }, [purchaseId])
    const socket = io("http://localhost:8080");

    useEffect(() => {
        console.log(status)
        if (status) {
            const chatresponse = async () => {
                if (status == "1") {
                    const catchUser = await tradeProductCatchMessageStatus1(purchaseId)
                    if (catchUser !== undefined) {
                        setSellerIdChat(JSON.parse(catchUser?.currentUserChat))
                        setBuyerIdChat(JSON.parse(catchUser?.partnerUserChat))
                    }
                } else if (status == "2") {
                    const catchUser = await tradeProductCatchMessageStatus2(purchaseId)
                    setBuyerIdChat(JSON.parse(JSON.stringify(catchUser?.currentUserChat)))
                    setSellerIdChat(JSON.parse(JSON.stringify(catchUser?.partnerUserChat)))
                }
            }
            chatresponse()
        }
    }, [chatData]);


    useEffect(() => {
        const response = async () => {
            const currentUserId = user?.userId
            setCurrentUserId(currentUserId)
            const sellerId = productData?.sellerId
            const buyerId = productData?.buyerId
            console.log(buyerId)
            const setUsersData = await TradeProductMessageServer(currentUserId, sellerId)
            if (setUsersData?.chatExists) {
                const currentUser = await userProfile(currentUserId)
                const partnerUser = await userProfile(buyerId)
                if (buyerId !== undefined && currentUser?.searchUser !== undefined && partnerUser?.searchUser !== undefined) {
                    setCurrentUserData(JSON.parse(currentUser?.searchUser))
                    setPartnerUserData(JSON.parse(partnerUser?.searchUser))
                }
                setChatData(setUsersData?.chatExists)
                console.log("ステータス1")
                setStatus("1")
            } else {
                const currentUser = await userProfile(currentUserId)
                const partnerUser = await userProfile(sellerId)
                if (currentUser?.searchUser !== undefined && partnerUser?.searchUser !== undefined) {
                    setCurrentUserData(JSON.parse(currentUser?.searchUser))
                    setPartnerUserData(JSON.parse(partnerUser?.searchUser))
                }
                console.log(setUsersData)
                setChatData(setUsersData?.chatExistsPart2)
                setStatus("2")
                console.log("ステータス2")
            }
            // setCurrentUser(setUsersData?.currentUser?._id)
        }
        response()
    }, [productData]);


    // socket.ioに送信
    const handleSendMessage = (e: React.FormEvent<HTMLButtonElement>) => {
        // ステータス1
        console.log(status === "1")
        if (status === "1") {
            e.preventDefault()
            socket.emit("send_message", {message: message})
            setMessage("")

            socket.on("received_message", (data) => {
                console.log("socketかラ受け取った奴" + JSON.stringify(data));
                setChatList([...chatList, data])
            })
            const SavedMessage = async () => {
                try {

                    const response = await savePurchaseProductMessageStatus1(purchaseId, chatData?.currentUser, message, currentUserData)
                    // const update = await savePurchaseProductMessageStatus1Update(purchaseId, chatData?.currentUser, message)
                    console.log(response)
                    setMessage("")
                } catch (err) {
                    console.log(err)
                    return null
                }
            }
            SavedMessage()
        }
        // ステータス2
        else if (status === "2") {
            e.preventDefault()
            socket.emit("send_message", {message: message})
            setMessage("")

            socket.on("received_message", (data) => {
                console.log("socketかラ受け取った奴" + JSON.stringify(data));
                setChatList([...chatList, data])
            })
            const SavedPurchaseProductMessageStatus2 = async () => {
                // const response = await savePurchaseProductMessageStatus2(purchaseId, chatData?.currentUser, message)
                const update = await savePurchaseProductMessageStatus2Update(purchaseId, chatData?.buyerId, message, currentUserData)

                console.log(update)
                setMessage("")
            }
            SavedPurchaseProductMessageStatus2()

        }
    }
    console.log(productData)
    console.log(Rating)

    const tradeEndFunc = async () => {
        const response = await tradeEnd(purchaseId, status, currentUserId, lastChat, reviewValue)
        console.log(response)
        if (response?.tradeStatus == 0 || response?.tradeStatus == 2 || response?.tradeStatus == 4) {
            setTradeStatus(1)
        } else if (response?.tradeStatus == 1 || response?.tradeStatus == 5) {
            setTradeStatus(2)
        } else if (response?.tradeStatus == 3 || response?.tradeStatus == 5) {
            setTradeStatus(3)
        }
    }

    return (
        <>
            <Header/>
            {tradeStatus == 1 ? <p>取引終了しました。</p> : <p>取引中</p>}
            {/*{sellerIdChat}*/}
            {/*{sellerIdChat?.map((item) => ((*/}
            {/*       <ul key={item}>*/}
            {/*           <li>{item}</li>*/}
            {/*       </ul>*/}
            {/*    )))}*/}
            {/*<div>*/}
            {/*    対象ユーザーチャット : {sellerIdChat?.map((item) => (*/}
            {/*    <ul key={item._id}>*/}
            {/*        <li>{item.sellerMessage}</li>*/}
            {/*    </ul>*/}
            {/*))}*/}
            {/*</div>*/}
            {/*<br/>*/}
            {/*<p>*/}
            {/*    ログインユーザー : {chatData?.currentUserId}*/}
            {/*</p>*/}
            {/*<div>*/}
            {/*    ログインしているチャット : {buyerIdChat?.map((item) => (*/}
            {/*    <ul key={item.id}>*/}
            {/*        <li>{item}</li>*/}
            {/*    </ul>*/}
            {/*))}*/}
            {/*    {chatList.map((item, index) => (*/}
            {/*        <ul key={index}>*/}
            {/*            <li>{item?.message}</li>*/}
            {/*        </ul>*/}
            {/*    ))}*/}
            {/*</div>*/}
            {/*<form>*/}
            {/*    <input type="text" onChange={(e) => setMessage(e.target.value)} value={message}/>*/}
            {/*    <button onClick={(e) => handleSendMessage(e)}>送信</button>*/}
            {/*</form>*/}
            <div id="product">
                <div id="info">
                    <div id="photo">
                        <Image src="/images/clothes/product9.jpg" width={400} height={400} alt="商品の写真"/>

                        <ul className="piclist">
                            <li className="picts"><a href="/images/clothes/product9.jpg">
                                <Image src="/images/clothes/product9.jpg" width={50} height={50} alt="商品の写真"/>
                            </a>

                            </li>

                        </ul>
                    </div>
                    <div id="text">
                        <h1>{productData?.productName}</h1>
                        <span className="under_bar"></span>
                        <a href="#" id="seller"><h2>出品者:{productData?.sellerUserName}</h2>
                        </a>
                        <p>
                            商品詳細<br/>
                            {productData?.productDesc}<br/>

                        </p>
                        <p id="size">サイズ:S</p>
                        <p id="used">商品状態:多少使用感がある</p>
                        <p id="postage">送料:出品者負担</p>
                        <p id="category">カテゴリ: ワンピース Sサイズ 春物 色</p>
                    </div>

                </div>

                <div className={"purchaseMessage"}>
                    <div className="Productchat">
                        <div>
                            {/*    対象ユーザーチャット : {sellerIdChat?.map((item) => (*/}
                            {/*    <ul key={item.id}>*/}
                            {/*        {partnerUserData?.username}*/}
                            {/*        <li>{item?.sellerChatMessage}</li>*/}
                            {/*    </ul>*/}
                            {/*))}*/}
                        </div>
                        <div>
                            {/*    ログインしているチャット : {buyerIdChat?.map((item) => (*/}
                            {/*    <ul key={item.id}>*/}
                            {/*        {currentUserData?.username}*/}
                            {/*        <li>{item?.buyerMessage}</li>*/}
                            {/*    </ul>*/}
                            {/*))}*/}
                            {chatList.map((item, index) => (
                                <ul key={index}>
                                    <li>{item?.message}</li>
                                </ul>
                            ))}
                        </div>


                    </div>
                    <div className={"messageBox"}>

                        <Images
                            src={"/images/sampleIcon.jpg"} style={{borderRadius: "50px"}} width={50} height={50}
                            alt={"サンプルユーザーアイコン"}/>

                        <label htmlFor="msg" style={{display: "none"}}>問い合わせフォーム</label>
                        <input type="text" name="msg" id="msg" onChange={(e) => setMessage(e.target.value)}
                               value={message}
                               placeholder="出品者へのお問い合わせはこちらから"/>
                        {/*<input type="submit" formTarget={"msg"}/>*/}
                        <button onClick={(e) => handleSendMessage(e)} type={"submit"}>
                            <img id={"sendMsg"} height={30} src={"/images/mail_1.svg"} width={30}/>
                        </button>
                    </div>
                </div>
                <div className={"evaluation"}>
                    <div className={"evaluation_Chat"}>
                        <h2>最終コメント</h2>
                        <input onChange={(e) => {
                            setLastChat(e.target.value)
                        }} type="text" name="msg" placeholder="今回の取引はどうでしたか？"/>
                    </div>
                    {tradeStatus == 1 ?
                        <div>
                            <p>取引終了</p>
                        </div>
                        : <button onClick={tradeEndFunc}>取引を終了する</button>
                    }

                    <div>

                        <Typography component="legend" style={{marginBottom: "30px"}}>今回の取引の評価</Typography>
                        <Rating
                            size={"large"}
                            name="simple-controlled"
                            value={reviewValue}
                            onChange={(event, newValue) => {
                                setReviewValue(newValue);
                            }}
                        />


                    </div>
                </div>

                <div>
                    出品者最終評価 :{sellerLastChat} , 評価 : {sellerUserReview}
                </div>

                <div id="control">
                    <button
                        type="button">トップに戻る
                    </button>
                </div>

            </div>

        </>

    )
        ;
}


export default ListingComplete;