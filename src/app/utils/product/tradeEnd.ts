"use server"

import {connectDB} from "@/lib/mongodb"
import {Purchase} from "@/models/Purchase";
import toastPurchaseReview from "@/app/utils/toast/toastPurchaseReview";
import toastGmailForSellerReview from "@/app/utils/product/toastGmailForSellerReview";
import toastGmailForBuyerReview from "@/app/utils/product/toastGmailForBuyerReview";

const tradeEnd = async (purchaseId: string | null, status: string | null, currentUserId: string | null, lastMessage: string | null, reviewValue: number | null) => {
    await connectDB()
    try {
        let tradeStatus = 0;
        // tradeStatus :0→既に取引終了していたがバグによる入力 1→購入者評価後に購入者評価待ち , 2→購入者評価後取引終了 , 3→購入者評価後に購入者評価待ち 4→購入者評価後取引終了 5→既に評価送信済み
        const purchaseCondition = await Purchase.findById(purchaseId).select("productId sellerId buyerId sellerUserLastChat sellerUserLastReview buyerUserLastChat buyerUserLastReview")
        //console.log(purchaseCondition.sellerUserLastChat !== "" && purchaseCondition.sellerUserLastReview !== "")
        if (purchaseCondition.sellerUserLastChat !== "" && purchaseCondition.sellerUserLastReview !== "" && purchaseCondition.buyerUserLastChat !== "" && purchaseCondition.buyerUserLastReview !== "") {
            //console.log("既に出品者、購入者の両者から評価をもらっています。")
            const lastChatReview = {
                sellerUserLastChat: purchaseCondition.sellerUserLastChat,
                sellerUserLastReview: purchaseCondition.sellerUserLastReview,
                buyerUserLastChat: purchaseCondition.buyerUserLastChat,
                buyerUserLastReview: purchaseCondition.buyerUserLastReview
            }
            tradeStatus = 0;
            return {tradeStatus: tradeStatus, lastChatReview: JSON.stringify(lastChatReview)}
        }
        if (status === "1") {
            if (purchaseCondition.sellerUserLastChat !== "" || purchaseCondition.sellerUserLastReview !== "") {
                //console.log("既に最終評価しています。")
                const lastChatReview = {
                    sellerUserLastChat: purchaseCondition.sellerUserLastChat,
                    sellerUserLastReview: purchaseCondition.sellerUserLastReview,
                    buyerUserLastChat: purchaseCondition.buyerUserLastChat,
                    buyerUserLastReview: purchaseCondition.buyerUserLastReview
                }
                tradeStatus = 5;
                return {tradeStatus: tradeStatus, lastChatReview: JSON.stringify(lastChatReview)}

            } else {
                const sellerPurchaseLastUpdate = await Purchase.findByIdAndUpdate({_id: purchaseId}, {
                        $set: {
                            sellerUserLastChat: lastMessage,
                            sellerUserLastReview: reviewValue,
                        }
                    }, {new: true}
                )
                //console.log(sellerPurchaseLastUpdate)
                if (sellerPurchaseLastUpdate.buyerUserLastChat == "" || sellerPurchaseLastUpdate.buyerUserLastReview == "") {
                    //console.log("出品者評価後、購入者の両者から評価を待ちます。")
                    tradeStatus = 1;
                    const lastChatReview = {

                        sellerUserLastChat: sellerPurchaseLastUpdate.sellerUserLastChat,
                        sellerUserLastReview: sellerPurchaseLastUpdate.sellerUserLastReview,
                        buyerUserLastChat: sellerPurchaseLastUpdate.buyerUserLastChat,
                        buyerUserLastReview: sellerPurchaseLastUpdate.buyerUserLastReview
                    }
                    // 出品者の評価→通知するのは購入者のベル
                    await toastPurchaseReview(purchaseCondition?.sellerId,purchaseCondition?.buyerId, purchaseCondition?.productId, lastMessage, reviewValue)
                    await toastGmailForSellerReview(purchaseCondition?.sellerId,purchaseCondition?.buyerId, purchaseCondition?.productId, lastMessage, reviewValue)
                    return {tradeStatus: tradeStatus, lastChatReview: JSON.stringify(lastChatReview)}


                }
                if (sellerPurchaseLastUpdate.sellerUserLastChat !== "" && sellerPurchaseLastUpdate.sellerUserLastReview !== "" && sellerPurchaseLastUpdate.buyerUserLastChat !== "" && sellerPurchaseLastUpdate.buyerUserLastReview !== "") {
                    //console.log("出品者評価後、購入者の両者から評価を貰いました。")
                    const tradeStatusUpdate = await sellerPurchaseLastUpdate.updateOne({
                            $set: {
                                tradeStatus: "取引終了"
                            }
                        }, {new: true}
                    )

                    const lastChatReview = {
                        sellerUserLastChat: tradeStatusUpdate.sellerUserLastChat,
                        sellerUserLastReview: tradeStatusUpdate.sellerUserLastReview,
                        buyerUserLastChat: tradeStatusUpdate.buyerUserLastChat,
                        buyerUserLastReview: tradeStatusUpdate.buyerUserLastReview
                    }
                    const sellerUserLastChat = sellerPurchaseLastUpdate.sellerUserLastChat

                    //console.log(lastChatReview)
                    tradeStatus = 2;
                    await toastPurchaseReview(purchaseCondition?.sellerId,purchaseCondition?.buyerId, purchaseCondition?.productId, lastMessage, reviewValue)
                    await toastGmailForSellerReview(purchaseCondition?.sellerId,purchaseCondition?.buyerId, purchaseCondition?.productId, lastMessage, reviewValue)

                    return {tradeStatus: tradeStatus, lastChatReview: JSON.stringify(sellerUserLastChat)}
                }


            }
        }

        if (status === "2") {
            if (purchaseCondition.buyerUserLastChat !== "" || purchaseCondition.buyerUserLastReview !== "") {
                //console.log("既に最終評価しています。")

                const lastChatReview = {
                    sellerUserLastChat: purchaseCondition.sellerUserLastChat,
                    sellerUserLastReview: purchaseCondition.sellerUserLastReview,
                    buyerUserLastChat: purchaseCondition.buyerUserLastChat,
                    buyerUserLastReview: purchaseCondition.buyerUserLastReview
                }
                tradeStatus = 5;
                return {tradeStatus: tradeStatus, lastChatReview: JSON.stringify(lastChatReview)}
            } else {

                //console.log(reviewValue)

                const buyerPurchaseLastUpdate = await Purchase.findByIdAndUpdate({_id: purchaseId}, {
                        $set: {
                            buyerUserLastChat: lastMessage,
                            buyerUserLastReview: reviewValue,
                        }
                    }, {new: true}
                )
                if (buyerPurchaseLastUpdate.listingUserLastChat == "" || buyerPurchaseLastUpdate.listingUserLastReview == "") {
                    //console.log("購入者評価後、出品者の両者から評価を待ちます。")
                    //console.log("出品者評価")

                    const lastChatReview = {
                        sellerUserLastChat: buyerPurchaseLastUpdate.sellerUserLastChat,
                        sellerUserLastReview: buyerPurchaseLastUpdate.sellerUserLastReview,
                        buyerUserLastChat: buyerPurchaseLastUpdate.buyerUserLastChat,
                        buyerUserLastReview: buyerPurchaseLastUpdate.buyerUserLastReview
                    }
                    tradeStatus = 3;
                    await toastPurchaseReview(purchaseCondition?.buyerId , purchaseCondition?.sellerId, purchaseCondition?.productId, lastMessage, reviewValue)
                    await toastGmailForBuyerReview(purchaseCondition?.buyerId , purchaseCondition?.sellerId, purchaseCondition?.productId, lastMessage, reviewValue)
                    return {tradeStatus: tradeStatus, lastChatReview: JSON.stringify(lastChatReview)}


                }
                if (buyerPurchaseLastUpdate.sellerUserLastChat !== "" && buyerPurchaseLastUpdate.sellerUserLastReview !== "" && buyerPurchaseLastUpdate.buyerUserLastChat !== "" && buyerPurchaseLastUpdate.buyerUserLastReview !== "") {
                    //console.log("購入者の評価後、出品者の両者から評価がそろいました。")
                    //console.log("出品者評価")

                    const tradeStatusUpdate = await buyerPurchaseLastUpdate.updateOne({
                            $set: {
                                tradeStatus: "取引終了"
                            }
                        }, {new: true}
                    )
                    //console.log(tradeStatusUpdate)
                    const lastChatReview = {
                        sellerUserLastChat: tradeStatusUpdate.sellerUserLastChat,
                        sellerUserLastReview: tradeStatusUpdate.sellerUserLastReview,
                        buyerUserLastChat: tradeStatusUpdate.buyerUserLastChat,
                        buyerUserLastReview: tradeStatusUpdate.buyerUserLastReview
                    }
                    tradeStatus = 4;
                    await toastPurchaseReview(purchaseCondition?.buyerId,purchaseCondition?.sellerId, purchaseCondition?.productId, lastMessage, reviewValue)
                    await toastGmailForBuyerReview(purchaseCondition?.buyerId,purchaseCondition?.sellerId, purchaseCondition?.productId, lastMessage, reviewValue)
                    return {tradeStatus: tradeStatus, lastChatReview: JSON.stringify(lastChatReview)}

                }

            }
        }
    } catch (err) {
        console.log(err)
        return null
    }
}

export default tradeEnd