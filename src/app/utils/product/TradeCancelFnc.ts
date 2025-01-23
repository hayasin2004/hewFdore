"use server"
import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import {Purchase} from "@/models/Purchase";
import cancelTradeStripe from "@/app/utils/stripe/cancelTradeStripe";
import {ProductType} from "@/app/utils/product/productDetail";

const TradeCancelFnc = async (paymentMethod: string | null, purchaseId: string | null) => {
    await connectDB()
    try {
        console.log("paymentMethod" + paymentMethod, "purchaseId" + purchaseId)
        const tradeStripe = await Product.findOne({stripeCode: paymentMethod})
        const tradePayPay = await Product.findOne({payPayCode: paymentMethod})
        const purchase = await Purchase.findById(purchaseId)
        if (tradeStripe !== null) {
            // await cancelTradeStripe(paymentMethod)
            if (tradeStripe.stripeCode !== "") {

                const cancelPush = await tradeStripe.updateOne({
                    $set: {
                        sellStatus: "selling",
                        stripeCode: "",
                        buyerId: ""
                    }
                }, {new: true})
                const purchaseStatus = await purchase.updateOne({$set: {tradeStatus: "取引キャンセル"}}, {new: true})
                console.log(cancelPush, purchaseStatus)

                return "取引をキャンセルしました。"
            }
        }
        else if (tradePayPay !== null) {
            const cancelPush = await tradePayPay.updateOne({
                $set: {
                    sellStatus: "selling",
                    payPayCode: "",
                    buyerId: ""
                }
            }, {new: true})
            const purchaseStatus = await purchase.updateOne({$set: {tradeStatus: "取引キャンセル"}}, {new: true})
            console.log("ここでぺいぺい")

            return "取引をキャンセルしました。"
        }

    } catch (err) {
        console.log(err)
        return null
    }
}
export default TradeCancelFnc