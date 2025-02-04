"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";

const sellerCheck = async (productId : string | null , currentUser : string | null) => {
    await connectDB()
    try {
        const product =await Product.findById(productId).select("sellerId")
        if (product.sellerId == currentUser){
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