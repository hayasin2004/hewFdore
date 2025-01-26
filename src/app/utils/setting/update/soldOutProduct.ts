"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";

const soldOutProduct = async () => {
    await connectDB()
    try {
        const soldOutProductUpdate = await User.updateMany({soldOutProduct: {$exists: false}}, {$set: {soldOutProduct: []}})
        //console.log(soldOutProductUpdate)
    } catch (err) {
        //console.log(err)
        return null
    }
}
export default soldOutProduct