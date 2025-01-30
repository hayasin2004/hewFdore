"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {Purchase} from "@/models/Purchase";
import {Stripe} from "stripe";
import {Product} from "@/models/Product";
import {UserType} from "@/app/api/user/catchUser/route";
import {ProductType} from "@/app/utils/product/productDetail";

const purchaseProduct = async (userId: UserType | null) => {
    await connectDB()
    try {
        console.log(userId)
        const purchase: UserType[] = await User.find({_id: "6780c6fb06ad903592512800"}).select("purchaseProduct")
        //console.log(purchase)
        if (purchase == null) {
            console.log("購入した商品はありません")
            return null
        } else {

            const purchaseProducts : UserType[] = await Promise.all(
                purchase.map(async (item) => {
                    console.log("購入履歴検索" + item.purchaseProduct)
                    const test = await  Purchase.findById(item.purchaseProduct);
                    return test
                })
            )
            const products = await Promise.all(
                purchaseProducts.map(async (purchaseItem) => {
                        console.log("ここまで来てる")
                        console.log("購入履歴検索" + purchaseItem)
                        return Product.findById(purchaseItem?.productId)
                }
        ))
            return {purchaseProduct: JSON.stringify(purchaseProducts), product: JSON.stringify(products)}
        }
    } catch (err) {
        //console.log(err)
        return null
    }
}
export default purchaseProduct;