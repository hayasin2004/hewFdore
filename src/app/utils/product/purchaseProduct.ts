"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {Purchase} from "@/models/Purchase";
import {Stripe} from "stripe";
import {Product} from "@/models/Product";
import {UserType} from "@/app/api/user/catchUser/route";

const purchaseProduct = async (userId: string | null) => {
    await connectDB()
    try {
        console.log(userId)
        const purchase  = await User.find({_id : userId}).select("purchaseProduct")
        console.log(purchase)
        if (purchase == false) {
            console.log("購入した商品はありません")
            return null
        } else {


            const purchaseProducts = await Promise.all(
                purchase.map(async (item) => {
                    console.log(item.purchaseProduct)
                    return Purchase.findById(item.purchaseProduct);
                })
            )
            const products = await Promise.all(
                purchaseProducts.map(async (purchaseItem) => {
                        if (purchaseItem) {
                            console.log("購入履歴検索" + purchaseItem)
                            return Product.findById(purchaseItem?.productId)
                        }
                    }
                ))
            console.log("購入"+purchaseProducts)
            return {purchaseProduct: JSON.stringify(purchaseProducts), product: JSON.stringify(products)}
        }
    } catch (err) {
        console.log(err)
        return null
    }
}
export default purchaseProduct;