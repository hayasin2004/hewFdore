"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";

const listingNote = async (userId : string | null) => {
    await connectDB()
    try {
        const userProduct = await  Product.find({sellerId : userId})
        return  JSON.stringify(userProduct)
    }catch (err){
        console.log(err)
        return null
    }
}

export default listingNote