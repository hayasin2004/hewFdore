"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";

const InsertProductSellStatus = async () => {
    await connectDB()
    try {
        const result = await Product.updateMany(
            {sellerUserDesc: {$exists: false}},
            {$set: {sellerUserDesc: ""}}
        )
        console.log(result)

    } catch (err) {
        console.log(err)
        return null
    }
}

export default InsertProductSellStatus