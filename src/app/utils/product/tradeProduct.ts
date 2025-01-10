"use server"

import {connectDB} from "@/lib/mongodb";
import {Purchase} from "@/models/Purchase";

const tradeProduct = async (purchaseId : string | null) => {
    await connectDB()
    try {
        const tradeProduct = await Purchase.findById(purchaseId);
        console.log(tradeProduct)
    }catch (err){
        console.log(err)
        return null
    }
}

export default tradeProduct;