"use server"
import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import {Purchase} from "@/models/Purchase";
import cancelTradeStripe from "@/app/utils/stripe/cancelTradeStripe";
import {ProductType} from "@/app/utils/product/productDetail";

const TradeCancelFnc = async (stripeCode: string | null, purchaseId: string | null) => {
    await connectDB()
    try {
        console.log("stripeCode" + stripeCode, "purchaseId" + purchaseId)
        const trade = await Product.findOne({stripeCode: stripeCode})
        const purchase = await Purchase.findById(purchaseId)
        if (trade !== null && trade !== undefined) {
            // await cancelTradeStripe(stripeCode)
            const purchaseStatus = await purchase.updateOne({$set : {tradeStatus : "取引キャンセル" ,stripeCode : ""}},{new: true})
            const cancelPush = await trade.updateOne({$set: {sellStatus: "selling"}}, {new: true})
            return "取引をキャンセルしました。"
        }
    } catch (err) {
        console.log(err)
        return null
    }
}
export default TradeCancelFnc