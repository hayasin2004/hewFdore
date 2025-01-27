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
import productChatLike from "@/app/utils/product/productChatLike";
import tradeChatLike from "@/app/utils/product/purchaseChatLike";
import purchaseChatLike from "@/app/utils/product/purchaseChatLike";
import TradeCancelFnc from "@/app/utils/product/TradeCancelFnc";
import {ProductType} from "@/app/utils/product/productDetail";
import EmojiPicker from "@/app/_components/emojiPicker/EmojiPicker";

const Status1TradeChat = ({purchaseId, currentUserId, currentUserIdChat, partnerUserIdChat}) => {
    const [tradeChatLike, setTradeChatLike] = useState(0)
    const [tradeChatLikeStatus, setTradeChatLikeStatus] = useState("")
    const [icon, setIcon] = useState("")
    // status1の時はログインしているユ―ザーが購入者だった時。
    const testCommentLike = async (currentUserId, purchaseId, item, icon) => {
        console.log(item)
        const response = await purchaseChatLike(currentUserId, purchaseId, item, icon)
        console.log(response)
    }
    const currentUserIdChatParse = JSON.parse(JSON.stringify(currentUserIdChat))
    const partnerUserIdChatParse = JSON.parse(JSON.stringify(partnerUserIdChat))
    //
    currentUserIdChatParse?.map((item) => {
        console.log(JSON.parse(JSON.stringify(item)))
    })

    return (
        <div>

            <div>
                対象ユーザーチャット :
                <div>
                    ログインしているチャット : {partnerUserIdChatParse?.map((item) => (
                    <div key={item._id}>
                        <div className={"comment-user-lef"}>
                            <Images
                                src={"/images/sampleIcon.jpg"} style={{borderRadius: "50px"}} width={30} height={30}
                                alt={"サンプルユーザーアイコン"}/>
                            <div className={"comment-user-name-lef"}>{item.buyerUsername} さん</div>
                        </div>

                        <div className={"comment-area-frame-lef"}>
                            <div className={"comment-area-lef"}><Images src={item?.buyerProfilePicture} alt={"ユーザープロフィール画像"} width={50} height={50}/></div>
                            <div className={"comment-area-lef"}>{item.buyerMessage}</div>

                            <EmojiPicker setIcon={setIcon}/>
                            <button id={"good"}
                                    onClick={() => testCommentLike(currentUserId, purchaseId, item?._id, icon)}>
                                送信{item?.sellerMessageLike?.length}
                            </button>
                        </div>
                        {/*<div>{item._id}</div>*/}

                    </div>
                ))}
                </div>
            </div>
            <br/>
            ログインしているユーザー（出品者のコメント）
            {currentUserIdChatParse?.map((item) => (
                <div key={item._id}>
                    {/*<div className={"comment-user-rig"}>{item.sellerUsername} さん </div>*/}

                    <div className={"comment-area-frame-rig"}>
                        <div className={"comment-area-rig"}><Images src={item?.sellerProfilePicture} alt={"ユーザープロフィール画像"} width={50} height={50}/></div>
                        <div className={"comment-area-rig"}>{item?.sellerUsername}</div>
                        <div className={"comment-area-rig"}>{item?.sellerMessage}</div>
                    </div>

                </div>

            ))}

        </div>
    )
}
const Status2TradeChat = ({purchaseId, currentUserId, currentUserIdChat, partnerUserIdChat}) => {
    // status2の時はログインしているユ―ザーが購入者だった時。
    const [icon, setIcon] = useState("")

    const testCommentLike = async (currentUserId, purchaseId, item, icon) => {
        console.log(item)
        const response = await purchaseChatLike(currentUserId, purchaseId, item, icon)
        console.log(response)
    }

    const currentUserIdChatParse = JSON.parse(JSON.stringify(currentUserIdChat))
    const partnerUserIdChatParse = JSON.parse(JSON.stringify(partnerUserIdChat))

    return (

        <div>
            {currentUserIdChatParse?.map((item) => ((
                <ul key={item}>
                    <li>{item.sellerUsername}</li>
                </ul>
            )))}
            <div>
                対象ユーザーチャット : {currentUserIdChatParse?.map((item) => (
                <div key={item._id}>
                    <div className={"comment-user-lef"}>
                        <Images
                            src={"/images/sampleIcon.jpg"} style={{borderRadius: "50px"}} width={30} height={30}
                            alt={"サンプルユーザーアイコン"}/>
                        <div className={"comment-user-name-lef"}>{item.sellerUsername} さん</div>

                        <div className={"comment-area-lef"}><Images src={item?.sellerProfilePicture}
                                                                    alt={"ユーザープロフィール画像"} width={50}
                                                                    height={50}/></div>
                        <div className={"comment-area-lef"}>{item.sellerMessage}</div>
                    </div>

                    <div className={"comment-area-frame-lef"}>
                        <div className={"comment-area-lef"}>{item.sellerMessage}</div>

                    </div>

                    <EmojiPicker item={item}　setIcon={setIcon}/>
                    <button id={"good"} onClick={() => testCommentLike(currentUserId, purchaseId, item?._id, icon)}>
                        送信{item?.sellerMessageLike?.length}
                    </button>

                </div>
            ))}
            </div>
            {/*<br/>*/}
            <div>
                ログインしているチャット（購入者） : {partnerUserIdChatParse?.map((item) => (
                <div key={item._id}>
                    {/*<div>{item.buyerUsername}</div>*/}

                    <div className={"comment-area-frame-rig"}>
                        <div className={"comment-area-rig"}>{item.buyerMessage}</div>

                        <div className={"comment-area-rig"}><Images src={item?.buyerProfilePicture}
                                                                    alt={"ユーザープロフィール画像"} width={50}
                                                                    height={50}/></div>
                        <div className={"comment-area-rig"}>{item?.buyerUsername}</div>
                        <div className={"comment-area-rig"}>{item?.buyerMessage}</div>

                    </div>

                    {/*<div>{item._id}</div>*/}

                </div>
            ))}
            </div>
        </div>
    )
}


const ListingComplete = ({params}: { params: { id: string | null } }) => {
    const [reviewValue, setReviewValue] = React.useState<number | null>(1);
    const [productData, setProductData] = useState<ProductType | null>(null)
    const [chatData, setChatData] = useState<ChatType | null>(null)
    const [message, setMessage] = useState("")
    const [chatList, setChatList] = useState<ChatType[]>([]);
    const [status, setStatus] = useState("")
    const [tradeStatus, setTradeStatus] = useState<number | null>(0)
    console.log(tradeStatus)
    const [tradeCancel, setTradeCancel] = useState<string | null>(null)
    const [partnerUserIdChat, setPartnerUserIdChat] = useState<[] | null>([])
    console.log(JSON.stringify(partnerUserIdChat))
    const [currentUserIdChat, setCurrentUserIdChat] = useState<[] | null>([])
    console.log("取得完了" + currentUserIdChat)
    const [lastChat, setLastChat] = useState<string | null>("")
    const [sellerLastChat, setSellerLastChat] = useState<string | null>("")
    const [sellerUserLastReview, setSellerUserReview] = useState<string | null>(null)
    const [buyerUserReview, setBuyerUserReview] = useState<string | null>(null)
    console.log("出品者の最終評価" + sellerUserLastReview)
    const [buyerLastChat, setBuyerLastChat] = useState<string | null>("")
    const [currentUserId, setCurrentUserId] = useState<string | null>("")
    const [currentUserData, setCurrentUserData] = useState()
    const [partnerUserData, setPartnerUserData] = useState()
    const [loginUserData, setLoginUserData] = useState()

    console.log(partnerUserData)
    const user = useUser()


    const purchaseId = JSON.parse(JSON.stringify(params.productId))
    useEffect(() => {
        const purchase = async () => {
            const response = await tradeProduct(purchaseId);
            const tradeStatus = await confirmTradeStatus(purchaseId);
            console.log(tradeStatus)
            if (tradeStatus !== undefined) {
                const tradeStatusParse = JSON.parse(JSON.stringify(tradeStatus))
                if (tradeStatusParse !== undefined) {
                    console.log("トレードの今のログ" + tradeStatusParse?.sellerUserLastChat)
                    setTradeStatus(tradeStatusParse?.tradeStatus)
                    setSellerLastChat(JSON.parse(tradeStatusParse?.sellerUserLastChat))
                    setBuyerLastChat(JSON.parse(tradeStatusParse?.buyerUserLastChat))
                    setSellerUserReview(JSON.parse(tradeStatusParse?.sellerUserLastReview))
                    setBuyerUserReview(tradeStatusParse?.buyerUserReview)
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
                        if (catchUser?.currentUserChat !== undefined && catchUser?.partnerUserChat !== undefined) {
                            setCurrentUserIdChat(JSON.parse(catchUser?.currentUserChat))
                            setPartnerUserIdChat(JSON.parse(catchUser?.partnerUserChat))
                        }
                    }
                } else if (status == "2") {
                    const catchUser = await tradeProductCatchMessageStatus2(purchaseId)
                    if (catchUser == undefined) {
                        console.log("data fetching...")
                    }
                    if (catchUser !== undefined) {
                        if (catchUser?.buyerChatMessage !== undefined && catchUser?.partnerUserChat !== undefined) {
                            setPartnerUserIdChat(JSON.parse(catchUser?.buyerChatMessage))
                            setCurrentUserIdChat(JSON.parse(catchUser?.partnerUserChat))
                            console.log(catchUser)
                        }
                    }
                }
            }
            chatresponse()
        }
    }, [chatData]);


    useEffect(() => {
        const response = async () => {
            const userParse = JSON.parse(user)
            setLoginUserData(JSON.parse(userParse))
            const currentUserId = loginUserData?._id
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

    const TradeCancel = async () => {
        if (productData?.stripeCode !== "") {
            const tradeCancel = await TradeCancelFnc(productData?.stripeCode, purchaseId)
            if (tradeCancel !== undefined) {
                setTradeCancel(tradeCancel)
                setTradeStatus(404)
                window.alert("取引をキャンセルしました。返金は3～5日に指定のカードに返金されます。")
            }
        } else {
            const tradeCancel = await TradeCancelFnc(productData?.payPayCode, purchaseId)
            console.log(tradeCancel)
            if (tradeCancel !== undefined) {
                setTradeCancel(tradeCancel)
                setTradeStatus(404)
                window.alert("取引をキャンセルしました。返金は3～5日に指定のカードに返金されます。")
            }
        }

    }


    return (
        <>
            <Header/>
            {tradeStatus == 404 ? "取引をキャンセルしました。" : ""}
            {status}
            {tradeCancel !== null ? "取引をキャンセルしました。" : ""}
            {tradeStatus == 1 ? <p>取引終了しました。</p> : <p>取引中</p>}
            {/*{currentUserIdChat}*/}
            <p>
                ログインユーザー : {chatData?.currentUserId}
            </p>

            {chatList.map((item, index) => (
                <ul key={index}>
                    <li>{item?.message}</li>
                </ul>
            ))}
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
                            {status == 1 ?
                                <div>
                                    <p>取引ステータスは１</p>
                                    <Status1TradeChat purchaseId={purchaseId} currentUserId={currentUserId}
                                                      currentUserIdChat={currentUserIdChat}

                                                      partnerUserIdChat={partnerUserIdChat}/>

                                </div> : <div>
                                    <p>取引ステータスは２</p>
                                    <Status2TradeChat purchaseId={purchaseId} currentUserId={currentUserId}
                                                      currentUserIdChat={currentUserIdChat}
                                                      partnerUserIdChat={partnerUserIdChat}/>
                                </div>}
                            {chatList.map((item, index) => (
                                <ul key={index}>
                                    <li>{item?.message}</li>
                                </ul>
                            ))}
                        </div>


                    </div>
                    <div className={"messageBox"}>

                        <Images id={"chatimg"}
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
                    {tradeStatus == 1 || tradeStatus == 404 ?
                        <div>
                            {/*<button onClick={tradeEndFunc}>取引を終了する</button>*/}
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
                    出品者最終評価 :{sellerLastChat} , 評価 : {sellerUserLastReview}
                </div>

                <div id="control">
                    <button
                        type="button">トップに戻る
                    </button>
                </div>

                {tradeStatus == 1 || tradeStatus == 404 ?
                    ""
                    :
                    <div id="control">
                        <button onClick={TradeCancel}
                                type="button">取引をキャンセルする
                        </button>
                    </div>
                }

            </div>

        </>

    )
        ;
}

export default ListingComplete;
