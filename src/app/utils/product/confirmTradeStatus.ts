"use server"

import {connectDB} from "@/lib/mongodb"
import {Purchase} from "@/models/Purchase";

const confirmTradeStatus = async (purchaseId: string | null) => {
    await connectDB()
    try {
        let tradeStatus = 0;
          const purchaseCondition = await Purchase.findById(purchaseId).select("sellerUserLastChat sellerUserLastReview buyerUserLastChat buyerUserReview tradeStatus")
        if (purchaseCondition.tradeStatus == "取引キャンセル") {
             tradeStatus = 404
            return {
                tradeStatus: tradeStatus,
                sellerUserLastChat: JSON.stringify(purchaseCondition.sellerUserLastChat),
                buyerUserLastChat: JSON.stringify(purchaseCondition.buyerUserLastChat),
                sellerUserLastReview: JSON.stringify(purchaseCondition.sellerUserLastReview),
                buyerUserReview: JSON.stringify(purchaseCondition.buyerUserReview)
            }
        }
        if (purchaseCondition.sellerUserLastChat == "" && purchaseCondition.sellerUserLastReview == "" && purchaseCondition.buyerUserLastChat == "" && purchaseCondition.buyerUserReview == "") {
             tradeStatus = 0;

            return {
                tradeStatus: tradeStatus,
                sellerUserLastChat: JSON.stringify(purchaseCondition.sellerUserLastChat),
                buyerUserLastChat: JSON.stringify(purchaseCondition.buyerUserLastChat),
                sellerUserLastReview: JSON.stringify(purchaseCondition.sellerUserLastReview),
                buyerUserReview: JSON.stringify(purchaseCondition.buyerUserReview)
            }
        }
        if (purchaseCondition.sellerUserLastChat !== "" && purchaseCondition.sellerUserLastReview !== "" && purchaseCondition.buyerUserLastChat !== "" && purchaseCondition.buyerUserReview !== "") {
              tradeStatus = 1;

            return {
                tradeStatus: tradeStatus,
                sellerUserLastChat: JSON.stringify(purchaseCondition.sellerUserLastChat),
                buyerUserLastChat: JSON.stringify(purchaseCondition.buyerUserLastChat),
                sellerUserLastReview: JSON.stringify(purchaseCondition.sellerUserLastReview),
                buyerUserReview: JSON.stringify(purchaseCondition.buyerUserReview)
            }

        }
        if (purchaseCondition.sellerUserLastChat !== "" || purchaseCondition.sellerUserLastReview !== "" && purchaseCondition.buyerUserLastChat == "" && purchaseCondition.buyerUserReview == "") {

            tradeStatus = 2;
            const sellerUserLastChat = purchaseCondition.sellerUserLastChat
            const buyerUserLastChat = purchaseCondition.buyerUserLastChat
            const sellerUserLastReview = purchaseCondition.sellerUserLastReview
            const buyerUserReview = purchaseCondition.buyerUserReview

            return {
                tradeStatus: tradeStatus,
                sellerUserLastChat: JSON.stringify(sellerUserLastChat),
                buyerUserLastChat: JSON.stringify(buyerUserLastChat),
                sellerUserLastReview: JSON.stringify(sellerUserLastReview),
                buyerUserReview: JSON.stringify(buyerUserReview)
            }

        }
        if (purchaseCondition.sellerUserLastChat == "" || purchaseCondition.sellerUserLastReview == "" && purchaseCondition.buyerUserLastChat !== "" && purchaseCondition.buyerUserReview !== "") {

            tradeStatus = 3;

            return {
                tradeStatus: tradeStatus,
                sellerUserLastChat: JSON.stringify(purchaseCondition.sellerUserLastChat),
                buyerUserLastChat: JSON.stringify(purchaseCondition.buyerUserLastChat),
                sellerUserLastReview: JSON.stringify(purchaseCondition.sellerUserLastReview),
                buyerUserReview: JSON.stringify(purchaseCondition.buyerUserReview)
            }
        }
    } catch (err) {
        console.log(err)
        return null
    }
}

export default confirmTradeStatus