"use server"

import {connectDB} from "@/lib/mongodb"
import {Purchase} from "@/models/Purchase";
import toastPurchaseReview from "@/app/utils/toast/toastPurchaseReview";

const tradeEnd = async (purchaseId: string | null, status: string | null, currentUserId: string | null, lastMessage: string | null, reviewValue: string | null) => {
    await connectDB()
    try {
        let tradeStatus = 0;
        // tradeStatus :0→既に取引終了していたがバグによる入力 1→購入者評価後に購入者評価待ち , 2→購入者評価後取引終了 , 3→購入者評価後に購入者評価待ち 4→購入者評価後取引終了 5→既に評価送信済み
        const purchaseCondition = await Purchase.findById(purchaseId).select("prodcutId sellerId buyerId sellerUserLastChat sellerUserReview buyerUserLastChat buyerUserReview")
        if (purchaseCondition.sellerUserLastChat !== "" && purchaseCondition.sellerUserReview !== "" && purchaseCondition.buyerUserLastChat !== "" || purchaseCondition.buyerUserReview !== "") {
            console.log("既に出品者、購入者の両者から評価をもらっています。")
            const lastChatReview = {
                sellerUserLastChat: purchaseCondition.sellerUserLastChat,
                sellerUserReview: purchaseCondition.sellerUserReview,
                buyerUserLastChat: purchaseCondition.buyerUserLastChat,
                buyerUserReview: purchaseCondition.buyerUserReview
            }
            tradeStatus = 0;
            return {tradeStatus: tradeStatus, lastChatReview: JSON.stringify(lastChatReview)}
        }
        if (status === "1") {
            if (purchaseCondition.sellerUserLastChat !== "" || purchaseCondition.sellerUserReview !== "") {
                console.log("既に最終評価しています。")
                const lastChatReview = {
                    sellerUserLastChat: purchaseCondition.sellerUserLastChat,
                    sellerUserReview: purchaseCondition.sellerUserReview,
                    buyerUserLastChat: purchaseCondition.buyerUserLastChat,
                    buyerUserReview: purchaseCondition.buyerUserReview
                }
                tradeStatus = 5;
                return {tradeStatus: tradeStatus, lastChatReview: JSON.stringify(lastChatReview)}

            } else {
                const sellerPurchaseLastUpdate = await Purchase.findByIdAndUpdate({_id: purchaseId}, {
                        $set: {
                            sellerUserLastChat: lastMessage,
                            sellerUserReview: reviewValue,
                        }
                    }, {new: true}
                )
                console.log(sellerPurchaseLastUpdate)
                if (sellerPurchaseLastUpdate.buyerUserLastChat == "" || sellerPurchaseLastUpdate.buyerUserReview == "") {
                    console.log("出品者評価後、購入者の両者から評価を待ちます。")
                    tradeStatus = 1;
                    const lastChatReview = {

                        sellerUserLastChat: sellerPurchaseLastUpdate.sellerUserLastChat,
                        sellerUserReview: sellerPurchaseLastUpdate.sellerUserReview,
                        buyerUserLastChat: sellerPurchaseLastUpdate.buyerUserLastChat,
                        buyerUserReview: sellerPurchaseLastUpdate.buyerUserReview
                    }
                    // 出品者の評価→通知するのは購入者のベル
                    await toastPurchaseReview(purchaseCondition?.buyerId,purchaseCondition?.prodcutId ,lastMessage , reviewValue )
                    return {tradeStatus: tradeStatus, lastChatReview: JSON.stringify(lastChatReview)}

                }
                if (sellerPurchaseLastUpdate.sellerUserLastChat !== "" && sellerPurchaseLastUpdate.sellerUserReview !== "" && sellerPurchaseLastUpdate.buyerUserLastChat !== "" && sellerPurchaseLastUpdate.buyerUserReview !== "") {
                    console.log("出品者評価後、購入者の両者から評価を貰いました。")
                    const tradeStatusUpdate = await sellerPurchaseLastUpdate.updateOne({
                            $set: {
                                tradeStatus: "取引終了"
                            }
                        }, {new: true}
                    )

                    const lastChatReview = {
                        sellerUserLastChat: tradeStatusUpdate.sellerUserLastChat,
                        sellerUserReview: tradeStatusUpdate.sellerUserReview,
                        buyerUserLastChat: tradeStatusUpdate.buyerUserLastChat,
                        buyerUserReview: tradeStatusUpdate.buyerUserReview
                    }
                    const sellerUserLastChat = sellerPurchaseLastUpdate.sellerUserLastChat

                    console.log(lastChatReview)
                    tradeStatus = 2;
                    return {tradeStatus: tradeStatus, lastChatReview: JSON.stringify(sellerUserLastChat)}
                }


            }
        }

        if (status === "2") {
            if (purchaseCondition.buyerUserLastChat !== "" || purchaseCondition.buyerUserReview !== "") {
                console.log("既に最終評価しています。")

                const lastChatReview = {
                    sellerUserLastChat: purchaseCondition.sellerUserLastChat,
                    sellerUserReview: purchaseCondition.sellerUserReview,
                    buyerUserLastChat: purchaseCondition.buyerUserLastChat,
                    buyerUserReview: purchaseCondition.buyerUserReview
                }
                tradeStatus = 5;
                return {tradeStatus: tradeStatus, lastChatReview: JSON.stringify(lastChatReview)}
            } else {

                console.log(reviewValue)

                const buyerPurchaseLastUpdate = await Purchase.findByIdAndUpdate({_id: purchaseId}, {
                        $set: {
                            buyerUserLastChat: lastMessage,
                            buyerUserReview: reviewValue,
                        }
                    }, {new: true}
                )
                console.log(buyerPurchaseLastUpdate)

                if (buyerPurchaseLastUpdate.buyerUserLastChat == "" || buyerPurchaseLastUpdate.buyerUserReview == "") {
                    console.log("購入者評価後、出品者の両者から評価を待ちます。")
                    const lastChatReview = {
                        sellerUserLastChat: buyerPurchaseLastUpdate.sellerUserLastChat,
                        sellerUserReview: buyerPurchaseLastUpdate.sellerUserReview,
                        buyerUserLastChat: buyerPurchaseLastUpdate.buyerUserLastChat,
                        buyerUserReview: buyerPurchaseLastUpdate.buyerUserReview
                    }
                    tradeStatus = 3;
                    return {tradeStatus: tradeStatus, lastChatReview: JSON.stringify(lastChatReview)}


                }
                if (buyerPurchaseLastUpdate.sellerUserLastChat !== "" && buyerPurchaseLastUpdate.sellerUserReview !== "" && buyerPurchaseLastUpdate.buyerUserLastChat !== "" && buyerPurchaseLastUpdate.buyerUserReview !== "") {
                    console.log("購入者の評価後、出品者の両者から評価がそろいました。")
                    const tradeStatusUpdate = await buyerPurchaseLastUpdate.updateOne({
                            $set: {
                                tradeStatus: "取引終了"
                            }
                        }, {new: true}
                    )
                    console.log(tradeStatusUpdate)
                    const lastChatReview = {
                        sellerUserLastChat: tradeStatusUpdate.sellerUserLastChat,
                        sellerUserReview: tradeStatusUpdate.sellerUserReview,
                        buyerUserLastChat: tradeStatusUpdate.buyerUserLastChat,
                        buyerUserReview: tradeStatusUpdate.buyerUserReview
                    }
                    tradeStatus = 4;
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