"use server"
import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import {Purchase} from "@/models/Purchase";

const TradeCancelFnc = async (paymentMethod: string | null, purchaseId: string | null) => {
    await connectDB()
    try {
         const tradeStripe = await Product.findOne({stripeCode: paymentMethod})
        const tradePayPay = await Product.findOne({payPayCode: paymentMethod})
        const purchase = await Purchase.findById(purchaseId)
        if (tradeStripe !== null) {
              if (tradeStripe.stripeCode !== "") {

                const cancelPush = await tradeStripe.updateOne({
                    $set: {
                        sellStatus: "selling",
                        stripeCode: "",
                        buyerId: ""
                    }
                }, {new: true})
                const purchaseStatus = await purchase.updateOne({$set: {tradeStatus: "取引キャンセル"}}, {new: true})
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


            return "取引をキャンセルしました。"
        }

    } catch (err) {
        console.log(err)
        return null
    }
}
export default TradeCancelFnc