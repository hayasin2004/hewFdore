"use server"

import {connectDB} from "@/lib/mongodb";
import {Purchase} from "@/models/Purchase";
import {Product} from "@/models/Product";

const tradeProduct = async (purchaseId : string | null) => {
    await connectDB()
    try {
        const tradeProduct = await Purchase.findById(purchaseId)
        //console.log("ここどうなってる" + tradeProduct)
        const product = await Product.findById({_id : tradeProduct.productId})
        return JSON.stringify(product)
    }catch (err){
        console.log(err)
        return null
    }
}

export default tradeProduct;