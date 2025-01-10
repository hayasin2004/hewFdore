"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {Purchase} from "@/models/Purchase";
import {Stripe} from "stripe";
import {Product} from "@/models/Product";
const purchaseProduct = async (userId: string | null) => {
    await connectDB()
    try {
        console.log(userId)
        const purchase = await User.findById(userId).select("purchaseProduct")
        if (purchase.purchaseProduct == false) {
            console.log("購入した商品はありません")
            return null
        } else {
            const purchaseProducts = await Promise.all(
                purchase.purchaseProduct.map(async (item) => Purchase.findById(item))
            )
            const products = await Promise.all(
                purchaseProducts.map(async (purchaseItem) => Product.findById(purchaseItem.productId))
            )
            console.log("購入履歴検索"+products)
            return {purchaseProduct : JSON.stringify(purchaseProducts),product : JSON.stringify(products)}
        }
    } catch (err) {
        console.log(err)
        return null
    }
}
export default purchaseProduct;