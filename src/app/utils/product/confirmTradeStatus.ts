"use server"

import {connectDB} from "@/lib/mongodb"
import {Purchase} from "@/models/Purchase";

const confirmTradeStatus = async (purchaseId: string | null) => {
    await connectDB()
    try {
        let tradeStatus = 0;
        // tradeStatus :0→両者ともまだ評価していない 1→既に取引終了していたがバグによる入力 2→出品者評価後に購入者評価待ち , 3→購入者評価後に出品者評価待ち
        const purchaseCondition = await Purchase.findById(purchaseId).select("sellerUserLastChat sellerUserLastReview buyerUserLastChat buyerUserLastReview")
        if (purchaseCondition.sellerUserLastChat == "" && purchaseCondition.sellerUserLastReview == "" && purchaseCondition.buyerUserLastChat == "" && purchaseCondition.buyerUserLastReview == "") {
            console.log("出品者、購入者の両者からの評価はもらっていません。")
            tradeStatus = 0;
            return tradeStatus
        }        if (purchaseCondition.sellerUserLastChat !== "" && purchaseCondition.sellerUserLastReview !== "" && purchaseCondition.buyerUserLastChat !== "" && purchaseCondition.buyerUserLastReview !== "") {
            console.log("既に出品者、購入者の両者から評価をもらっています。")
            tradeStatus = 1;
            return tradeStatus
        }
        if (purchaseCondition.sellerUserLastChat !== "" || purchaseCondition.sellerUserLastReview !== ""&& purchaseCondition.buyerUserLastChat == "" && purchaseCondition.buyerUserLastReview == "") {
            console.log("既に出品者のみ最終評価しています。")
            tradeStatus = 2;
            return tradeStatus

        }
        if (purchaseCondition.sellerUserLastChat == "" || purchaseCondition.sellerUserLastReview == ""&& purchaseCondition.buyerUserLastChat !== "" && purchaseCondition.buyerUserLastReview !== "") {
            console.log("既に購入者のみ最終評価しています。")
            tradeStatus = 3;
            return tradeStatus
        } 　
    } catch (err) {
        console.log(err)
        return null
    }
}

export default confirmTradeStatus