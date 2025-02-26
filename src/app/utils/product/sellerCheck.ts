"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import {ProductType} from "@/app/utils/product/productDetail";

const sellerCheck = async (productId : ProductType | null | string, currentUser : string | undefined) => {
    await connectDB()
    try {
        const product =await Product.findById(productId).select("sellerId")
        console.log(product)
        console.log(currentUser)
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