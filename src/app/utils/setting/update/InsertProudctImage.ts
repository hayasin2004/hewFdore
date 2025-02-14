"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";

const InsertProductImage = async () => {
    await connectDB()
    try {
        const insertImage = await Product.updateMany(
            {productImage: {$exists: true}},
            {$set: {productImage: "/test"}}
        )
        console.log(insertImage)
    } catch (err) {
        console.log(err)
        return null
    }
}

export default InsertProductImage