"use server"
import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import {Purchase} from "@/models/Purchase";

const TradeCancelFnc = async (paymentMethod: string | undefined, purchaseId: string | undefined) => {
    await connectDB()
    try {
        const tradeStripe = await Product.findOne({stripeCode: paymentMethod})
        const tradePayPay = await Product.findOne({payPayCode: paymentMethod})
        const purchase = await Purchase.findById(purchaseId)
        if (tradeStripe !== null) {
            if (tradeStripe.stripeCode !== "") {

                const cancelPush = await tradeStripe.updateOne({
                    $set: {
                        sellStatus: "販売中",
                        stripeCode: "",
                        buyerId: ""
                    }
                }, {new: true})
                const purchaseStatus = await purchase.updateOne({$set: {tradeStatus: "取引キャンセル"}}, {new: true})
                console.log(cancelPush, purchaseStatus)
                return "取引をキャンセルしました。"

            }
        } else if (tradePayPay !== null) {
            const cancelPush = await tradePayPay.updateOne({
                $set: {
                    sellStatus: "販売中",
                    payPayCode: "",
                    buyerId: ""
                }
            }, {new: true})
            const purchaseStatus = await purchase.updateOne({$set: {tradeStatus: "取引キャンセル"}}, {new: true})

            console.log(cancelPush, purchaseStatus)
            return "取引をキャンセルしました。"
        }

    } catch (err) {
        console.log(err)
        return null
    }
}
export default TradeCancelFnc