"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {Product} from "@/models/Product";
import {Toast} from "@/models/Toast";

const toastTradeId = async () => {
    await connectDB()
    try {
        const soldOutProductUpdate = await Toast.updateMany({userId : "6780c6fb06ad903592512800"}, {$set: {productId: "6796eef91dae21ca33535562"}})
        console.log(soldOutProductUpdate)
    } catch (err) {
        console.log(err)
        return null
    }
}
export default toastTradeId