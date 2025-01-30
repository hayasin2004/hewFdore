"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";

const deleteProduct = async (productId : string | null) => {
    await  connectDB()
    try {
        const productDelete = await Product.findByIdAndDelete(productId)
        //console.log(productDelete)
    }catch (err){
        console.log(err)
        return null
    }
}

export default deleteProduct