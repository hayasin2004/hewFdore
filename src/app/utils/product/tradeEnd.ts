"use server"

import {connectDB} from "@/lib/mongodb"
import {Purchase} from "@/models/Purchase";

const tradeEnd = async (purchaseId: string | null, status: string | null, currentUserId: string | null, lastMessage: string | null, reviewValue: string | null) => {
    await connectDB()
    try {
        let tradeStatus = 0;
        // tradeStatus :0→既に取引終了していたがバグによる入力 1→購入者評価後に購入者評価待ち , 2→購入者評価後取引終了 , 3→購入者評価後に購入者評価待ち 4→購入者評価後取引終了
        const purchaseCondition = await Purchase.findById(purchaseId).select("sellerUserLastChat sellerUserLastReview buyerUserLastChat buyerUserLastReview")
        if (purchaseCondition.sellerUserLastChat !== "" && purchaseCondition.sellerUserLastReview !== "" && purchaseCondition.buyerUserLastChat !== "" || purchaseCondition.buyerUserLastReview !== "") {
            console.log("既に出品者、購入者の両者から評価をもらっています。")
            tradeStatus = 0;
            return tradeStatus
        }
        if (status === "1") {
            if (purchaseCondition.sellerUserLastChat !== "" || purchaseCondition.sellerUserLastReview !== "") {
                console.log("既に最終評価しています。")
                tradeStatus = 0;
                return tradeStatus

            } else {
                const sellerPurchaseLastUpdate = await Purchase.findByIdAndUpdate({_id: purchaseId}, {
                        $set: {
                            sellerUserLastChat: lastMessage,
                            sellerUserLastReview: reviewValue,
                        }
                    }, {new: true}
                )
                console.log(sellerPurchaseLastUpdate)
                if (sellerPurchaseLastUpdate.buyerUserLastChat == "" || sellerPurchaseLastUpdate.buyerUserLastReview == "") {
                    console.log("出品者評価後、購入者の両者から評価を待ちます。")
                    tradeStatus = 1;
                    return tradeStatus

                }
                if (sellerPurchaseLastUpdate.sellerUserLastChat !== "" && sellerPurchaseLastUpdate.sellerUserLastReview !== "" && sellerPurchaseLastUpdate.buyerUserLastChat !== "" && sellerPurchaseLastUpdate.buyerUserLastReview !== "") {
                    console.log("出品者評価後、購入者の両者から評価を貰いました。")
                    const tradeStatusUpdate = await sellerPurchaseLastUpdate.updateOne({
                            $set: {
                                tradeStatus: "取引終了"
                            }
                        }, {new: true}
                    )

                    console.log(tradeStatusUpdate)
                    tradeStatus = 2;
                    return tradeStatus
                }


            }
        }

        if (status === "2") {
            if (purchaseCondition.buyerUserLastChat !== "" || purchaseCondition.buyerUserLastReview !== "") {
                console.log("既に最終評価しています。")
                return null
            } else {

                console.log(reviewValue)

                const buyerPurchaseLastUpdate = await Purchase.findByIdAndUpdate({_id: purchaseId}, {
                        $set: {
                            buyerUserLastChat: lastMessage,
                            buyerUserLastReview: reviewValue,
                        }
                    }, {new: true}
                )
                console.log(buyerPurchaseLastUpdate)

                if (buyerPurchaseLastUpdate.buyerUserLastChat == "" || buyerPurchaseLastUpdate.buyerUserLastReview == "") {
                    console.log("購入者評価後、出品者の両者から評価を待ちます。")
                    tradeStatus = 3;
                    return tradeStatus

                }
                if (buyerPurchaseLastUpdate.sellerUserLastChat !== "" && buyerPurchaseLastUpdate.sellerUserLastReview !== "" &&  buyerPurchaseLastUpdate.buyerUserLastChat !== "" &&  buyerPurchaseLastUpdate.buyerUserLastReview !== "") {
                    console.log("購入者の評価後、出品者の両者から評価がそろいました。")
                    const tradeStatusUpdate = await buyerPurchaseLastUpdate.updateOne({
                            $set: {
                                tradeStatus: "取引終了"
                            }
                        }, {new: true}
                    )
                    console.log(tradeStatusUpdate)

                    tradeStatus = 4;
                    return tradeStatus
                }

            }
        }
    } catch (err) {
        console.log(err)
        return null
    }
}

export default tradeEnd