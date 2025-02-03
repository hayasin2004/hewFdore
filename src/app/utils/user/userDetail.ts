"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";

const userDetail = async (userId : string | null) => {
    await connectDB()
    try {
        const user = await User.findById(userId)
        //console.log("userDetail" + user)
        return JSON.stringify(user)
    } catch (err) {
        console.log(err)
    }

}

export default userDetail;