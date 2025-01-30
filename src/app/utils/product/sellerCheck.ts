"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";

const sellerCheck = async (productId : string | null , currentUser : string | null) => {
    await connectDB()
    try {
        const product =await Product.findById(productId).select("sellerId")
        if (product.sellerId == currentUser){
            //console.log("出品者とログインしている人が同じです")
            return true
        }else {
            return  null
        }
    }catch (err){
        console.log(err)
        return null
    }

}
export default sellerCheck