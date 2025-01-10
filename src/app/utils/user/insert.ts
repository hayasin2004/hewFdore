"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";

const insert = async () => {
    await connectDB()
    try {
        const test = await User.findByIdAndUpdate(
            "6780c6fb06ad903592512800",
            {$set: {purchaseProduct: ["6780a7df44c2b77be2ff61f6"]}},
        )
        console.log(test)
    } catch (err) {
        console.log(err)
        return null
    }

}

export default insert