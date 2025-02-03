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
         const purchaseCondition = await Purchase.findById(purchaseId).select("productId sellerId buyerId sellerUserLastChat sellerUserLastReview buyerUserLastChat buyerUserLastReview")
         if (purchaseCondition.sellerUserLastChat !== "" && purchaseCondition.sellerUserLastReview !== "" && purchaseCondition.buyerUserLastChat !== "" && purchaseCondition.buyerUserLastReview !== "") {
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
                 if (sellerPurchaseLastUpdate.buyerUserLastChat == "" || sellerPurchaseLastUpdate.buyerUserLastReview == "") {
                    tradeStatus = 1;
                    const lastChatReview = {

                        sellerUserLastChat: sellerPurchaseLastUpdate.sellerUserLastChat,
                        sellerUserLastReview: sellerPurchaseLastUpdate.sellerUserLastReview,
                        buyerUserLastChat: sellerPurchaseLastUpdate.buyerUserLastChat,
                        buyerUserLastReview: sellerPurchaseLastUpdate.buyerUserLastReview
                    }
                     await toastPurchaseReview(purchaseCondition?.sellerId,purchaseCondition?.buyerId, purchaseCondition?.productId, lastMessage, reviewValue)
                    await toastGmailForSellerReview(purchaseCondition?.sellerId,purchaseCondition?.buyerId, purchaseCondition?.productId, lastMessage, reviewValue)
                    return {tradeStatus: tradeStatus, lastChatReview: JSON.stringify(lastChatReview)}


                }
                if (sellerPurchaseLastUpdate.sellerUserLastChat !== "" && sellerPurchaseLastUpdate.sellerUserLastReview !== "" && sellerPurchaseLastUpdate.buyerUserLastChat !== "" && sellerPurchaseLastUpdate.buyerUserLastReview !== "") {
                     const tradeStatusUpdate = await sellerPurchaseLastUpdate.updateOne({
                            $set: {
                                tradeStatus: "取引終了"
                            }
                        }, {new: true}
                    )

                    const sellerUserLastChat = sellerPurchaseLastUpdate.sellerUserLastChat

                     tradeStatus = 2;
                    await toastPurchaseReview(purchaseCondition?.sellerId,purchaseCondition?.buyerId, purchaseCondition?.productId, lastMessage, reviewValue)
                    await toastGmailForSellerReview(purchaseCondition?.sellerId,purchaseCondition?.buyerId, purchaseCondition?.productId, lastMessage, reviewValue)

                    return {tradeStatus: tradeStatus, lastChatReview: JSON.stringify(sellerUserLastChat)}
                }


            }
        }

        if (status === "2") {
            if (purchaseCondition.buyerUserLastChat !== "" || purchaseCondition.buyerUserLastReview !== "") {
                 const lastChatReview = {
                    sellerUserLastChat: purchaseCondition.sellerUserLastChat,
                    sellerUserLastReview: purchaseCondition.sellerUserLastReview,
                    buyerUserLastChat: purchaseCondition.buyerUserLastChat,
                    buyerUserLastReview: purchaseCondition.buyerUserLastReview
                }
                tradeStatus = 5;
                return {tradeStatus: tradeStatus, lastChatReview: JSON.stringify(lastChatReview)}
            } else {

                 const buyerPurchaseLastUpdate = await Purchase.findByIdAndUpdate({_id: purchaseId}, {
                        $set: {
                            buyerUserLastChat: lastMessage,
                            buyerUserLastReview: reviewValue,
                        }
                    }, {new: true}
                )
                if (buyerPurchaseLastUpdate.listingUserLastChat == "" || buyerPurchaseLastUpdate.listingUserLastReview == "") {

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
                      const tradeStatusUpdate = await buyerPurchaseLastUpdate.updateOne({
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