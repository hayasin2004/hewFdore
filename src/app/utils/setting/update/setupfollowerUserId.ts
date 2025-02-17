"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";

const setupfollowerUserId = async () => {
    await connectDB()

    try {
        const update = await Product.updateMany(
            {productImage4: {$exists: false}},
            {$set: {productImage4: ""}}
        )
        console.log(update)
    } catch (err) {
        console.log(err)
        return null
    }

}
export default setupfollowerUserId