"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {Product} from "@/models/Product";

const tradeId = async () => {
    await connectDB()
    try {
        const soldOutProductUpdate = await Product.updateMany({tradeId: {$exists: false}}, {$set: {tradeId: ""}})
        console.log(soldOutProductUpdate)
    } catch (err) {
        console.log(err)
        return null
    }
}
export default tradeId